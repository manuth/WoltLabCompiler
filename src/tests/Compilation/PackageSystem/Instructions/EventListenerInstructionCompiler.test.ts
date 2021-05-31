import { EventListenerInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/EventListenerInstructionCompiler";
import { EventListenerInstruction } from "../../../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the `EventListenerInstructionCompiler` class.
 */
export function EventListenerInstructionCompilerTests(): void
{
    new class extends InstructionCompilerTestRunner<CompilerTester<EventListenerInstructionCompiler>, EventListenerInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<EventListenerInstructionCompiler>
        {
            return new CompilerTester(
                new EventListenerInstructionCompiler(
                    new EventListenerInstruction(
                        {
                            FileName: "eventListeners.xml",
                            Listeners: []
                        })));
        }
    }("EventListenerInstructionCompiler").Register();
}
