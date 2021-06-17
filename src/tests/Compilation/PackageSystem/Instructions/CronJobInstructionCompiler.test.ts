import { CronJobInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/CronJobInstructionCompiler";
import { CronJobInstruction } from "../../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the {@link CronJobInstructionCompiler `CronJobInstructionCompiler`} class.
 */
export function CronJobInstructionCompilerTests(): void
{
    new class extends InstructionCompilerTestRunner<CompilerTester<CronJobInstructionCompiler>, CronJobInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<CronJobInstructionCompiler>
        {
            return new CompilerTester(
                new CronJobInstructionCompiler(
                    new CronJobInstruction(
                        {
                            FileName: "cronJobs.xml",
                            CronJobs: []
                        })));
        }
    }("CronJobInstructionCompiler").Register();
}
