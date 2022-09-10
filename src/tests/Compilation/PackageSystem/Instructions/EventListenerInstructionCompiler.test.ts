import { EventListenerInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/EventListenerInstructionCompiler.js";
import { EventListenerInstruction } from "../../../../PackageSystem/Instructions/Events/EventListenerInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner.js";

/**
 * Registers tests for the {@link EventListenerInstructionCompiler `EventListenerInstructionCompiler`} class.
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
    }(nameof(EventListenerInstructionCompiler)).Register();
}
