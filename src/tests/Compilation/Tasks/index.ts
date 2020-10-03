import { CronJobFileCompilerTests } from "./CronJobFileCompiler.test";

/**
 * Registers tests for task-compilers.
 */
export function TaskTests(): void
{
    suite(
        "Tasks",
        () =>
        {
            CronJobFileCompilerTests();
        });
}
