import { TempDirectory } from "@manuth/temp-files";
import { ApplicationFileSystemInstruction } from "../../../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { InstructionCompiler } from "./InstructionCompiler.js";

/**
 * Provides the functionality to compile a file-instruction.
 */
export class FileInstructionCompiler extends InstructionCompiler<ApplicationFileSystemInstruction>
{
    /**
     * Initializes a new instance of the {@link FileInstructionCompiler `FileInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ApplicationFileSystemInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    public override Serialize(): Document
    {
        let document = super.Serialize();
        let editor = new XMLEditor(document.documentElement);

        if (this.Item.Application)
        {
            editor.SetAttribute("application", this.Item.Application);
        }

        return document;
    }

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        let tempDir = new TempDirectory();
        await this.CopyTemplate(this.Item.Source, tempDir.FullName);
        await this.Compress(tempDir.FullName, this.DestinationFileName);
        tempDir.Dispose();
    }
}
