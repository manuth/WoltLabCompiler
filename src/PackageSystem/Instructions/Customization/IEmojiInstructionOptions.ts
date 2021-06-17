import { IEmojiOptions } from "../../../Customization/Presentation/IEmojiOptions";
import { INamedObject } from "../../../INamedObject";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmojiInstruction } from "./EmojiInstruction";

/**
 * Provides options for the {@link EmojiInstruction `EmojiInstruction`} class.
 */
export interface IEmojiInstructionOptions extends IDeleteInstructionOptions<INamedObject>
{
    /**
     * The emojis provided by the instruction.
     */
    Emojis: IEmojiOptions[];
}
