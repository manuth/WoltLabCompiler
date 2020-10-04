import { strictEqual } from "assert";
import { TempDirectory, TempFile } from "@manuth/temp-files";
import { ensureDir, ensureFile, readFile, writeFile } from "fs-extra";
import { basename, normalize } from "upath";
import { FileDescriptor } from "../../PackageSystem/FileDescriptor";

/**
 * Registers tests for the `FileDescriptor` class.
 */
export function FileDescriptorTests(): void
{
    suite(
        "FileDescriptor",
        () =>
        {
            let workingDir: TempDirectory;
            let currentDir: string;
            let fileName: string;
            let fileDescriptor: FileDescriptor;
            let content: string;

            suiteSetup(
                () =>
                {
                    workingDir = new TempDirectory();
                    currentDir = process.cwd();
                    process.chdir(workingDir.FullName);
                    content = "Hello World";
                });

            suiteTeardown(
                () =>
                {
                    process.chdir(currentDir);
                    workingDir.Dispose();
                });

            setup(
                async () =>
                {
                    await ensureFile(fileName);
                    await writeFile(fileName, content);

                    fileDescriptor = new FileDescriptor({
                        Source: fileName
                    });
                });

            suite(
                "Checking whether absolute paths are handled correctly…",
                () =>
                {
                    let tempFile: TempFile;

                    suiteSetup(
                        () =>
                        {
                            tempFile = new TempFile();
                            fileName = tempFile.FullName;
                        });

                    suiteTeardown(
                        () =>
                        {
                            tempFile.Dispose();
                        });

                    test(
                        "Checking whether the `Source` points to the correct file…",
                        async () =>
                        {
                            strictEqual((await readFile(fileDescriptor.Source)).toString(), content);
                        });

                    test(
                        "Checking whether the `FileName` automatically is set to the basename of the source if no filename is specified…",
                        () =>
                        {
                            strictEqual(fileDescriptor.FileName, basename(fileName));
                        });
                });

            suite(
                "Checking whether relative paths are handled correctly…",
                () =>
                {
                    let relativeFile: string;

                    suiteSetup(
                        () =>
                        {
                            relativeFile = "./foo/bar/baz/test.txt";
                            fileName = relativeFile;
                            content = "Hello Relative World";
                        });

                    test(
                        "Checking whether `Source` points to the correct file…",
                        async () =>
                        {
                            strictEqual((await readFile(fileDescriptor.Source)).toString(), content);
                        });

                    test(
                        "Checking whether `Source` points to the correct file even if the working directory is changed…",
                        async () =>
                        {
                            let tempDir: TempDirectory = new TempDirectory();
                            let current: string = process.cwd();
                            process.chdir(tempDir.FullName);

                            {
                                strictEqual((await readFile(fileDescriptor.Source)).toString(), content);
                            }

                            process.chdir(current);
                        });

                    test(
                        "Checking whether `FileName` is set to the relative path if no filename is specified…",
                        () =>
                        {
                            strictEqual(fileDescriptor.FileName, normalize(fileName));
                        });
                });

            suite(
                "Checking whether relative paths outside of the current directory are handled correctly…",
                () =>
                {
                    let current: string;
                    let childDir: string;
                    let relativeFile: string;

                    suiteSetup(
                        async () =>
                        {
                            current = process.cwd();
                            childDir = "foo";
                            relativeFile = "../bar/baz/test.txt";
                            fileName = relativeFile;
                            content = "Hello Parent World";
                            await ensureDir(childDir);
                            process.chdir(childDir);
                        });

                    suiteTeardown(
                        () =>
                        {
                            process.chdir(current);
                        });

                    test(
                        "Checking whether `Source` points to the correct file…",
                        async () =>
                        {
                            strictEqual((await readFile(fileDescriptor.Source)).toString(), content);
                        });

                    test(
                        "Checking whether `FileName` is set to the basename of the path if no filename is specified…",
                        () =>
                        {
                            strictEqual(fileDescriptor.FileName, basename(fileName));
                        });
                });
        });
}