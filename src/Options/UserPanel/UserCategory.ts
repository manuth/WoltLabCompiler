import { INode } from "../../NodeSystem/INode.js";
import { Category } from "../Category.js";
import { ICategoryOptions } from "../ICategoryOptions.js";
import { IUserOptionOptions } from "./IUserOptionOptions.js";
import { UserOption } from "./UserOption.js";

/**
 * Represents an option-category for users.
 */
export class UserCategory extends Category<UserOption, IUserOptionOptions>
{
    /**
     * Initializes a new instance of the {@link UserCategory `UserCategory`} class.
     *
     * @param node
     * The node of the category.
     *
     * @param options
     * The options of the category.
     */
    public constructor(node: INode, options: ICategoryOptions<IUserOptionOptions>)
    {
        super(
            node,
            options,
            (category: Category<UserOption, IUserOptionOptions>, opts: IUserOptionOptions) =>
            {
                return new UserOption(category, opts);
            });
    }
}
