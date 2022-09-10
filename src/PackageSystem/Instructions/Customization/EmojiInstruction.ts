import { EmojiInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EmojiInstructionCompiler.js";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { Emoji } from "../../../Customization/Presentation/Emoji.js";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction.js";
import { IEmojiInstructionOptions } from "./IEmojiInstructionOptions.js";

/**
 * Represents an instruction which provides emojis.
 */
export class EmojiInstruction extends NamedDeleteInstruction
{
    /**
     * The emojis provided by the instruction.
     */
    private emojis: Emoji[] = [];

    /**
     * Initializes a new instance of the {@link EmojiInstruction `EmojiInstruction`} class.
     *
     * @param options
     * The options of the emoji-instruction.
     */
    public constructor(options: IEmojiInstructionOptions)
    {
        super(options);

        for (let emoji of options.Emojis)
        {
            this.Emojis.push(new Emoji(emoji));
        }
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "smiley";
    }

    /**
     * Gets the emojis provided by the instruction.
     */
    public get Emojis(): Emoji[]
    {
        return this.emojis;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<EmojiInstruction>
    {
        return new EmojiInstructionCompiler(this);
    }
}
