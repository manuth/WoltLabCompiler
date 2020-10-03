import { INode } from "../NodeSystem/INode";
import { NodeItem } from "../NodeSystem/NodeItem";
import { ILocalizationItemOptions } from "./ILocalizationItemOptions";
import { Localization } from "./Localization";

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
     * Initializes a new instance of the `LocalizationItem` class.
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

        if (options.Translations)
        {
            this.Translations.Data = options.Translations;
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
