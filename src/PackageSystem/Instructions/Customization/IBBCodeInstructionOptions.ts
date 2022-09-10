import { IBBCodeOptions } from "../../../Customization/BBCodes/IBBCodeOptions.js";
import { INamedObject } from "../../../INamedObject.js";
import { ILocalizationInstructionOptions } from "../Globalization/ILocalizationInstructionOptions.js";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BBCodeInstruction } from "./BBCodeInstruction.js";

/**
 * Provides options for the {@link BBCodeInstruction `BBCodeInstruction`} class.
 */
export interface IBBCodeInstructionOptions extends IDeleteInstructionOptions<INamedObject>, ILocalizationInstructionOptions
{
    /**
     * The bb-codes provided by this instruction.
     */
    BBCodes: IBBCodeOptions[];
}
