import { TemplateListenerInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/TemplateListenerInstructionCompiler.js";
import { TemplateListenerInstruction } from "../../../../PackageSystem/Instructions/Events/TemplateListenerInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner.js";

/**
 * Registers tests for the {@link TemplateListenerInstructionCompiler `TemplateListenerInstructionCompiler`} class.
 */
export function TemplateListenerInstructionCompilerTests(): void
{
    new class extends InstructionCompilerTestRunner<CompilerTester<TemplateListenerInstructionCompiler>, TemplateListenerInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<TemplateListenerInstructionCompiler>
        {
            return new CompilerTester(
                new TemplateListenerInstructionCompiler(
                    new TemplateListenerInstruction(
                        {
                            FileName: "templateListeners.xml",
                            Listeners: []
                        })));
        }
    }(nameof(TemplateListenerInstructionCompiler)).Register();
}
