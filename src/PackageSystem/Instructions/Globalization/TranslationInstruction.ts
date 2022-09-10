import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions.js";
import { LocalizationItem } from "../../../Globalization/LocalizationItem.js";
import { Node } from "../../../NodeSystem/Node.js";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions.js";
import { LocalizationInstruction } from "./LocalizationInstruction.js";

/**
 * Represents an instruction which provides translations.
 */
export class TranslationInstruction extends LocalizationInstruction<LocalizationItem, ILocalizationItemOptions>
{
    /**
     * Initializes a new instance of the {@link TranslationInstruction `TranslationInstruction`} class.
     *
     * @param options
     * The options of the node-system instruction.
     */
    public constructor(options: INodeSystemInstructionOptions<ILocalizationItemOptions>)
    {
        super(
            options,
            (node: Node<LocalizationItem, ILocalizationItemOptions>, opts: ILocalizationItemOptions): LocalizationItem =>
            {
                return new LocalizationItem(node, opts);
            });
    }
}
