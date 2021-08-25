import { basename } from "path";
import { TimePeriodTests } from "./TimePeriod.test";

/**
 * Registers tests for task-components.
 */
export function TaskTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            TimePeriodTests();
        });
}
