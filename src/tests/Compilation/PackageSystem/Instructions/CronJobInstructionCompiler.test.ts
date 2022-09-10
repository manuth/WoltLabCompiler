import { CronJobInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/CronJobInstructionCompiler.js";
import { CronJobInstruction } from "../../../../PackageSystem/Instructions/Tasks/CronJobInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner.js";

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
    }(nameof(CronJobInstructionCompiler)).Register();
}
