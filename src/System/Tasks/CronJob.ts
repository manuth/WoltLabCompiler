import { Localization } from "../Globalization/Localization";
import { ICronJobOptions } from "./ICronJobOptions";
import { TimePeriod } from "./TimePeriod";

/**
 * Represents a cron-job.
 */
export class CronJob
{
    /**
     * The name of the cron-job.
     */
    private name: string;

    /**
     * The class-name of the cron-job.
     */
    private className: string;

    /**
     * The description of the cron-job.
     */
    private description = new Localization();

    /**
     * A value indicating whether the cron-job can be disabled.
     */
    private allowDisable = false;

    /**
     * A value indicating whether the cron-job can be edited.
     */
    private allowEdit = false;

    /**
     * A set of options of which at least one must be enabled in order to execute the cron-job.
     */
    private options: string[] = [];

    /**
     * The period to execute the cron-job.
     */
    private period: TimePeriod;

    /**
     * Initializes a new instance of the `CronJob` class.
     *
     * @param options
     * The options of the cron-job.
     */
    public constructor(options: ICronJobOptions)
    {
        if (options.Name)
        {
            this.Name = options.Name;
        }

        this.ClassName = options.ClassName;

        if (options.Description)
        {
            this.Description.Data = options.Description;
        }

        if (options.AllowDisable)
        {
            this.AllowDisable = options.AllowDisable;
        }

        if (options.AllowEdit)
        {
            this.AllowEdit = options.AllowEdit;
        }

        if (options.Options)
        {
            this.Options = options.Options;
        }

        this.Period = options.Period;
    }

    /**
     * Gets or sets the name of the cron-job.
     */
    public get Name(): string
    {
        return this.name;
    }

    /**
     * @inheritdoc
     */
    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets or sets the class-name of the cron-job.
     */
    public get ClassName(): string
    {
        return this.className;
    }

    /**
     * @inheritdoc
     */
    public set ClassName(value: string)
    {
        this.className = value;
    }

    /**
     * Gets the description of the cron-job.
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * Gets or sets a value indicating whether the cron-job can be disabled.
     */
    public get AllowDisable(): boolean
    {
        return this.allowDisable;
    }

    /**
     * @inheritdoc
     */
    public set AllowDisable(value: boolean)
    {
        this.allowDisable = value;
    }

    /**
     * Gets or sets a value indicating whether the cron-job can be edited.
     */
    public get AllowEdit(): boolean
    {
        return this.allowEdit;
    }

    /**
     * @inheritdoc
     */
    public set AllowEdit(value: boolean)
    {
        this.allowEdit = value;
    }

    /**
     * Gets or sets a set of options of which at least one must be enabled in order to execute the cron-job.
     */
    public get Options(): string[]
    {
        return this.options;
    }

    /**
     * @inheritdoc
     */
    public set Options(value: string[])
    {
        this.options = value;
    }

    /**
     * Gets or sets the period to execute the cron-job.
     */
    public get Period(): TimePeriod
    {
        return this.period;
    }

    /**
     * @inheritdoc
     */
    public set Period(value: TimePeriod)
    {
        this.period = value;
    }
}
