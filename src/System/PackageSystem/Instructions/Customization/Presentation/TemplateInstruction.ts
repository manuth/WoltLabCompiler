import Path = require("path");
import { ApplicationFileSystemInstruction } from "../../FileSystem/ApplicationFileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "../../FileSystem/IApplicationFileSystemInstructionOptions";

/**
 * Represents an instruction which provides templates.
 */
export class TemplateInstruction extends ApplicationFileSystemInstruction
{
    /**
     * Initializes a new instance of the `TemplateInstruction` class.
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
        return "template";
    }

    /**
     * @param source
     * @inheritdoc
     */
    public MakeDefaultFileName(source: string)
    {
        return Path.join("templates", super.MakeDefaultFileName(source));
    }
}
