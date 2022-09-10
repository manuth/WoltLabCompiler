import { basename } from "node:path";
import { TimePeriodTests } from "./TimePeriod.test.js";

/**
 * Registers tests for task-components.
 */
export function TaskTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            TimePeriodTests();
        });
}
