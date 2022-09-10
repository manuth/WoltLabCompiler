import { INode } from "../NodeSystem/INode.js";
import { NodeItem } from "../NodeSystem/NodeItem.js";
import { ILocalizationItemOptions } from "./ILocalizationItemOptions.js";
import { Localization } from "./Localization.js";

/**
 * Represents a node which contains translations.
 */
export class LocalizationItem extends NodeItem
{
    /**
     * The translations of the node.
     */
    private translations: Localization = new Localization();

    /**
     * Initializes a new instance of the {@link LocalizationItem `LocalizationItem`} class.
     *
     * @param node
     * The node of the item.
     *
     * @param options
     * The options for generating the object.
     */
    public constructor(node: INode, options: ILocalizationItemOptions)
    {
        super(node);

        if (
            (options.Translations !== null) &&
            (options.Translations !== undefined))
        {
            this.Translations.Load(options.Translations);
        }
    }

    /**
     * Gets the translations of the node.
     */
    public get Translations(): Localization
    {
        return this.translations;
    }
}
