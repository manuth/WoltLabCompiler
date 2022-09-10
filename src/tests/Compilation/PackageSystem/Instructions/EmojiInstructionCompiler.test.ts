import { EmojiInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/EmojiInstructionCompiler.js";
import { EmojiInstruction } from "../../../../PackageSystem/Instructions/Customization/EmojiInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner.js";

/**
 * Registers tests for the {@link EmojiInstructionCompiler `EmojiInstructionCompiler`} class.
 */
export function EmojiInstructionCompilerTests(): void
{
    new class extends InstructionCompilerTestRunner<CompilerTester<EmojiInstructionCompiler>, EmojiInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<EmojiInstructionCompiler>
        {
            return new CompilerTester(
                new EmojiInstructionCompiler(
                    new EmojiInstruction(
                        {
                            FileName: "emojis.xml",
                            Emojis: []
                        })));
        }
    }(nameof(EmojiInstructionCompiler)).Register();
}
