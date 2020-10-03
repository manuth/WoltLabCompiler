import Path = require("path");
import { ApplicationFileSystemInstruction } from "../../FileSystem/ApplicationFileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "../../FileSystem/IApplicationFileSystemInstructionOptions";

/**
 * Represents an instruction which provides templates for the control panel.
 */
export class ACPTemplateInstruction extends ApplicationFileSystemInstruction
{
    /**
     * Initializes a new instance of the `ACPTemplateInstruction` class.
     *
     * @param options
     */
    public constructor(options: IApplicationFileSystemInstructionOptions)
    {
        super(options);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "acpTemplate";
    }

    /**
     * @param source
     * @inheritdoc
     */
    public MakeDefaultFileName(source: string)
    {
        return Path.join("acpTemplates", super.MakeDefaultFileName(source));
    }
}
