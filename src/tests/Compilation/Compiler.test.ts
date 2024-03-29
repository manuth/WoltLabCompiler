import { ok, strictEqual } from "node:assert";
import { TempDirectory, TempFile } from "@manuth/temp-files";
import fs from "fs-extra";
import { extract } from "tar";
import path from "upath";
import { Compiler } from "../../Compilation/Compiler.js";
import { TestCompiler } from "./TestCompiler.js";

const { readdir, readFile, writeFile } = fs;
const { join } = path;

/**
 * Registers tests for the {@link Compiler `Compiler<T>`} class.
 */
export function CompilerTests(): void
{
    suite(
        nameof(Compiler),
        () =>
        {
            let tempDir: TempDirectory;
            let compiler: TestCompiler;

            suiteSetup(
                () =>
                {
                    tempDir = new TempDirectory();
                    compiler = new TestCompiler({});
                    compiler.DestinationPath = tempDir.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempDir.Dispose();
                });

            suite(
                nameof<TestCompiler>((compiler) => compiler.CopyTemplate),
                () =>
                {
                    let ejsString: string;
                    let context: Record<string, string>;
                    let result: string;

                    suiteSetup(
                        () =>
                        {
                            ejsString = "<%= Hello %> World";
                            context = { Hello: "Good Morning" };
                            result = "Good Morning World";
                        });

                    suite(
                        "Copying files…",
                        () =>
                        {
                            let sourceFile: TempFile;
                            let destinationFile: TempFile;

                            setup(
                                () =>
                                {
                                    sourceFile = new TempFile();
                                    destinationFile = new TempFile();
                                });

                            teardown(
                                () =>
                                {
                                    sourceFile.Dispose();
                                    destinationFile.Dispose();
                                });

                            test(
                                "Checking whether ejs-strings are replaced when copying the file to a new location…",
                                async function()
                                {
                                    this.timeout(5 * 1000);
                                    this.slow(2.5 * 1000);
                                    await writeFile(sourceFile.FullName, ejsString);
                                    await compiler.CopyTemplate(sourceFile.FullName, destinationFile.FullName, context);
                                    strictEqual((await readFile(destinationFile.FullName)).toString(), result);
                                });

                            test(
                                "Checking whether ejs-strings are replaced when overwriting the source-file…",
                                async function()
                                {
                                    this.timeout(5 * 1000);
                                    this.slow(2.5 * 1000);
                                    await writeFile(sourceFile.FullName, ejsString);
                                    await compiler.CopyTemplate(sourceFile.FullName, sourceFile.FullName, context);
                                    strictEqual((await readFile(sourceFile.FullName)).toString(), result);
                                });
                        });

                    suite(
                        "Copying directories…",
                        () =>
                        {
                            let sourceDir: TempDirectory;
                            let destinationDir: TempDirectory;
                            let fileName: string;
                            let hiddenFileName: string;

                            suiteSetup(
                                () =>
                                {
                                    fileName = "test.txt";
                                    hiddenFileName = ".htaccess";
                                });

                            setup(
                                () =>
                                {
                                    sourceDir = new TempDirectory();
                                    destinationDir = new TempDirectory();
                                });

                            teardown(
                                () =>
                                {
                                    sourceDir.Dispose();
                                    destinationDir.Dispose();
                                });

                            test(
                                "Checking whether normal files are copied correctly…",
                                async function()
                                {
                                    this.timeout(5 * 1000);
                                    this.slow(2.5 * 1000);
                                    await writeFile(sourceDir.MakePath(fileName), ejsString);
                                    await compiler.CopyTemplate(sourceDir.FullName, destinationDir.FullName, context);
                                    strictEqual((await readFile(destinationDir.MakePath(fileName))).toString(), result);
                                });

                            test(
                                "Checking whether hidden files are copied correctly…",
                                async function()
                                {
                                    this.timeout(5 * 1000);
                                    this.slow(2.5 * 1000);
                                    await writeFile(sourceDir.MakePath(hiddenFileName), ejsString);
                                    await compiler.CopyTemplate(sourceDir.FullName, destinationDir.FullName, context);
                                    strictEqual((await readFile(destinationDir.MakePath(hiddenFileName))).toString(), result);
                                });

                            test(
                                "Checking whether variables are replaced correctly when overwriting the source-files…",
                                async () =>
                                {
                                    await writeFile(sourceDir.MakePath(hiddenFileName), ejsString);
                                    await compiler.CopyTemplate(sourceDir.FullName, sourceDir.FullName, context);
                                    strictEqual((await readFile(sourceDir.MakePath(hiddenFileName))).toString(), result);
                                });
                        });
                });

            suite(
                nameof<TestCompiler>((compiler) => compiler.MakeDestinationPath),
                () =>
                {
                    let path: string[];

                    suiteSetup(
                        () =>
                        {
                            path = ["foo", "bar", "baz"];
                        });

                    test(
                        "Checking whether destination-paths are built correctly…",
                        () =>
                        {
                            strictEqual(join(compiler.DestinationPath, ...path), compiler.MakeDestinationPath(...path));
                        });
                });

            suite(
                nameof<TestCompiler>((compiler) => compiler.Compress),
                async () =>
                {
                    let files: string[];
                    let sourceDir: TempDirectory;
                    let destinationFile: TempFile;

                    suiteSetup(
                        () =>
                        {
                            files = ["foo", "bar", "baz", ".htaccess"];
                        });

                    setup(
                        async () =>
                        {
                            sourceDir = new TempDirectory();
                            destinationFile = new TempFile();

                            for (let file of files)
                            {
                                await writeFile(sourceDir.MakePath(file), "this is a test");
                            }
                        });

                    teardown(
                        () =>
                        {
                            sourceDir.Dispose();
                            destinationFile.Dispose();
                        });

                    test(
                        "Checking whether files are compressed correctly…",
                        async function()
                        {
                            this.timeout(5 * 1000);
                            this.slow(2.5 * 1000);
                            let testDir: TempDirectory = new TempDirectory();

                            {
                                await compiler.Compress(sourceDir.FullName, destinationFile.FullName);

                                await extract(
                                    {
                                        cwd: testDir.FullName,
                                        file: destinationFile.FullName
                                    });

                                let archiveFiles: string[] = await readdir(testDir.FullName);
                                ok(files.every((file: string) => archiveFiles.includes(file)));
                            }

                            testDir.Dispose();
                        });
                });
        });
}
