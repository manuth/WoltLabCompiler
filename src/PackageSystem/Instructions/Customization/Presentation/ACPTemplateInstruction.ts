import path from "upath";
import { ApplicationFileSystemInstruction } from "../../FileSystem/ApplicationFileSystemInstruction.js";
import { IApplicationFileSystemInstructionOptions } from "../../FileSystem/IApplicationFileSystemInstructionOptions.js";

const { join } = path;

/**
 * Represents an instruction which provides templates for the control panel.
 */
export class ACPTemplateInstruction extends ApplicationFileSystemInstruction
{
    /**
     * Initializes a new instance of the {@link ACPTemplateInstruction `ACPTemplateInstruction`} class.
     *
     * @param options
     * The options of the acp-template instruction.
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
        return "acpTemplate";
    }

    /**
     * @inheritdoc
     *
     * @param source
     * The source of the instruction.
     *
     * @returns
     * The default filename.
     */
    public override MakeDefaultFileName(source: string): string
    {
        return join("acpTemplates", super.MakeDefaultFileName(source));
    }
}
