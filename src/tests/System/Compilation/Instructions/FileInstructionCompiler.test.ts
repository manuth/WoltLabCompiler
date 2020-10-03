import Assert = require("assert");
import Path = require("path");
import FileSystem = require("fs-extra");
import Tar = require("tar");
import { TempDirectory } from "temp-filesystem";
import { FileInstructionCompiler } from "../../../../System/Compilation/PackageSystem/Instructions/FileInstructionCompiler";
import { ApplicationFileSystemInstruction } from "../../../../System/PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

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
                    await FileSystem.writeFile(sourceDir.MakePath(fileName), content);
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
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the instruction can be compiled…",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the archive has been created…",
                    async () =>
                    {
                        Assert.strictEqual(await FileSystem.pathExists(archiveFileName), true);
                    });

                test(
                    "Checking whether the archive can be extracted…",
                    async () =>
                    {
                        await Tar.extract(
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

                        await Tar.list({
                            file: archiveFileName,
                            onentry: (entry: Tar.FileStat): void =>
                            {
                                files.push(entry.header.path);
                            },
                            filter: (fileName: string, stat: Tar.FileStat): boolean =>
                            {
                                return Path.parse(fileName).dir.length === 0;
                            }
                        });

                        Assert.strictEqual(fileNames.every((fileName: string): boolean => files.includes(fileName)), true);
                        Assert.strictEqual(files.every((fileName: string): boolean => fileNames.includes(fileName)), true);
                    });
            });

        suite(
            "Serialize()",
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
                        Assert.strictEqual(normalDocument.documentElement.hasAttribute("application"), false);
                    });

                test(
                    "Checking whether the `application`-attribute is present if the `Application` is specified…",
                    () =>
                    {
                        Assert.strictEqual(applicationDocument.documentElement.hasAttribute("application"), true);
                    });

                test(
                    "Checking whether the `application`-attribute is correct…",
                    () =>
                    {
                        Assert.strictEqual(applicationDocument.documentElement.getAttribute("application"), application);
                    });
            });
    });
