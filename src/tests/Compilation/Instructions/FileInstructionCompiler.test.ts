import { doesNotReject, ok, strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { pathExists, writeFile } from "fs-extra";
import { extract, FileStat, list } from "tar";
import { parse } from "upath";
import { FileInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/FileInstructionCompiler";
import { ApplicationFileSystemInstruction } from "../../../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `FileInstructionCompiler` class.
 */
export function FileInstructionCompilerTests(): void
{
    suite(
        "FileInstructionCompiler",
        () =>
        {
            let sourceDir: TempDirectory;
            let testDir: TempDirectory;
            let tempDir: TempDirectory;
            let archiveFileName: string;
            let instruction: ApplicationFileSystemInstruction;
            let compiler: FileInstructionCompiler;
            let fileNames: string[];
            let content: string;

            suiteSetup(
                async () =>
                {
                    sourceDir = new TempDirectory();
                    testDir = new TempDirectory();
                    tempDir = new TempDirectory();

                    fileNames = [
                        "test1.txt",
                        "test2.txt",
                        "this-is-a-file.txt",
                        ".htaccess",
                        "picture.xcf"
                    ];

                    content = "Hello World";

                    let $package: Package = new Package(
                        {
                            Identifier: "foo",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    for (let fileName of fileNames)
                    {
                        await writeFile(sourceDir.MakePath(fileName), content);
                    }

                    instruction = new ApplicationFileSystemInstruction(
                        {
                            Source: sourceDir.FullName
                        });

                    $package.InstallSet.push(instruction);
                    compiler = new FileInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    archiveFileName = compiler.DestinationFileName;
                });

            suiteTeardown(
                () =>
                {
                    sourceDir.Dispose();
                    testDir.Dispose();
                    tempDir.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    test(
                        "Checking whether the instruction can be compiled…",
                        async () =>
                        {
                            await doesNotReject(async () => compiler.Execute());
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether the archive has been created…",
                        async () =>
                        {
                            ok(await pathExists(archiveFileName));
                        });

                    test(
                        "Checking whether the archive can be extracted…",
                        async () =>
                        {
                            await extract(
                                {
                                    cwd: testDir.FullName,
                                    file: archiveFileName
                                });
                        });

                    test(
                        "Checking whether all files are present inside the archive…",
                        async () =>
                        {
                            let files: string[] = [];

                            await list({
                                file: archiveFileName,
                                onentry: (entry: FileStat): void =>
                                {
                                    files.push(entry.header.path);
                                },
                                filter: (fileName: string, stat: FileStat): boolean =>
                                {
                                    return parse(fileName).dir.length === 0;
                                }
                            });

                            ok(fileNames.every((fileName: string): boolean => files.includes(fileName)));
                            ok(files.every((fileName: string): boolean => fileNames.includes(fileName)));
                        });
                });

            suite(
                "Serialize",
                () =>
                {
                    let application: string;
                    let normalDocument: Document;
                    let applicationDocument: Document;

                    suiteSetup(
                        () =>
                        {
                            application = "gallery";

                            let normalInstruction: ApplicationFileSystemInstruction = new ApplicationFileSystemInstruction(
                                {
                                    Source: "files"
                                });

                            let applicationInstruction: ApplicationFileSystemInstruction = new ApplicationFileSystemInstruction(
                                {
                                    Source: "gallery/files",
                                    Application: application
                                });

                            let $package: Package = new Package(
                                {
                                    Identifier: "example",
                                    DisplayName: {},
                                    InstallSet: {
                                        Instructions: []
                                    }
                                });

                            $package.InstallSet.push(normalInstruction, applicationInstruction);
                            normalDocument = new FileInstructionCompiler(normalInstruction).Serialize();
                            applicationDocument = new FileInstructionCompiler(applicationInstruction).Serialize();
                        });

                    test(
                        "Checking whether the `application`-attribute is not present if the `Application` is not specified…",
                        () =>
                        {
                            strictEqual(normalDocument.documentElement.hasAttribute("application"), false);
                        });

                    test(
                        "Checking whether the `application`-attribute is present if the `Application` is specified…",
                        () =>
                        {
                            ok(applicationDocument.documentElement.hasAttribute("application"));
                        });

                    test(
                        "Checking whether the `application`-attribute is correct…",
                        () =>
                        {
                            strictEqual(applicationDocument.documentElement.getAttribute("application"), application);
                        });
                });
        });
}
