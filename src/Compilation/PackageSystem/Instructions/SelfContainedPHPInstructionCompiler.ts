import { TempDirectory } from "@manuth/temp-files";
import fs from "fs-extra";
import { SelfContainedPHPInstruction } from "../../../PackageSystem/Instructions/SelfContainedPHPInstruction.js";
import { InstructionCompiler } from "./InstructionCompiler.js";

const { copy } = fs;

/**
 * Provides the functionality to compile self-contained php-instructions.
 */
export class SelfContainedPHPInstructionCompiler extends InstructionCompiler<SelfContainedPHPInstruction>
{
    /**
     * Initializes a new instance of the {@link SelfContainedPHPInstructionCompiler `SelfContainedPHPInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: SelfContainedPHPInstruction)
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
        let document = this.Item.FileInstruction.Compiler.Serialize();
        let childNodes = this.Item.PHPInstruction.Compiler.Serialize().childNodes;

        for (let i = 0; i < childNodes.length; i++)
        {
            document.appendChild(childNodes.item(i));
        }

        return document;
    }

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        let fileInstruction = this.Item.FileInstruction;
        let tempDir = new TempDirectory();
        await copy(this.Item.Source, tempDir.MakePath(this.Item.Destination));
        fileInstruction.Source = tempDir.FullName;
        let compiler = fileInstruction.Compiler;
        compiler.DestinationPath = this.DestinationPath;
        await compiler.Execute();
    }
}
