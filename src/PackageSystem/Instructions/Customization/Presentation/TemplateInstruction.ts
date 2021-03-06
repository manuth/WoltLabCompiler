import { join } from "upath";
import { ApplicationFileSystemInstruction } from "../../FileSystem/ApplicationFileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "../../FileSystem/IApplicationFileSystemInstructionOptions";

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
     *
     * @param source
     * The source of the instruction.
     *
     * @returns
     * The default filename.
     */
    public override MakeDefaultFileName(source: string): string
    {
        return join("templates", super.MakeDefaultFileName(source));
    }
}
