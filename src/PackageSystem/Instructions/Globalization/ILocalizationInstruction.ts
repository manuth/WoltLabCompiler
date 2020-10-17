import { IInstruction } from "../IInstruction";

/**
 * Represents a node which provides translations.
 */
export interface ILocalizationInstruction extends IInstruction
{
    /**
     * Gets the path to save the translations to.
     */
    TranslationDirectory: string;

    /**
     * Gets the messages provided by the instruction.
     *
     * @returns
     * The messages of the options-instruction.
     */
    GetMessages(): Record<string, Record<string, Record<string, string>>>;
}
