import { basename, isAbsolute, normalize, sep } from "upath";
import { FileSystemInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/FileSystemInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { Instruction } from "../Instruction";
import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions";

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
     * Initializes a new instance of the `FileSystemInstruction` class.
     *
     * @param options
     * The options of the file-system instruction.
     */
    public constructor(options: IFileSystemInstructionOptions)
    {
        super({
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
    public get FileName(): string
    {
        return super.FileName ?? this.MakeDefaultFileName(this.Source);
    }

    /**
     * @inheritdoc
     */
    public set FileName(value: string)
    {
        super.FileName = value;
    }

    /**
     * @inheritdoc
     */
    public get Compiler(): InstructionCompiler<FileSystemInstruction>
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
