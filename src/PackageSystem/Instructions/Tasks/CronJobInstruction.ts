import { CronJobInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/CronJobInstructionCompiler.js";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { CronJob } from "../../../Tasks/CronJob.js";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction.js";
import { ICronJobInstructionOptions } from "./ICronJobInstructionOptions.js";

/**
 * Represents an instruction which install cron-jobs.
 */
export class CronJobInstruction extends NamedDeleteInstruction
{
    /**
     * The cron-jobs provided by the instruction.
     */
    private cronJobs: CronJob[] = [];

    /**
     * Initializes a new instance of the {@link CronJobInstruction `CronJobInstruction`} class.
     *
     * @param options
     * The options of the cron-job instruction.
     */
    public constructor(options: ICronJobInstructionOptions)
    {
        super(options);

        for (let cronJob of options.CronJobs)
        {
            this.CronJobs.push(new CronJob(cronJob));
        }
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "cronjob";
    }

    /**
     * Gets or sets the cron-jobs provided by the instruction.
     */
    public get CronJobs(): CronJob[]
    {
        return this.cronJobs;
    }

    /**
     * @inheritdoc
     */
    public set CronJobs(value: CronJob[])
    {
        this.cronJobs = value;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<CronJobInstruction>
    {
        return new CronJobInstructionCompiler(this);
    }
}
