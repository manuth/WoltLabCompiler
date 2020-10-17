import { TimePeriodTests } from "./TimePeriod.test";

/**
 * Registers tests for task-components.
 */
export function TaskTests(): void
{
    suite(
        "Tasks",
        () =>
        {
            TimePeriodTests();
        });
}
