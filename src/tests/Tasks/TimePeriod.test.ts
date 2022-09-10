import { strictEqual } from "assert";
import { TimePeriod } from "../../Tasks/TimePeriod.js";
import { PeriodTester } from "./PeriodTester.js";

/**
 * Registers tests for the {@link TimePeriod `TimePeriod`} class.
 */
export function TimePeriodTests(): void
{
    suite(
        nameof(TimePeriod),
        () =>
        {
            let tester: PeriodTester;

            setup(
                () =>
                {
                    tester = new PeriodTester(new TimePeriod("*", "*", "*", "*", "*"));
                });

            suite(
                nameof(TimePeriod.Yearly),
                () =>
                {
                    setup(
                        () =>
                        {
                            tester = new PeriodTester(TimePeriod.Yearly);
                        });

                    test(
                        `Checking whether the \`${nameof(TimePeriod)}.${nameof(TimePeriod.Yearly)}\`-period is triggered every year…`,
                        () =>
                        {
                            let nextDate = new Date(tester.StartDate);
                            nextDate.setFullYear(tester.StartDate.getFullYear() + 1);

                            strictEqual(
                                tester.NextDate.getTime() - tester.StartDate.getTime(),
                                nextDate.getTime() - tester.StartDate.getTime());
                        });
                });

            suite(
                nameof(TimePeriod.Monthly),
                () =>
                {
                    setup(
                        () =>
                        {
                            tester = new PeriodTester(TimePeriod.Monthly);
                        });

                    test(
                        `Checking whether the \`${nameof(TimePeriod)}.${nameof(TimePeriod.Monthly)}\`-period is triggered every month…`,
                        () =>
                        {
                            let nextDate = new Date(tester.StartDate);
                            nextDate.setMonth(tester.StartDate.getMonth() + 1);

                            strictEqual(
                                tester.NextDate.getTime() - tester.StartDate.getTime(),
                                nextDate.getTime() - tester.StartDate.getTime());
                        });
                });

            suite(
                nameof(TimePeriod.Weekly),
                () =>
                {
                    setup(
                        () =>
                        {
                            tester = new PeriodTester(TimePeriod.Weekly);
                        });

                    test(
                        `Checking whether the \`${nameof(TimePeriod)}.${nameof(TimePeriod.Weekly)}\`-period is triggered every week…`,
                        () =>
                        {
                            let nextDate = new Date(tester.StartDate);
                            nextDate.setDate(tester.StartDate.getDate() + 7);

                            strictEqual(
                                tester.NextDate.getTime() - tester.StartDate.getTime(),
                                nextDate.getTime() - tester.StartDate.getTime());
                        });
                });

            suite(
                nameof(TimePeriod.Daily),
                () =>
                {
                    setup(
                        () =>
                        {
                            tester = new PeriodTester(TimePeriod.Daily);
                        });

                    test(
                        `Checking whether the \`${nameof(TimePeriod)}.${nameof(TimePeriod.Daily)}\`-period is triggered every day…`,
                        () =>
                        {
                            let nextDate = new Date(tester.StartDate);
                            nextDate.setDate(tester.StartDate.getDate() + 1);

                            strictEqual(
                                tester.NextDate.getTime() - tester.StartDate.getTime(),
                                nextDate.getTime() - tester.StartDate.getTime());
                        });
                });

            suite(
                nameof(TimePeriod.Hourly),
                () =>
                {
                    setup(
                        () =>
                        {
                            tester = new PeriodTester(TimePeriod.Hourly);
                        });

                    test(
                        `Checking whether the \`${nameof(TimePeriod)}.${nameof(TimePeriod.Hourly)}\`-period is triggered every hour…`,
                        () =>
                        {
                            let nextDate = new Date(tester.StartDate);
                            nextDate.setHours(tester.StartDate.getHours() + 1);

                            strictEqual(
                                tester.NextDate.getTime() - tester.StartDate.getTime(),
                                nextDate.getTime() - tester.StartDate.getTime());
                        });
                });
        });
}
