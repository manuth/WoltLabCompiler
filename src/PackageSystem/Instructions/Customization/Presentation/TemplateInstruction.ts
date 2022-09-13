import { ApplicationFileSystemInstruction } from "../../FileSystem/ApplicationFileSystemInstruction.js";
import { IApplicationFileSystemInstructionOptions } from "../../FileSystem/IApplicationFileSystemInstructionOptions.js";

/**
 * Represents an instruction which provides templates.
 */
export class TemplateInstruction extends ApplicationFileSystemInstruction
{
    /**
     * Initializes a new instance of the {@link TemplateInstruction `TemplateInstruction`} class.
     *
     * @param options
     * The options of the template-instruction.
     */
    public constructor(options: IApplicationFileSystemInstructionOptions)
    {
        super(options);
    }

    /**
     * @inheritdoc
     */
    public override get Type(): string
    {
        return "template";
    }

    /**
     * @inheritdoc
     */
    protected override get AssetDirectoryName(): string
    {
        return "templates";
    }
}
