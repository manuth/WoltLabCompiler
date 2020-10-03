import { FileInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/FileInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { FileSystemInstruction } from "./FileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "./IApplicationFileSystemInstructionOptions";

/**
 * Represents an instruction which uploads files for a specific application.
 */
export class ApplicationFileSystemInstruction extends FileSystemInstruction
{
    /**
     * The application to upload the files to.
     */
    private application: string = null;

    /**
     * Initializes a new instance of the `ApplicationFileSystemInstruction`.
     *
     * @param options
     * The options of the application file-system instruction.
     */
    public constructor(options: IApplicationFileSystemInstructionOptions)
    {
        super(
            {
                Source: options.Source,
                FileName: options.FileName
            });

        if (options.Application)
        {
            this.Application = options.Application;
        }
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "file";
    }

    /**
     * Gets or sets the application to upload the files to.
     */
    public get Application(): string
    {
        return this.application;
    }

    /**
     * @inheritdoc
     */
    public set Application(value: string)
    {
        this.application = value;
    }

    /**
     * @inheritdoc
     */
    public get Compiler(): InstructionCompiler<ApplicationFileSystemInstruction>
    {
        return new FileInstructionCompiler(this);
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
    protected MakeDefaultFileName(source: string): string
    {
        return `${super.MakeDefaultFileName(source)}.tar`;
    }
}
