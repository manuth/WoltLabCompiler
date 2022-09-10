import { INode } from "../../NodeSystem/INode.js";
import { Category } from "../Category.js";
import { ICategoryOptions } from "../ICategoryOptions.js";
import { GroupOption } from "./GroupOption.js";
import { IGroupOptionOptions } from "./IGroupOptionOptions.js";

/**
 * Represents an option-category for groups.
 */
export class GroupCategory extends Category<GroupOption, IGroupOptionOptions>
{
    /**
     * Initializes a new instance of the {@link GroupCategory `GroupCategory`} class.
     *
     * @param node
     * The node of the category.
     *
     * @param options
     * The options of the category.
     */
    public constructor(node: INode, options: ICategoryOptions<IGroupOptionOptions>)
    {
        super(
            node,
            options,
            (category: Category<GroupOption, IGroupOptionOptions>, opts: IGroupOptionOptions) =>
            {
                return new GroupOption(category, opts);
            });
    }
}
