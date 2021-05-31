import { strictEqual } from "assert";
import { FileSystemInstruction } from "../../../../PackageSystem/Instructions/FileSystem/FileSystemInstruction";

/**
 * Registers tests for the `FileSystemInstruction` class.
 */
export function FileSystemInstructionTests(): void
{
    suite(
        "FileSystemInstruction",
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
                "FileName",
                () =>
                {
                    test(
                        "Checking whether the `FileName` is set to `Source` automatically…",
                        () =>
                        {
                            strictEqual(instruction.FileName, instruction.Source);
                        });
                });
        });
}
