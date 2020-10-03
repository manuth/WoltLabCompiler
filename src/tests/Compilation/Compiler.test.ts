import { strictEqual } from "assert";
import { readdir, readFile, writeFile } from "fs-extra";
import { extract } from "tar";
import { TempDirectory, TempFile } from "temp-filesystem";
import { join } from "upath";
import { TestCompiler } from "./TestCompiler";

/**
 * Registers tests for the `Compiler` class.
 */
export function CompilerTests(): void
{
    suite(
        "Compiler",
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
                "CopyTemplate",
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
                                async () =>
                                {
                                    await writeFile(sourceFile.FullName, ejsString);
                                    await compiler.CopyTemplate(sourceFile.FullName, destinationFile.FullName, context);
                                    strictEqual((await readFile(destinationFile.FullName)).toString(), result);
                                });

                            test(
                                "Checking whether ejs-strings are replaced when overwriting the source-file…",
                                async () =>
                                {
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
                                async () =>
                                {
                                    await writeFile(sourceDir.MakePath(fileName), ejsString);
                                    await compiler["CopyTemplate"](sourceDir.FullName, destinationDir.FullName, context);
                                    strictEqual((await readFile(destinationDir.MakePath(fileName))).toString(), result);
                                });

                            test(
                                "Checking whether hidden files are copied correctly…",
                                async () =>
                                {
                                    await writeFile(sourceDir.MakePath(hiddenFileName), ejsString);
                                    await compiler["CopyTemplate"](sourceDir.FullName, destinationDir.FullName, context);
                                    strictEqual((await readFile(destinationDir.MakePath(hiddenFileName))).toString(), result);
                                });

                            test(
                                "Checking whether variables are replaced correctly when overwriting the source-files…",
                                async () =>
                                {
                                    await writeFile(sourceDir.MakePath(hiddenFileName), ejsString);
                                    await compiler["CopyTemplate"](sourceDir.FullName, sourceDir.FullName, context);
                                    strictEqual((await readFile(sourceDir.MakePath(hiddenFileName))).toString(), result);
                                });
                        });
                });

            suite(
                "MakeDestinationPath",
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
                            strictEqual(join(compiler.DestinationPath, ...path), compiler["MakeDestinationPath"](...path));
                        });
                });

            suite(
                "Compress",
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
                        async () =>
                        {
                            let testDir: TempDirectory = new TempDirectory();

                            {
                                await compiler.Compress(sourceDir.FullName, destinationFile.FullName);

                                await extract(
                                    {
                                        cwd: testDir.FullName,
                                        file: destinationFile.FullName
                                    });

                                let archiveFiles: string[] = await readdir(testDir.FullName);
                                strictEqual(files.every((file: string) => archiveFiles.includes(file)), true);
                            }

                            testDir.Dispose();
                        });
                });
        });
}
