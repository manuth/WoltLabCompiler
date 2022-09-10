import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction.js";
import { Compiler } from "../../Compiler.js";
import { EmojiFileCompiler } from "../../Presentation/EmojiFileCompiler.js";
import { InstructionFileCompiler } from "./InstructionFileCompiler.js";

/**
 * Provides the functionality to compile emoji-instructions.
 */
export class EmojiInstructionCompiler extends InstructionFileCompiler<EmojiInstruction>
{
    /**
     * Initializes a new instance of the {@link EmojiInstructionCompiler `EmojiInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EmojiInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get FileCompiler(): Compiler<EmojiInstruction>
    {
        return new EmojiFileCompiler(this.Item);
    }
}
