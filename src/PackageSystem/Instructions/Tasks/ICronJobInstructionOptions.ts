import { INamedObject } from "../../../INamedObject";
import { ICronJobOptions } from "../../../Tasks/ICronJobOptions";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CronJobInstruction } from "./CronJobInstruction";

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
