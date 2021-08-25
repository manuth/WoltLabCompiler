import { strictEqual } from "assert";
import { TempDirectory, TempFile } from "@manuth/temp-files";
import { ensureDir, ensureFile, readFile, writeFile } from "fs-extra";
import { basename, normalize } from "upath";
import { FileDescriptor } from "../../PackageSystem/FileDescriptor";

/**
 * Registers tests for the {@link FileDescriptor `FileDescriptor`} class.
 */
export function FileDescriptorTests(): void
{
    suite(
        nameof(FileDescriptor),
        () =>
        {
            let tempFile: TempFile;
            let tempDir: TempDirectory;
            let workingDir: string;
            let currentDir: string;
            let absoluteFileName: string;
            let absoluteContent: string;
            let absoluteDescriptor: FileDescriptor;
            let relativeFileName: string;
            let relativeContent: string;
            let relativeDescriptor: FileDescriptor;
            let parentFileName: string;
            let parentContent: string;
            let parentDescriptor: FileDescriptor;

            /**
             * Creates a new file-descriptor and its source-file with the specified {@link content `content`}.
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
                async () =>
                {
                    tempFile = new TempFile();
                    tempDir = new TempDirectory();
                    currentDir = process.cwd();
                    workingDir = tempDir.MakePath("foo");
                    await ensureDir(workingDir);
                    process.chdir(workingDir);
                    absoluteFileName = tempFile.FullName;
                    absoluteContent = "Hello World";
                    absoluteDescriptor = await CreateFileDescriptor(absoluteFileName, absoluteContent);
                    relativeFileName = "./foo/bar/baz/test.txt";
                    relativeContent = "Hello Relative World";
                    relativeDescriptor = await CreateFileDescriptor(relativeFileName, relativeContent);
                    parentFileName = "../bar/baz/test.txt";
                    parentContent = "Hello Parent World";
                    parentDescriptor = await CreateFileDescriptor(parentFileName, parentContent);
                });

            suiteTeardown(
                () =>
                {
                    process.chdir(currentDir);
                    tempFile.Dispose();
                    tempDir.Dispose();
                });

            suite(
                nameof<FileDescriptor>((descriptor) => descriptor.Source),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<FileDescriptor>((d) => d.Source)}\`-property works properly with absolute paths…`,
                        async () =>
                        {
                            strictEqual((await readFile(absoluteDescriptor.Source)).toString(), absoluteContent);
                        });

                    test(
                        `Checking whether the \`${nameof<FileDescriptor>((d) => d.Source)}\`-property works properly with relative paths…`,
                        async () =>
                        {
                            strictEqual((await readFile(relativeDescriptor.Source)).toString(), relativeContent);
                        });

                    test(
                        `Checking whether the \`${nameof<FileDescriptor>((d) => d.Source)}\`-property works properly with relative paths even if the working directory is changed…`,
                        async () =>
                        {
                            let tempDir: TempDirectory = new TempDirectory();
                            let current: string = process.cwd();
                            process.chdir(tempDir.FullName);

                            {
                                strictEqual((await readFile(relativeDescriptor.Source)).toString(), relativeContent);
                            }

                            process.chdir(current);
                        });

                    test(
                        `Checking whether the \`${nameof<FileDescriptor>((d) => d.Source)}\`-property works properly with paths outside of the working directory…`,
                        async () =>
                        {
                            strictEqual((await readFile(parentDescriptor.Source)).toString(), parentContent);
                        });
                });

            suite(
                nameof<FileDescriptor>((descriptor) => descriptor.FileName),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<FileDescriptor>((d) => d.FileName)}\` automatically is set to the basename of the \`${nameof<FileDescriptor>((d) => d.Source)}\`-property if it is absolute and no filename was specified…`,
                        () =>
                        {
                            strictEqual(absoluteDescriptor.FileName, basename(absoluteFileName));
                        });

                    test(
                        `Checking whether the \`${nameof<FileDescriptor>((d) => d.FileName)}\` is set to the \`${nameof<FileDescriptor>((d) => d.Source)}\`-property if the source is relative and no filename is specified…`,
                        () =>
                        {
                            strictEqual(relativeDescriptor.FileName, normalize(relativeFileName));
                        });

                    test(
                        `Checking whether \`${nameof<FileDescriptor>((d) => d.FileName)}\` is set to the basename of the path if no filename is specified and the \`${nameof<FileDescriptor>((d) => d.Source)}\` is outside of the working directory…`,
                        () =>
                        {
                            strictEqual(parentDescriptor.FileName, basename(parentFileName));
                        });
                });
        });
}
