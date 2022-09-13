import { strictEqual } from "node:assert";
import { TempDirectory, TempFileSystem } from "@manuth/temp-files";
import { createSandbox, SinonSandbox } from "sinon";
import path from "upath";
import { ApplicationFileSystemInstruction } from "../../../../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction.js";

const { basename, changeExt } = path;

/**
 * Registers tests for the {@link ApplicationFileSystemInstruction `ApplicationFileSystemInstruction`} class.
 */
export function ApplicationFileSystemInstructionTests(): void
{
    suite(
        nameof(ApplicationFileSystemInstruction),
        () =>
        {
            /**
             * Provides an implementation of the {@link ApplicationFileSystemInstruction `ApplicationFileSystemInstruction`} class for testing.
             */
            class TestInstruction extends ApplicationFileSystemInstruction
            {
                /**
                 * @inheritdoc
                 *
                 * @param source
                 * The source of the instruction.
                 *
                 * @returns
                 * The default filename.
                 */
                public override MakeDefaultFileName(source: string): string
                {
                    return super.MakeDefaultFileName(source);
                }

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

            let sandbox: SinonSandbox;
            let tempDir: TempDirectory;
            let fileName: string;
            let customName: string;
            let instruction: TestInstruction;

            suiteSetup(
                () =>
                {
                    tempDir = new TempDirectory();
                });

            setup(
                () =>
                {
                    sandbox = createSandbox();
                    fileName = TempFileSystem.TempBaseName();
                    customName = TempFileSystem.TempBaseName();

                    instruction = new TestInstruction(
                        {
                            Source: tempDir.MakePath(fileName)
                        });
                });

            teardown(
                () =>
                {
                    sandbox.restore();
                });

            suite(
                nameof<TestInstruction>((instruction) => instruction.MakeDefaultFileName),
                () =>
                {
                    test(
                        `Checking whether the basename of the default filename can be adjusted using the \`${nameof<TestInstruction>((t) => t.GetAssetFileName)}\` method…`,
                        () =>
                        {
                            sandbox.replace(instruction, "GetAssetFileName", () => customName);

                            strictEqual(
                                changeExt(basename(instruction.MakeDefaultFileName(instruction.Source)), ""),
                                customName);
                        });
                });
        });
}
