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
            let tempFile: TempFile;
            let workingDir: TempDirectory;
            let currentDir: string;
            let fileName: string;
            let fileDescriptor: FileDescriptor;
            let content: string;

            /**
             * Creates a new file-descriptor and it's source-file with the specified `content`.
             *
             * @param fileName
             * The name of the source-file.
             *
             * @param content
             * The content to write to the source-file.
             *
             * @returns
             * The newly created file-descriptor.
             */
            async function CreateFileDescriptor(fileName: string, content: string): Promise<FileDescriptor>
            {
                await ensureFile(fileName);
                await writeFile(fileName, content);

                return new FileDescriptor(
                    {
                        Source: fileName
                    });
            }

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    workingDir = new TempDirectory();
                    currentDir = process.cwd();
                    process.chdir(workingDir.FullName);
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
                    fileName = tempFile.FullName;
                    content = "Hello World";
                    fileDescriptor = await CreateFileDescriptor(fileName, content);
                });

            suite(
                "Checking whether absolute paths are handled correctly…",
                () =>
                {
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
                    setup(
                        async () =>
                        {
                            fileName = "./foo/bar/baz/test.txt";
                            content = "Hello Relative World";
                            fileDescriptor = await CreateFileDescriptor(fileName, content);
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
                            await ensureDir(childDir);
                            process.chdir(childDir);
                        });

                    suiteTeardown(
                        () =>
                        {
                            process.chdir(current);
                        });

                    setup(
                        async () =>
                        {
                            fileName = relativeFile;
                            content = "Hello Parent World";
                            fileDescriptor = await CreateFileDescriptor(fileName, content);
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
