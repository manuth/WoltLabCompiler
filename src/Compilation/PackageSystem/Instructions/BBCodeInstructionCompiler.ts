import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction.js";
import { BBCodeFileCompiler } from "../../Presentation/BBCodeFileCompiler.js";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler.js";

/**
 * Provides the functionality to compile bb-code instructions.
 */
export class BBCodeInstructionCompiler extends LocalizationProviderCompiler<BBCodeInstruction>
{
    /**
     * Initializes a new instance of the {@link BBCodeInstructionCompiler `BBCodeInstructionCompiler`} class.
     *
     * @param item
     * The instruction to compile.
     */
    public constructor(item: BBCodeInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        await super.Compile();
        let bbCodeFileCompiler: BBCodeFileCompiler = new BBCodeFileCompiler(this.Item);
        bbCodeFileCompiler.DestinationPath = this.DestinationFileName;
        await bbCodeFileCompiler.Execute();
    }
}
