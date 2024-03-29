import path from "upath";
import { FileSystemInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/FileSystemInstructionCompiler.js";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { Instruction } from "../Instruction.js";
import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions.js";

const { basename, isAbsolute, normalize, sep } = path;

/**
 * Represents an instruction which is bound to a file-system entry.
 */
export abstract class FileSystemInstruction extends Instruction
{
    /**
     * The path to the file-system entry the instruction is bound to.
     */
    private source: string;

    /**
     * Initializes a new instance of the {@link FileSystemInstruction `FileSystemInstruction`} class.
     *
     * @param options
     * The options of the file-system instruction.
     */
    public constructor(options: IFileSystemInstructionOptions)
    {
        super(
            {
                FileName: options.FileName
            });

        this.Source = options.Source;
    }

    /**
     * Gets or sets the path to the file-system entry the instruction is bound to.
     */
    public get Source(): string
    {
        return this.source;
    }

    /**
     * @inheritdoc
     */
    public set Source(value: string)
    {
        this.source = value;
    }

    /**
     * @inheritdoc
     */
    public override get FileName(): string
    {
        return super.FileName ?? this.MakeDefaultFileName(this.Source);
    }

    /**
     * @inheritdoc
     */
    public override set FileName(value: string)
    {
        super.FileName = value;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<FileSystemInstruction>
    {
        return new FileSystemInstructionCompiler(this);
    }

    /**
     * Creates a default file-name based on the source of the instruction.
     *
     * @param source
     * The source of the instruction.
     *
     * @returns
     * The default filename.
     */
    protected MakeDefaultFileName(source: string): string
    {
        if (
            isAbsolute(source) ||
            (normalize(source).split(sep)[0] === ".."))
        {
            return basename(source);
        }
        else
        {
            return source;
        }
    }
}
