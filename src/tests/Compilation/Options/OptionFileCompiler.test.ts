import { ok, strictEqual } from "assert";
import { OptionFileCompiler } from "../../../Compilation/Options/OptionFileCompiler";
import { INode as IGenericNode } from "../../../NodeSystem/Generic/INode";
import { INode } from "../../../NodeSystem/INode";
import { Node } from "../../../NodeSystem/Node";
import { Category } from "../../../Options/Category";
import { ICategory } from "../../../Options/ICategory";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { IOptionOptions } from "../../../Options/IOptionOptions";
import { Option } from "../../../Options/Option";
import { OptionType } from "../../../Options/OptionType";
import { INodeSystemInstructionOptions } from "../../../PackageSystem/Instructions/NodeSystem/INodeSystemInstructionOptions";
import { OptionInstruction } from "../../../PackageSystem/Instructions/Options/OptionInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { OptionCompilerTester } from "../TestComponents/Testers/OptionCompilerTester";
import { OptionFileCompilerTestRunner } from "../TestComponents/TestRunners/OptionFileCompilerTestRunner";

/**
 * Registers tests for the {@link OptionFileCompiler `OptionFileCompiler<T, TCategory, TOption>`} class.
 */
export function OptionFileCompilerTests(): void
{
    /**
     * Represents an option.
     */
    class MyOption extends Option
    {
        /**
         * Initializes a new instance of the {@link MyOption `MyOption`} class.
         *
         * @param category
         * The category of the option.
         *
         * @param options
         * The options of the configuration-option.
         */
        public constructor(category: ICategory, options: IOptionOptions)
        {
            super(category, options);
        }
    }

    /**
     * Represents a category.
     */
    class MyCategory extends Category<MyOption, IOptionOptions>
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
                (category: Category<MyOption, IOptionOptions>, optionOptions: IOptionOptions) =>
                {
                    return new MyOption(category, optionOptions);
                });
        }
    }

    /**
     * Represents an instruction which provides {@link MyOption `MyOption`}s.
     */
    class MyOptionInstruction extends OptionInstruction<MyCategory, ICategoryOptions<IOptionOptions>, MyOption, IOptionOptions>
    {
        /**
         * Initializes a new instance of the {@link MyOptionInstruction `MyOptionInstruction`} class.
         *
         * @param options
         * The options of the instruction.
         */
        public constructor(options: INodeSystemInstructionOptions<ICategoryOptions<IOptionOptions>>)
        {
            super(
                options,
                (node: Node<MyCategory, ICategoryOptions<IOptionOptions>>, categoryOptions: ICategoryOptions<IOptionOptions>) =>
                {
                    return new MyCategory(node, categoryOptions);
                });
        }

        /**
         * @inheritdoc
         */
        public get RootCategory(): string
        {
            return "wcf.foo.option";
        }

        /**
         * @inheritdoc
         */
        public get Type(): string
        {
            return "bar";
        }
    }

    /**
     * Represents a compiler for compiling {@link MyOptionInstruction `MyOptionInstruction`}s.
     */
    class MyOptionInstructionCompiler extends OptionFileCompiler<MyOptionInstruction, MyCategory, MyOption>
    {
        /**
         * @inheritdoc
         */
        protected get SchemaLocation(): string
        {
            return "";
        }
    }

    new class extends OptionFileCompilerTestRunner<OptionCompilerTester<MyOptionInstructionCompiler>, MyOptionInstructionCompiler, MyCategory, MyOption>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): OptionCompilerTester<MyOptionInstructionCompiler>
        {
            return new OptionCompilerTester(
                new MyOptionInstructionCompiler(
                    new MyOptionInstruction(
                        {
                            FileName: null,
                            Nodes: [
                                {
                                    ID: "rootCategory",
                                    Name: "foo",
                                    Parent: {
                                        Name: "general"
                                    },
                                    Item: {
                                        ShowOrder: 1,
                                        EnableOptions: [
                                            "3:foo",
                                            "!4:bar"
                                        ]
                                    },
                                    Nodes: [
                                        {
                                            ID: "bar",
                                            Name: "baz",
                                            Item: {
                                                ShowOrder: null,
                                                Options: [
                                                    {
                                                        Name: "foo",
                                                        Type: OptionType.MultiSelect,
                                                        DefaultValue: 3,
                                                        ValidationPattern: /^(3|4)$/,
                                                        Items: [
                                                            {
                                                                Name: "a",
                                                                Value: 3
                                                            },
                                                            {
                                                                Name: "test",
                                                                Value: 4
                                                            }
                                                        ],
                                                        Options: [
                                                            "test"
                                                        ],
                                                        ShowOrder: 1,
                                                        EnableOptions: [
                                                            "3:foo",
                                                            "!4:bar"
                                                        ],
                                                        AdditionalProperties: {
                                                            minValue: 4,
                                                            maxValue: 10
                                                        }
                                                    }
                                                ],
                                                EnableOptions: [
                                                    "foo",
                                                    "bar",
                                                    "baz"
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        })));
        }

        /**
         * @inheritdoc
         *
         * @param categoryNode
         * The category-node to check.
         *
         * @param category
         * The category to check.
         */
        protected AssertCategoryMetadata(categoryNode: XMLEditor, category: IGenericNode<MyCategory>): void
        {
            let parentTag = "parent";
            let showOrderTag = "showorder";

            if (
                category.Parent &&
                !category.Parent.Item)
            {
                this.AssertTagContent(categoryNode, parentTag, category.Parent.Name);
            }

            if (
                (category.Item.ShowOrder !== null) &&
                (category.Item.ShowOrder !== undefined))
            {
                this.AssertTagContent(categoryNode, showOrderTag, `${category.Item.ShowOrder}`);
            }
            else
            {
                strictEqual(categoryNode.GetChildrenByTag(showOrderTag).length, 0);
            }

            ok(
                category.Item.EnableOptions.every(
                    (option) =>
                    {
                        return this.GetText(categoryNode, "options").split(",").includes(option);
                    }));
        }

        /**
         * Asserts the content of an option-node.
         *
         * @param optionNode
         * The option-node to check.
         *
         * @param option
         * The option to check.
         */
        protected AssertOptionMetadata(optionNode: XMLEditor, option: MyOption): void
        {
            strictEqual(optionNode.GetAttribute("name"), option.Name);
            this.AssertTagContent(optionNode, "categoryname", option.Category.Node.FullName);
            this.AssertTagContent(optionNode, "optiontype", option.Type);
            this.AssertTagContent(optionNode, "defaultvalue", `${option.DefaultValue}`);
            this.AssertTagContent(optionNode, "showorder", `${option.ShowOrder}`);
            this.AssertTagContent(optionNode, "validationpattern", option.ValidationPattern.source);
            let lines = this.GetText(optionNode, "selectoptions").split("\n");

            for (let item of option.Items)
            {
                let pattern = new RegExp(`^${item.Value}:.*?\\.${option.Name}\\.${item.Name}$`, "g");
                strictEqual(lines.filter((line) => pattern.test(line)).length, 1);
            }

            ok(
                option.Options.every(
                    (option) =>
                    {
                        return this.GetText(optionNode, "options").split(",").includes(option);
                    }));

            ok(
                option.EnableOptions.every(
                    (enableOption) =>
                    {
                        return this.GetText(optionNode, "enableoptions").split(",").includes(enableOption);
                    }));
        }
    }("OptionFileCompiler").Register();
}
