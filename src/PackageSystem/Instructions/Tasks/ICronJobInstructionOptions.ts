import { INamedObject } from "../../../INamedObject.js";
import { ICronJobOptions } from "../../../Tasks/ICronJobOptions.js";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { CronJobInstruction } from "./CronJobInstruction.js";

/**
 * Provides options for the {@link CronJobInstruction `CronJobInstruction`} class.
 */
export interface ICronJobInstructionOptions extends IDeleteInstructionOptions<INamedObject>
{
    /**
     * The cron-jobs provided by the instruction.
     */
    CronJobs: ICronJobOptions[];
}
