import { basename } from "node:path";
import { CronJobFileCompilerTests } from "./CronJobFileCompiler.test.js";

/**
 * Registers tests for task-compilers.
 */
export function TaskTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            CronJobFileCompilerTests();
        });
}
