import { IEmojiOptions } from "../../../Customization/Presentation/IEmojiOptions.js";
import { INamedObject } from "../../../INamedObject.js";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmojiInstruction } from "./EmojiInstruction.js";

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
