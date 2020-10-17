import { EmojiInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EmojiInstructionCompiler";
import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the `EmojiInstructionCompiler` class.
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
    }("EmojiInstructionCompiler").Register();
}
