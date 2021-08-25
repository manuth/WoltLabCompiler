import { strictEqual } from "assert";
import { FileSystemInstruction } from "../../../../PackageSystem/Instructions/FileSystem/FileSystemInstruction";

/**
 * Registers tests for the {@link FileSystemInstruction `FileSystemInstruction`} class.
 */
export function FileSystemInstructionTests(): void
{
    suite(
        nameof(FileSystemInstruction),
        () =>
        {
            let fileName: string;
            let instruction: FileSystemInstruction;

            suiteSetup(
                () =>
                {
                    fileName = "foo.sql";

                    instruction = new class extends FileSystemInstruction
                    {
                        /**
                         * @inheritdoc
                         */
                        public Type = "foo";
                    }(
                        {
                            Source: fileName
                        });
                });

            suite(
                nameof<FileSystemInstruction>((instruction) => instruction.FileName),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<FileSystemInstruction>((i) => i.FileName)}\` is set to \`${nameof<FileSystemInstruction>((i) => i.Source)}\` automatically…`,
                        () =>
                        {
                            strictEqual(instruction.FileName, instruction.Source);
                        });
                });
        });
}
