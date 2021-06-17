import { ok, strictEqual } from "assert";
import { INode } from "../../NodeSystem/INode";
import { INodeOptions } from "../../NodeSystem/INodeOptions";
import { Node } from "../../NodeSystem/Node";
import { Category } from "../../Options/Category";
import { ICategoryOptions } from "../../Options/ICategoryOptions";
import { IOptionOptions } from "../../Options/IOptionOptions";
import { Option } from "../../Options/Option";

/**
 * Registers tests for the {@link Category `Category<TOption, TOptionOptions>`} class.
 */
export function CategoryTests(): void
{
    suite(
        "Category",
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
                 * Initializes a new instance of the {@link MyCategor `MyCategor`} class.
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

            let rootNode: MyNode;
            let names: string[];
            let category: MyNode;
            let categoryID: string;
            let optionID: string;
            let optionName: string;

            suiteSetup(
                () =>
                {
                    names = ["foo", "bar", "baz", "this", "is", "a", "test", "and", "tests", "stuff"];
                    categoryID = "foo";
                    optionID = "bar";
                    optionName = "test-option";

                    category = new MyNode(
                        {
                            ID: categoryID,
                            Name: "test-category"
                        });

                    for (let name of names.reverse())
                    {
                        let child: MyNode = rootNode;

                        rootNode = new MyNode(
                            {
                                Name: name,
                                Item: {
                                }
                            });

                        if (child)
                        {
                            rootNode.Nodes.push(child);
                        }
                    }

                    let allNodes: Array<Node<MyCategory, ICategoryOptions<IOptionOptions>>> = rootNode.GetAllNodes();
                    allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(category);

                    allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(
                        new MyNode(
                            {
                                Name: "option-container",
                                Item: {
                                    Options: [
                                        {
                                            ID: optionID,
                                            Name: optionName
                                        }
                                    ]
                                }
                            }));
                });

            suite(
                "GetObjects",
                () =>
                {
                    let objects: Record<string, unknown>;

                    suiteSetup(
                        () =>
                        {
                            objects = rootNode.GetObjects();
                        });

                    test(
                        "Checking whether sub-nodes can be found by their ID…",
                        () =>
                        {
                            ok(categoryID in objects);
                            strictEqual(objects[categoryID], category);
                        });

                    test(
                        "Checking whether options can be found by their ID…",
                        () =>
                        {
                            ok(optionID in objects);
                            strictEqual((objects[optionID] as MyOption).Name, optionName);
                        });
                });
        });
}
