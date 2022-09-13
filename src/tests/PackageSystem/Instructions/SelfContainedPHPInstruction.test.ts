import { strictEqual } from "assert";
import { TempDirectory, TempFileSystem } from "@manuth/temp-files";
import { SelfContainedPHPInstruction } from "../../../PackageSystem/Instructions/SelfContainedPHPInstruction.js";

/**
 * Registers tests for the {@link SelfContainedPHPInstruction `SelfContainedPHPInstruction`} class.
 */
export function SelfContainedPHPInstructionTests(): void
{
    suite(
        nameof(SelfContainedPHPInstruction),
        () =>
        {
            /**
             * Provides an implementation of the {@link SelfContainedPHPInstruction `SelfContainedPHPInstruction`} class for testing.
             */
            class TestInstruction extends SelfContainedPHPInstruction
            {
                /**
                 * @inheritdoc
                 *
                 * @param source
                 * The source of the instruction.
                 *
                 * @returns
                 * The default name of the asset file.
                 */
                public override GetAssetFileName(source: string): string
                {
                    return super.GetAssetFileName(source);
                }
            }

            let tempDir: TempDirectory;
            let dirname: string;
            let basename: string;
            let instruction: TestInstruction;

            setup(
                () =>
                {
                    tempDir = new TempDirectory();
                    dirname = TempFileSystem.TempBaseName();
                    basename = TempFileSystem.TempBaseName();

                    instruction = new TestInstruction(
                        {
                            Source: tempDir.MakePath(dirname, basename),
                            Destination: TempFileSystem.TempBaseName()
                        });
                });

            suite(
                nameof<TestInstruction>((instruction) => instruction.GetAssetFileName),
                () =>
                {
                    test(
                        "Checking whether the name of the directory containing the `source` is returned…",
                        () =>
                        {
                            strictEqual(instruction.GetAssetFileName(instruction.Source), dirname);
                        });
                });
        });
}
