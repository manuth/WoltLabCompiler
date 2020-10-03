import Path = require("path");
import { FileSystemInstruction } from "../FileSystem/FileSystemInstruction";
import { IFileSystemInstructionOptions } from "../FileSystem/IFileSystemInstructionOptions";

/**
 * Represents an instruction which executes sql-code.
 */
export class SQLInstruction extends FileSystemInstruction
{
    /**
     * Initializes a new instance of the `SQLInstruction` class.
     *
     * @param options
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
     * @param source
     * @inheritdoc
     */
    protected MakeDefaultFileName(source: string)
    {
        return Path.join("scripts", "sql", super.MakeDefaultFileName(source));
    }
}
