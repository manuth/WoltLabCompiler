import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Compiler } from "../../Compiler";
import { CronJobFileCompiler } from "../../Tasks/CronJobFileCompiler";
import { InstructionFileCompiler } from "./InstructionFileCompiler";

/**
 * Provides the functionality to compile cronjob-instructions.
 */
export class CronJobInstructionCompiler extends InstructionFileCompiler<CronJobInstruction>
{
    /**
     * Initializes a new instance of the {@link CronJobInstructionCompiler `CronJobInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: CronJobInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get FileCompiler(): Compiler<CronJobInstruction>
    {
        return new CronJobFileCompiler(this.Item);
    }
}
