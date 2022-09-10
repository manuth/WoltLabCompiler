import { INode } from "../../NodeSystem/INode.js";
import { Category } from "../Category.js";
import { ICategoryOptions } from "../ICategoryOptions.js";
import { ACPOption } from "./ACPOption.js";
import { IACPOptionOptions } from "./IACPOptionOptions.js";

/**
 * Represents an option-category for the control-panel.
 */
export class ACPCategory extends Category<ACPOption, IACPOptionOptions>
{
    /**
     * Initializes a new instance of the {@link ACPCategory `ACPCategory`} class.
     *
     * @param node
     * The node of the category.
     *
     * @param options
     * The options of the category.
     */
    public constructor(node: INode, options: ICategoryOptions<IACPOptionOptions>)
    {
        super(
            node,
            options,
            (category: Category<ACPOption, IACPOptionOptions>, opts: IACPOptionOptions): ACPOption =>
            {
                return new ACPOption(category, opts);
            });
    }
}
