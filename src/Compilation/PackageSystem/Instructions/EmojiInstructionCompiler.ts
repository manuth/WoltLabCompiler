import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction";
import { Compiler } from "../../Compiler";
import { EmojiFileCompiler } from "../../Presentation/EmojiFileCompiler";
import { InstructionFileCompiler } from "./InstructionFileCompiler";

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
