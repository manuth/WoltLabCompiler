import { join } from "upath";
import { FileSystemInstruction } from "../FileSystem/FileSystemInstruction";
import { IFileSystemInstructionOptions } from "../FileSystem/IFileSystemInstructionOptions";

/**
 * Represents an instruction which executes sql-code.
 */
export class SQLInstruction extends FileSystemInstruction
{
    /**
     * Initializes a new instance of the {@link SQLInstruction `SQLInstruction`} class.
     *
     * @param options
     * The options of the sql-instruction.
     */
    public constructor(options: IFileSystemInstructionOptions)
    {
        super(options);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "sql";
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
        return join("scripts", "sql", super.MakeDefaultFileName(source));
    }
}
