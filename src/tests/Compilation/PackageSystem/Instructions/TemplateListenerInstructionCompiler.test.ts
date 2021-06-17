import { TemplateListenerInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/TemplateListenerInstructionCompiler";
import { TemplateListenerInstruction } from "../../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner";

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
    }("TemplateListenerInstructionCompiler").Register();
}
