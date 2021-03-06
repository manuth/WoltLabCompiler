import { INode } from "../../NodeSystem/INode";
import { Category } from "../Category";
import { ICategoryOptions } from "../ICategoryOptions";
import { IUserOptionOptions } from "./IUserOptionOptions";
import { UserOption } from "./UserOption";

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
