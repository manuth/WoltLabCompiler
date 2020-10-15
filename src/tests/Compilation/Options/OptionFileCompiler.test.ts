import { ok, strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { OptionFileCompiler } from "../../../Compilation/Options/OptionFileCompiler";
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

/**
 * Registers tests for the `OptionFileCompiler` class.
 */
export function OptionFileCompilerTests(): void
{
    suite(
        "OptionFileCompiler",
        () =>
        {
            /**
             * Represents an option.
             */
            class MyOption extends Option
            {
                /**
                 * Initializes a new instance of the `MyOption` class.
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
                 * Initializes a new instance of the `MyCategory` class.
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
             * Represents an instruction which provides `MyOption`s.
             */
            class MyOptionInstruction extends OptionInstruction<MyCategory, ICategoryOptions<IOptionOptions>, MyOption, IOptionOptions>
            {
                /**
                 * Initializes a new instance of the `MyOptionInstruction` class.
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

            let tempFile: TempFile;
            let compiler: OptionFileCompiler<MyOptionInstruction, MyCategory, MyOption>;
            let section: string;
            let rootCategoryName: string;
            let rootShowOrder: number;
            let rootEnableOptions: string[];
            let categoryName: string;
            let showOrder: number;
            let enableOptions: string[];
            let rootCategoryNode: Node<MyCategory, ICategoryOptions<IOptionOptions>>;
            let categoryNode: Node<MyCategory, ICategoryOptions<IOptionOptions>>;
            let option: IOptionOptions;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    section = "general";
                    rootCategoryName = "bar";
                    rootShowOrder = 1;
                    rootEnableOptions = ["foo", "bar", "baz"];
                    categoryName = "baz";
                    showOrder = null;
                    enableOptions = ["foo", "bar", "baz"];
                    option = {
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
                        Options: ["test"],
                        ShowOrder: 1,
                        EnableOptions: ["3:foo", "!4:bar"],
                        AdditionalProperties: {
                            minvalue: 5,
                            maxvalue: 10
                        }
                    };

                    let rootCategoryID = "rootCategory";
                    let categoryID = "category";
                    let optionInstruction = new MyOptionInstruction(
                        {
                            FileName: null,
                            Nodes: [
                                {
                                    ID: rootCategoryID,
                                    Name: rootCategoryName,
                                    Parent: {
                                        Name: section
                                    },
                                    Item: {
                                        ShowOrder: rootShowOrder,
                                        EnableOptions: enableOptions
                                    },
                                    Nodes: [
                                        {
                                            ID: categoryID,
                                            Name: categoryName,
                                            Item: {
                                                ShowOrder: showOrder,
                                                Options: [
                                                    option
                                                ],
                                                EnableOptions: enableOptions
                                            }
                                        }
                                    ]
                                }
                            ]
                        });

                    rootCategoryNode = optionInstruction.ObjectsByID[rootCategoryID] as any;
                    categoryNode = optionInstruction.ObjectsByID[categoryID] as any;

                    compiler = new class extends OptionFileCompiler<MyOptionInstruction, MyCategory, MyOption>
                    {
                        /**
                         * @inheritdoc
                         */
                        protected get SchemaLocation(): string
                        {
                            return "http://example.com/myOptions.xsd";
                        }
                    }(optionInstruction);

                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    suite(
                        "General",
                        () =>
                        {
                            test(
                                "Checking whether the compiler can be executed…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });
                        });

                    suite(
                        "Checking the integrity of the compiled file…",
                        () =>
                        {
                            let importEditor: XMLEditor;
                            let nameAttribute: string;

                            suiteSetup(
                                () =>
                                {
                                    nameAttribute = "name";
                                });

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        "Checking whether the content is valid xml…",
                                        async () =>
                                        {
                                            let document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                            importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                        });
                                });

                            suite(
                                "Checking the integrity of the category-list to import…",
                                () =>
                                {
                                    let categoriesEditor: XMLEditor;

                                    suite(
                                        "General",
                                        () =>
                                        {
                                            let categoriesTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    categoriesTag = "categories";
                                                });

                                            test(
                                                "Checking whether the category-list is present…",
                                                () =>
                                                {
                                                    ok(importEditor.HasTag(categoriesTag, true));
                                                    categoriesEditor = importEditor.GetChildrenByTag(categoriesTag)[0];
                                                });
                                        });

                                    suite(
                                        "Checking the integrity of the categories…",
                                        () =>
                                        {
                                            let categories: XMLEditor[];
                                            let parentTag: string;
                                            let showOrderTag: string;
                                            let enableOptionsTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    parentTag = "parent";
                                                    showOrderTag = "showorder";
                                                    enableOptionsTag = "options";
                                                });

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let categoryTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            categoryTag = "category";
                                                        });

                                                    test(
                                                        "Checking whether any category is present…",
                                                        () =>
                                                        {
                                                            ok(categoriesEditor.HasTag(categoryTag));
                                                            categories = categoriesEditor.GetChildrenByTag(categoryTag);
                                                        });

                                                    test(
                                                        "Checking whether only the expected categories are present…",
                                                        () =>
                                                        {
                                                            categories.every(
                                                                (category) =>
                                                                {
                                                                    return [rootCategoryName, categoryName].includes(category.GetAttribute(nameAttribute));
                                                                });
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of root-categories…",
                                                () =>
                                                {
                                                    let categoryEditor: XMLEditor;

                                                    suite(
                                                        "General",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking whether the root-category is present..",
                                                                () =>
                                                                {
                                                                    let filtered = categories.filter(
                                                                        (category) =>
                                                                        {
                                                                            return category.GetAttribute(nameAttribute) === rootCategoryNode.FullName;
                                                                        });

                                                                    strictEqual(filtered.length, 1);
                                                                    categoryEditor = filtered[0];
                                                                });
                                                        });

                                                    suite(
                                                        "Checking the integrity of the meta-data…",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking the parent of the category…",
                                                                () =>
                                                                {
                                                                    if (section)
                                                                    {
                                                                        ok(categoryEditor.HasText(parentTag, section));
                                                                    }
                                                                    else
                                                                    {
                                                                        strictEqual(categoryEditor.HasTag(parentTag), false);
                                                                    }
                                                                });

                                                            test(
                                                                "Checking the show-order of the category…",
                                                                () =>
                                                                {
                                                                    if (rootShowOrder)
                                                                    {
                                                                        ok(categoryEditor.HasText(showOrderTag, rootShowOrder.toString()));
                                                                    }
                                                                    else
                                                                    {
                                                                        strictEqual(categoryEditor.HasTag(showOrderTag), false);
                                                                    }
                                                                });

                                                            test(
                                                                'Checking whether the "options"-property is correct…',
                                                                () =>
                                                                {
                                                                    if (rootEnableOptions.length > 0)
                                                                    {
                                                                        strictEqual(categoryEditor.GetText(enableOptionsTag), enableOptions.join(","));
                                                                    }
                                                                });
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of sub-categories…",
                                                () =>
                                                {
                                                    let categoryEditor: XMLEditor;

                                                    suite(
                                                        "General",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking whether the sub-category is present…",
                                                                () =>
                                                                {
                                                                    let filtered = categories.filter(
                                                                        (category) =>
                                                                        {
                                                                            return category.GetAttribute(nameAttribute) === categoryNode.FullName;
                                                                        });

                                                                    strictEqual(filtered.length, 1);
                                                                    categoryEditor = filtered[0];
                                                                });
                                                        });

                                                    suite(
                                                        "Checking the integrity of the meta-data…",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking the parent of the category…",
                                                                () =>
                                                                {
                                                                    if (section)
                                                                    {
                                                                        ok(categoryEditor.HasText(parentTag, categoryNode.Parent.FullName));
                                                                    }
                                                                    else
                                                                    {
                                                                        strictEqual(categoryEditor.HasTag(parentTag), false);
                                                                    }
                                                                });

                                                            test(
                                                                "Checking the show-order of the category…",
                                                                () =>
                                                                {
                                                                    if (showOrder)
                                                                    {
                                                                        ok(categoryEditor.HasText(showOrderTag, showOrder.toString()));
                                                                    }
                                                                    else
                                                                    {
                                                                        strictEqual(categoryEditor.HasTag(showOrderTag), false);
                                                                    }
                                                                });

                                                            test(
                                                                'Checking whether the "options"-property is correct…',
                                                                () =>
                                                                {
                                                                    if (enableOptions.length > 0)
                                                                    {
                                                                        strictEqual(categoryEditor.GetText(enableOptionsTag), enableOptions.join(","));
                                                                    }
                                                                });
                                                        });
                                                });
                                        });
                                });

                            suite(
                                "Checking the integrity of the option-list to import…",
                                () =>
                                {
                                    let optionsEditor: XMLEditor;

                                    suite(
                                        "General",
                                        () =>
                                        {
                                            let optionsTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    optionsTag = "options";
                                                });

                                            test(
                                                "Checking whether the option-list is present…",
                                                () =>
                                                {
                                                    ok(importEditor.HasTag(optionsTag, true));
                                                    optionsEditor = importEditor.GetChildrenByTag(optionsTag)[0];
                                                });
                                        });

                                    suite(
                                        "Checking the integrity of the options…",
                                        () =>
                                        {
                                            let optionEditor: XMLEditor;

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let optionTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            optionTag = "option";
                                                        });

                                                    test(
                                                        "Checking whether exactly one option is present…",
                                                        () =>
                                                        {
                                                            ok(optionsEditor.HasTag(optionTag, true));
                                                            optionEditor = optionsEditor.GetChildrenByTag(optionTag)[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the meta-data…",
                                                () =>
                                                {
                                                    let categoryTag: string;
                                                    let typeTag: string;
                                                    let defaultValueTag: string;
                                                    let showOrderTag: string;
                                                    let patternTag: string;
                                                    let itemsTag: string;
                                                    let optionsTag: string;
                                                    let enableOptionsTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            categoryTag = "categoryname";
                                                            typeTag = "optiontype";
                                                            defaultValueTag = "defaultvalue";
                                                            showOrderTag = "showorder";
                                                            patternTag = "validationpattern";
                                                            itemsTag = "selectoptions";
                                                            optionsTag = "options";
                                                            enableOptionsTag = "enableoptions";
                                                        });

                                                    test(
                                                        "Checking whether the name is correct…",
                                                        () =>
                                                        {
                                                            strictEqual(optionEditor.GetAttribute(nameAttribute), option.Name);
                                                        });

                                                    test(
                                                        "Checking whether the category is correct…",
                                                        () =>
                                                        {
                                                            ok(optionEditor.HasText(categoryTag, categoryNode.FullName));
                                                        });

                                                    test(
                                                        "Checking whether the type is correct…",
                                                        () =>
                                                        {
                                                            ok(optionEditor.HasText(typeTag, option.Type));
                                                        });

                                                    test(
                                                        "Checking whether the default value is correct…",
                                                        () =>
                                                        {
                                                            ok(optionEditor.HasText(defaultValueTag, `${option.DefaultValue}`));
                                                        });

                                                    test(
                                                        "Checking whether the show-order is correct…",
                                                        () =>
                                                        {
                                                            ok(optionEditor.HasText(showOrderTag, option.ShowOrder.toString()));
                                                        });

                                                    test(
                                                        "Checking whether the validation-pattern is correct…",
                                                        () =>
                                                        {
                                                            ok(optionEditor.HasText(patternTag, option.ValidationPattern.source));
                                                        });

                                                    test(
                                                        "Checking whether the items are correct…",
                                                        () =>
                                                        {
                                                            ok(optionEditor.HasTag(itemsTag, true));
                                                            let lines = optionEditor.GetChildrenByTag(itemsTag)[0].TextContent.split("\n");

                                                            for (let item of option.Items)
                                                            {
                                                                let pattern = new RegExp(`^${item.Value}:.*?.${option.Name}\\.${item.Name}$`, "g");
                                                                strictEqual(lines.filter((line: string) => pattern.test(line)).length, 1);
                                                            }
                                                        });

                                                    test(
                                                        "Checking whether the dependent options are correct…",
                                                        () =>
                                                        {
                                                            strictEqual(optionEditor.GetText(optionsTag), option.Options.join(","));
                                                        });

                                                    test(
                                                        'Checking whether the "enableoptions" property is correct…',
                                                        () =>
                                                        {
                                                            strictEqual(optionEditor.GetText(enableOptionsTag), option.EnableOptions.join(","));
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });
}
