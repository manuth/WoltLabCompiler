import path from "upath";
import { InstructionCompiler } from "../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { SelfContainedPHPInstructionCompiler } from "../../Compilation/PackageSystem/Instructions/SelfContainedPHPInstructionCompiler.js";
import { ApplicationFileSystemInstruction } from "./FileSystem/ApplicationFileSystemInstruction.js";
import { FileSystemInstruction } from "./FileSystem/FileSystemInstruction.js";
import { InstructionSet } from "./InstructionSet.js";
import { ISelfContainedPHPInstructionOptions } from "./ISelfContainedPHPInstructionOptions.js";
import { PHPInstruction } from "./PHPInstruction.js";

const { dirname, join } = path;

/**
 * Represents an instruction which uploads and executes `.php`-code.
 */
export class SelfContainedPHPInstruction extends ApplicationFileSystemInstruction
{
    /**
     * The path to save the `.php`-file to.
     */
    private destination: string;

    /**
     * Initializes a new instance of the {@link SelfContainedPHPInstruction `SelfContainedPHPInstruction`} class.
     *
     * @param options
     * The options of the self-contained php instruction.
     */
    public constructor(options: ISelfContainedPHPInstructionOptions)
    {
        super(options);
        this.Destination = options.Destination;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<SelfContainedPHPInstruction>
    {
        return new SelfContainedPHPInstructionCompiler(this);
    }

    /**
     * Gets or sets the path to load the `.php`-file from.
     */
    public override get Source(): string
    {
        return super.Source;
    }

    /**
     * @inheritdoc
     */
    public override set Source(value: string)
    {
        super.Source = value;
    }

    /**
     * @inheritdoc
     */
    public override get FileName(): string
    {
        return super.FileName;
    }

    /**
     * @inheritdoc
     */
    public override set FileName(value: string)
    {
        super.FileName = value;
    }

    /**
     * Gets or sets the path to save the `.php`-file to.
     */
    public get Destination(): string
    {
        return this.destination;
    }

    /**
     * @inheritdoc
     */
    public set Destination(value: string)
    {
        this.destination = value;
    }

    /**
     * Gets the file-instruction contained by this instruction.
     */
    public get FileInstruction(): FileSystemInstruction
    {
        let collection = new InstructionSet(this.Collection.Package);
        collection.Directory = this.Collection.Directory;

        let result = new ApplicationFileSystemInstruction(
            {
                Application: this.Application,
                Source: null,
                FileName: this.FileName
            });

        collection.push(result);
        return result;
    }

    /**
     * Gets the php-instruction contained by this instruction.
     */
    public get PHPInstruction(): PHPInstruction
    {
        let collection = new InstructionSet(this.Collection.Package);
        collection.Directory = this.Collection.Directory;

        let result = new PHPInstruction(
            {
                Application: this.Application,
                FileName: this.Destination,
                Standalone: this.Standalone
            });

        collection.push(result);
        return result;
    }

    /**
     * @inheritdoc
     */
    protected override get AssetDirectoryName(): string
    {
        return join("scripts", "php");
    }

    /**
     * @inheritdoc
     *
     * @param source
     * The source of the instruction.
     *
     * @returns
     * The default name of the asset file.
     */
    protected override GetAssetFileName(source: string): string
    {
        return super.GetAssetFileName(dirname(source));
    }
}
