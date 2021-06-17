import { IBBCodeOptions } from "../../../Customization/BBCodes/IBBCodeOptions";
import { INamedObject } from "../../../INamedObject";
import { ILocalizationInstructionOptions } from "../Globalization/ILocalizationInstructionOptions";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BBCodeInstruction } from "./BBCodeInstruction";

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
