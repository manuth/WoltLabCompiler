import { INodeOptions } from "../NodeSystem/INodeOptions.js";
import { Node } from "../NodeSystem/Node.js";
import { ILocalizationItemOptions } from "./ILocalizationItemOptions.js";
import { LocalizationItem } from "./LocalizationItem.js";

/**
 * Represents a node which provides localizations.
 */
export class LocalizationNode extends Node<LocalizationItem, ILocalizationItemOptions>
{
    /**
     * Initializes a new instance of the {@link LocalizationNode `LocalizationNode`} class.
     *
     * @param options
     * The options of the localization-node.
     */
    public constructor(options: INodeOptions<ILocalizationItemOptions>)
    {
        super(
            options,
            (node: Node<LocalizationItem, ILocalizationItemOptions>, opts: ILocalizationItemOptions): LocalizationItem =>
            {
                return new LocalizationItem(node, opts);
            });
    }
}
