import { CronJobInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/CronJobInstructionCompiler";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { TimePeriod } from "../../../Tasks/TimePeriod";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the `CronJobInstructionCompiler` class.
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
                            CronJobs: [
                                {
                                    Name: "foo",
                                    ClassName: "bar",
                                    Period: TimePeriod.Monthly
                                }
                            ]
                        })));
        }
    }("CronJobInstructionCompiler").Register();
}
