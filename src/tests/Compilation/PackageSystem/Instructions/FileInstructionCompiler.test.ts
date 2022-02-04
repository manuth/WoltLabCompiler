import { ok, strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { writeFile } from "fs-extra";
import { extract } from "tar";
import { join, parse } from "upath";
import { FileInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/FileInstructionCompiler";
import { ApplicationFileSystemInstruction } from "../../../../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "../../../../PackageSystem/Instructions/FileSystem/IApplicationFileSystemInstructionOptions";
import { Package } from "../../../../PackageSystem/Package";
import { XMLEditor } from "../../../../Serialization/XMLEditor";
import { Tar } from "../../../Tar";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the {@link FileInstructionCompiler `FileInstructionCompiler`} class.
 */
export function FileInstructionCompilerTests(): void
{
    let sourceDir: TempDirectory;
    let tempDir: TempDirectory;
    let fileNames: string[];
    let applicationAttribute = "application";

    new class extends InstructionCompilerTestRunner<CompilerTester<FileInstructionCompiler>, FileInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<FileInstructionCompiler>
        {
            return new CompilerTester(
                new FileInstructionCompiler(
                    new ApplicationFileSystemInstruction(
                        {
                            Source: sourceDir.FullName
                        })));
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            fileNames = [
                "test1.txt",
                "test2.txt",
                "this-is-a-file.txt",
                ".htaccess",
                "picture.xcf"
            ];

            sourceDir = new TempDirectory();
            tempDir = new TempDirectory();

            for (let fileName of fileNames)
            {
                await writeFile(sourceDir.MakePath(fileName), "Hello world");
            }

            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            test(
                "Checking whether the archive can be extracted…",
                async () =>
                {
                    await extract(
                        {
                            cwd: tempDir.FullName,
                            file: this.Compiler.DestinationFileName
                        });
                });

            test(
                "Checking whether all files are present inside the archive…",
                async () =>
                {
                    let files = await Tar.ListTarFiles(
                        {
                            file: this.Compiler.DestinationFileName,
                            filter: (fileName) =>
                            {
                                return parse(fileName).dir.length === 0;
                            }
                        });

                    strictEqual(fileNames.length, files.length);
                    ok(fileNames.every((fileName) => files.includes(fileName)));
                    ok(files.every((fileName: string) => fileNames.includes(fileName)));
                });
        }

        /**
         * @inheritdoc
         */
        protected override SerializeTests(): void
        {
            let application: string;
            let normalEditor: XMLEditor;
            let applicationEditor: XMLEditor;
            super.SerializeTests();

            suiteSetup(
                () =>
                {
                    application = "gallery";
                });

            setup(
                () =>
                {
                    let normalInstruction = new ApplicationFileSystemInstruction(
                        {
                            Source: "files"
                        });

                    let applicationInstruction = new ApplicationFileSystemInstruction(
                        {
                            Source: join("gallery", "files"),
                            Application: application
                        });

                    new Package(
                        {
                            Identifier: "example",
                            DisplayName: {},
                            Version: "",
                            InstallSet: {
                                Instructions: []
                            }
                        }).InstallSet.push(normalInstruction, applicationInstruction);

                    normalEditor = new XMLEditor(
                        new FileInstructionCompiler(normalInstruction).Serialize().documentElement);

                    applicationEditor = new XMLEditor(
                        new FileInstructionCompiler(applicationInstruction).Serialize().documentElement);
                });

            test(
                `Checking whether the \`${applicationAttribute}\`-attribute is not present if the \`${nameof<IApplicationFileSystemInstructionOptions>((o) => o.Application)}\` is not specified…`,
                () =>
                {
                    ok(!normalEditor.HasAttribute(applicationAttribute));
                });

            test(
                `Checking whether the \`${applicationAttribute}\`-attribute is present if the \`${nameof<IApplicationFileSystemInstructionOptions>((o) => o.Application)}\` is specified…`,
                () =>
                {
                    ok(applicationEditor.HasAttribute(applicationAttribute));
                });

            test(
                `Checking whether the \`${applicationAttribute}\`-attribute is set correctly…`,
                () =>
                {
                    strictEqual(applicationEditor.GetAttribute(applicationAttribute), application);
                });
        }
    }(nameof(FileInstructionCompiler)).Register();
}
