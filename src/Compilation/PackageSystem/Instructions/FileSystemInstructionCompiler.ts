import { FileSystemInstruction } from "../../../PackageSystem/Instructions/FileSystem/FileSystemInstruction.js";
import { InstructionCompiler } from "./InstructionCompiler.js";

/**
 * Provides the functionality to compile an sql-instruction.
 */
export class FileSystemInstructionCompiler extends InstructionCompiler<FileSystemInstruction>
{
    /**
     * Initializes a new instance of the {@link FileSystemInstructionCompiler `FileSystemInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: FileSystemInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        await this.CopyTemplate(this.Item.Source, this.DestinationFileName);
    }
}
