import { ok, strictEqual } from "node:assert";
import { INode } from "../../NodeSystem/INode.js";
import { INodeOptions } from "../../NodeSystem/INodeOptions.js";
import { Node } from "../../NodeSystem/Node.js";
import { Category } from "../../Options/Category.js";
import { ICategoryOptions } from "../../Options/ICategoryOptions.js";
import { IOptionOptions } from "../../Options/IOptionOptions.js";
import { Option } from "../../Options/Option.js";

/**
 * Registers tests for the {@link Category `Category<TOption, TOptionOptions>`} class.
 */
export function CategoryTests(): void
{
    suite(
        nameof(Category),
        () =>
        {
            /**
             * Represents an option.
             */
            class MyOption extends Option
            { }

            /**
             * Represents a category.
             */
            class MyCategory extends Category<Option, IOptionOptions>
            {
                /**
                 * Initializes a new instance of the {@link MyCategory `MyCategory`} class.
                 *
                 * @param node
                 * The node of the category.
                 *
                 * @param options
                 * The options of the category.
                 */
                public constructor(node: INode, options: ICategoryOptions<IOptionOptions>)
                {
                    super(
                        node,
                        options,
                        (parent: Category<Option, IOptionOptions>, opts: IOptionOptions) =>
                        {
                            return new MyOption(parent, opts);
                        });
                }
            }

            /**
             * Represents a node.
             */
            class MyNode extends Node<MyCategory, ICategoryOptions<IOptionOptions>>
            {
                /**
                 * Initializes a new instance of the {@link MyNode `MyNode`} class.
                 *
                 * @param options
                 * The options for generating the object.
                 */
                public constructor(options: INodeOptions<ICategoryOptions<IOptionOptions>>)
                {
                    super(
                        options,
                        (parent: Node<MyCategory, ICategoryOptions<IOptionOptions>>, opts: ICategoryOptions<IOptionOptions>) =>
                        {
                            return new MyCategory(parent, opts);
                        });
                }
            }

            let category: MyCategory;
            let categoryID: string;
            let optionID: string;
            let optionName: string;

            suiteSetup(
                () =>
                {
                    categoryID = "foo";
                    optionID = "bar";
                    optionName = "test-option";

                    category = new MyCategory(
                        new MyNode(
                            {
                                Name: categoryID
                            }),
                            {
                                Options: [
                                    {
                                        ID: optionID,
                                        Name: optionName
                                    }
                                ]
                            });
                });

            suite(
                nameof<MyCategory>((category) => category.GetObjects),
                () =>
                {
                    let objects: Record<string, unknown>;

                    suiteSetup(
                        () =>
                        {
                            objects = category.GetObjects();
                        });

                    test(
                        `Checking whether options can be found by their \`${nameof<MyOption>((o) => o.ID)}\`…`,
                        () =>
                        {
                            ok(optionID in objects);
                            strictEqual((objects[optionID] as MyOption).Name, optionName);
                        });
                });
        });
}
