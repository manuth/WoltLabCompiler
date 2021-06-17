import { INode } from "../../NodeSystem/INode";
import { Category } from "../Category";
import { ICategoryOptions } from "../ICategoryOptions";
import { GroupOption } from "./GroupOption";
import { IGroupOptionOptions } from "./IGroupOptionOptions";

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
