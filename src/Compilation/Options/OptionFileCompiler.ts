import { INode } from "../../NodeSystem/Generic/INode.js";
import { ICategory } from "../../Options/Generic/ICategory.js";
import { Option } from "../../Options/Option.js";
import { OptionItem } from "../../Options/OptionItem.js";
import { IOptionInstruction } from "../../PackageSystem/Instructions/Options/IOptionInstruction.js";
import { XML } from "../../Serialization/XML.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { ImportFileCompiler } from "../ImportFileCompiler.js";

/**
 * Provides the functionality to compile option-files.
 *
 * @template TInstruction
 * The type of the instruction which can be compiled by this compiler.
 *
 * @template TCategory
 * The type of the option-categories.
 *
 * @template TOption
 * The type of the options.
 */
export abstract class OptionFileCompiler<TInstruction extends IOptionInstruction<TCategory, TOption>, TCategory extends ICategory<TOption>, TOption extends Option> extends ImportFileCompiler<TInstruction>
{
    /**
     * The language-category which contains translations for options.
     */
    private languageCategory: string;

    /**
     * Initializes a new instance of the {@link OptionFileCompiler `OptionFileCompiler<TInstruction, TCategory, TOption>`} class.
     *
     * @param instruction
     * The instruction to compile.
     */
    public constructor(instruction: TInstruction)
    {
        super(instruction);
        this.LanguageCategory = `${instruction.RootCategory}${instruction.OptionCategory ? `.${instruction.OptionCategory}` : ""}`;
    }

    /**
     * Gets or sets the language-category which contains translations for options.
     */
    public get LanguageCategory(): string
    {
        return this.languageCategory;
    }

    /**
     * @inheritdoc
     */
    public set LanguageCategory(value: string)
    {
        this.languageCategory = value;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized import.
     */
    protected override CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateImport());

        let categoriesElement = editor.CreateElement("categories");
        let optionsElement = editor.CreateElement("options");
        editor.Add(categoriesElement);
        editor.Add(optionsElement);

        for (let rootCategory of this.Item.Nodes)
        {
            for (let category of rootCategory.GetAllNodes())
            {
                categoriesElement.Add(this.CreateCategory(category));
            }
        }

        for (let rootCategory of this.Item.Nodes)
        {
            for (let category of rootCategory.GetAllNodes())
            {
                if (category.Item)
                {
                    for (let option of category.Item.Options)
                    {
                        optionsElement.Add(this.CreateOption(option));
                    }
                }
            }
        }

        return editor.Element;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized deletion.
     */
    protected override CreateDelete(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateDelete());

        for (let categoryToDelete of this.Item.CategoriesToDelete)
        {
            let categoryElement = editor.CreateElement("category");
            editor.Add(categoryElement);
            categoryElement.SetAttribute("name", categoryToDelete.Name);
        }

        for (let optionToDelete of this.Item.OptionsToDelete)
        {
            let optionElement = editor.CreateElement("option");
            editor.Add(optionElement);
            optionElement.SetAttribute("name", optionToDelete.Name);
        }

        return editor.Element;
    }

    /**
     * Serializes a category to xml.
     *
     * @param category
     * The category to serialize.
     *
     * @returns
     * The serialized category.
     */
    protected CreateCategory(category: INode<TCategory>): Element
    {
        let document: Document = XML.CreateDocument("category");
        let editor: XMLEditor = new XMLEditor(document.documentElement);
        editor.SetAttribute("name", category.FullName);

        if (category.Parent)
        {
            editor.Add(editor.CreateTextElement("parent", category.Parent.FullName));
        }

        if (category.Item?.ShowOrder)
        {
            editor.Add(editor.CreateTextElement("showorder", category.Item.ShowOrder.toString()));
        }

        if (category.Item?.EnableOptions.length > 0)
        {
            editor.Add(editor.CreateTextElement("options", category.Item.EnableOptions.join(",")));
        }

        return editor.Element;
    }

    /**
     * Serializes an option to xml.
     *
     * @param option
     * The option to serialize.
     *
     * @returns
     * The serialized option.
     */
    protected CreateOption(option: TOption): Element
    {
        let document: Document = XML.CreateDocument("option");
        let editor: XMLEditor = new XMLEditor(document.documentElement);
        editor.SetAttribute("name", option.Name);
        editor.Add(editor.CreateTextElement("categoryname", option.Category.Node.FullName));
        editor.Add(editor.CreateTextElement("optiontype", option.Type));

        if (option.DefaultValue)
        {
            editor.Add(editor.CreateTextElement("defaultvalue", `${option.DefaultValue}`));
        }

        if (option.ShowOrder)
        {
            editor.Add(editor.CreateTextElement("showorder", option.ShowOrder.toString()));
        }

        if (option.ValidationPattern)
        {
            editor.Add(editor.CreateTextElement("validationpattern", option.ValidationPattern.source));
        }

        if (option.Items.length > 0)
        {
            editor.Add(
                editor.CreateTextElement(
                    "selectoptions",
                    option.Items.map((optionItem: OptionItem) =>
                    {
                        return `${optionItem.Value}:${this.LanguageCategory}.${option.Name}.${optionItem.Name}`;
                    }).join("\n")));
        }

        if (option.Options.length > 0)
        {
            editor.Add(editor.CreateTextElement("options", option.Options.join(",")));
        }

        if (option.EnableOptions.length > 0)
        {
            editor.Add(editor.CreateTextElement("enableoptions", option.EnableOptions.join(",")));
        }

        for (let additionalProperty in option.AdditionalProperties)
        {
            editor.Add(editor.CreateTextElement(additionalProperty, `${option.AdditionalProperties[additionalProperty]}`));
        }

        return editor.Element;
    }
}
