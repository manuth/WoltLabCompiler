import { CronExpression, parseExpression } from "cron-parser";
import { TimePeriod } from "../../Tasks/TimePeriod";

/**
 * Provides the functionality to test {@link TimePeriod `TimePeriod`}-instances.
 */
export class PeriodTester
{
    /**
     * The time-period to test.
     */
    private period: TimePeriod;

    /**
     * The start-date.
     */
    private startDate: Date = null;

    /**
     * Initializes a new instance of the {@link PeriodTester `PeriodTester`} class.
     *
     * @param period
     * The period to test.
     */
    public constructor(period: TimePeriod)
    {
        this.period = period;
    }

    /**
     * Gets the time-period to test.
     */
    public get Period(): TimePeriod
    {
        return this.period;
    }

    /**
     * Gets the cron-expression representing the time-period.
     */
    public get CronExpression(): CronExpression
    {
        return parseExpression(
            `${this.Period.Minute} ${this.Period.Hour} ${this.Period.DayOfMonth} ${this.Period.Month} ${this.Period.DayOfWeek}`);
    }

    /**
     * Gets the next date the period matches.
     */
    public get StartDate(): Date
    {
        if (this.startDate === null)
        {
            this.startDate = new Date(this.CronExpression.next().getTime());
        }

        return this.startDate;
    }

    /**
     * Gets the next execution-time after the {@link PeriodTester.StartDate `StartDate`}.
     */
    public get NextDate(): Date
    {
        let expression = this.CronExpression;
        expression.reset(this.StartDate);
        return new Date(expression.next().getTime());
    }
}
