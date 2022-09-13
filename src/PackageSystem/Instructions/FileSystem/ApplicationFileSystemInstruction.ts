import path from "upath";
import { FileInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/FileInstructionCompiler.js";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { FileSystemInstruction } from "./FileSystemInstruction.js";
import { IApplicationFileSystemInstructionOptions } from "./IApplicationFileSystemInstructionOptions.js";

const { join } = path;

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
     * Initializes a new instance of the {@link ApplicationFileSystemInstruction `ApplicationFileSystemInstruction`}.
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

        if (
            (options.Application !== null) &&
            (options.Application !== undefined))
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
    public override get Compiler(): InstructionCompiler<ApplicationFileSystemInstruction>
    {
        return new FileInstructionCompiler(this);
    }

    /**
     * Gets the name of the directory to save the assets archive to.
     */
    protected get AssetDirectoryName(): string
    {
        return "files";
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
    protected override MakeDefaultFileName(source: string): string
    {
        return join(this.AssetDirectoryName, ...(this.Application ? [this.Application] : []), `${this.GetAssetFileName(source)}.tar`);
    }

    /**
     * Gets the default name of the asset file.
     *
     * @param source
     * The source of the instruction.
     *
     * @returns
     * The default name of the asset file.
     */
    protected GetAssetFileName(source: string): string
    {
        return super.MakeDefaultFileName(source);
    }
}
