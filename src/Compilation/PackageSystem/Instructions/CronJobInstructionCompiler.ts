import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction.js";
import { Compiler } from "../../Compiler.js";
import { CronJobFileCompiler } from "../../Tasks/CronJobFileCompiler.js";
import { InstructionFileCompiler } from "./InstructionFileCompiler.js";

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
