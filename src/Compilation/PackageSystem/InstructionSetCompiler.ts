import { IInstruction } from "../../PackageSystem/Instructions/IInstruction.js";
import { InstructionSet } from "../../PackageSystem/Instructions/InstructionSet.js";
import { Compiler } from "../Compiler.js";
import { InstructionCompiler } from "./Instructions/InstructionCompiler.js";

/**
 * Provides the functionality to compile instruction-sets.
 */
export class InstructionSetCompiler extends Compiler<InstructionSet>
{
    /**
     * Initializes a new instance of the {@link InstructionSetCompiler `InstructionSetCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: InstructionSet)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        for (let instruction of this.Item)
        {
            let compiler: InstructionCompiler<IInstruction> = instruction.Compiler;

            if (compiler)
            {
                compiler.DestinationPath = this.DestinationPath;
                await compiler.Execute();
            }
        }
    }
}
