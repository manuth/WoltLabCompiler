import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { INamedObject } from "../../../INamedObject";
import { Node } from "../../../NodeSystem/Node";
import { Category } from "../../../Options/Category";
import { Option } from "../../../Options/Option";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction";
import { TranslationInstruction } from "../Globalization/TranslationInstruction";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction";
import { IOptionInstruction } from "./IOptionInstruction";
import { IOptionInstructionOptions } from "./IOptionInstructionOptions";

/**
 * Represents an instruction which provides options.
 *
 * @template TCategory
 * The type of the categories.
 *
 * @template TCategoryOptions
 * The type of the options for generating categories.
 *
 * @template TOption
 * The type of the options.
 *
 * @template TOptionOptions
 * The type of the data for generating options.
 */
export abstract class OptionInstruction<TCategory extends Category<TOption, TOptionOptions>, TCategoryOptions, TOption extends Option, TOptionOptions> extends NodeSystemInstruction<TCategory, TCategoryOptions> implements IOptionInstruction<TCategory, TOption>, ILocalizationInstruction
{
    /**
     * The categories to delete.
     */
    private categoriesToDelete: INamedObject[] = [];

    /**
     * The options to delete.
     */
    private optionsToDelete: INamedObject[] = [];

    /**
     * The path to save the translations to. Gets the path to save the translations to.
     */
    private translationDirectory: string = null;

    /**
     * Initializes a new instance of the {@link OptionInstruction `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>`} class.
     *
     * @param options
     * The options of the option-instruction.
     *
     * @param generator
     * A component for creating categories.
     */
    public constructor(options: IOptionInstructionOptions<TCategoryOptions>, generator: (node: Node<TCategory, TCategoryOptions>, options: TCategoryOptions) => TCategory)
    {
        super(options, generator);

        if (
            (options.TranslationDirectory !== null) &&
            (options.TranslationDirectory !== undefined))
        {
            this.TranslationDirectory = options.TranslationDirectory;
        }

        if (
            (options.CategoriesToDelete !== null) &&
            (options.CategoriesToDelete !== undefined))
        {
            this.CategoriesToDelete.push(...options.CategoriesToDelete);
        }

        if (
            (options.OptionsToDelete !== null) &&
            (options.OptionsToDelete !== undefined))
        {
            this.OptionsToDelete.push(...options.OptionsToDelete);
        }
    }

    /**
     * @inheritdoc
     */
    public get TranslationDirectory(): string
    {
        return this.translationDirectory ?? this.Type;
    }

    /**
     * @inheritdoc
     */
    public set TranslationDirectory(value: string)
    {
        this.translationDirectory = value;
    }

    /**
     * @inheritdoc
     */
    public abstract get RootCategory(): string;

    /**
     * @inheritdoc
     */
    public get OptionCategory(): string
    {
        return null;
    }

    /**
     * @inheritdoc
     */
    public get CategoryCategory(): string
    {
        return "category";
    }

    /**
     * @inheritdoc
     */
    public get CategoriesToDelete(): INamedObject[]
    {
        return this.categoriesToDelete;
    }

    /**
     * @inheritdoc
     */
    public get OptionsToDelete(): INamedObject[]
    {
        return this.optionsToDelete;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The messages of the options-instruction.
     */
    public GetMessages(): Record<string, Record<string, Record<string, string>>>
    {
        let result: TranslationInstruction = new TranslationInstruction(
            {
                FileName: null,
                Nodes: []
            });

        let translationRoot: LocalizationNode = new LocalizationNode(
            {
                Name: this.RootCategory
            });

        let optionNode: LocalizationNode;

        if (this.OptionCategory)
        {
            optionNode = new LocalizationNode(
                {
                    Name: this.OptionCategory
                });

            translationRoot.Nodes.push(optionNode);
        }
        else
        {
            optionNode = translationRoot;
        }

        let categoryNode: LocalizationNode;

        if (this.CategoryCategory)
        {
            categoryNode = new LocalizationNode(
                {
                    Name: this.CategoryCategory
                });

            translationRoot.Nodes.push(categoryNode);
        }
        else
        {
            categoryNode = translationRoot;
        }

        for (let rootNode of this.Nodes)
        {
            for (let node of rootNode.GetAllNodes())
            {
                if (node.Item)
                {
                    let categoryTranslations: LocalizationNode = new LocalizationNode(
                        {
                            Name: node.FullName,
                            Item: node.Item.DisplayName.GetLocales().length > 0 ?
                                {
                                    Translations: node.Item.DisplayName.ToJSON()
                                } :
                                undefined
                        });

                    if (node.Item.Description.GetLocales().length > 0)
                    {
                        categoryTranslations.Nodes.push(
                            new LocalizationNode(
                                {
                                    Name: "description",
                                    Item: {
                                        Translations: node.Item.Description.ToJSON()
                                    }
                                }));
                    }

                    for (let option of node.Item.Options)
                    {
                        let optionTranslations: LocalizationNode = new LocalizationNode(
                            {
                                Name: option.Name,
                                Item: option.DisplayName.GetLocales().length > 0 ?
                                    {
                                        Translations: option.DisplayName.ToJSON()
                                    } :
                                    undefined
                            });

                        if (option.Description.GetLocales().length > 0)
                        {
                            optionTranslations.Nodes.push(
                                new LocalizationNode(
                                    {
                                        Name: "description",
                                        Item: {
                                            Translations: option.Description.ToJSON()
                                        }
                                    }));
                        }

                        for (let optionItem of option.Items)
                        {
                            if (optionItem.DisplayName.GetLocales().length > 0)
                            {
                                optionTranslations.Nodes.push(
                                    new LocalizationNode(
                                        {
                                            Name: optionItem.Name,
                                            Item: {
                                                Translations: optionItem.DisplayName.ToJSON()
                                            }
                                        }));
                            }
                        }

                        optionNode.Nodes.push(optionTranslations);
                    }

                    categoryNode.Nodes.push(categoryTranslations);
                }
            }
        }

        result.Nodes.push(translationRoot);
        return result.GetMessages();
    }
}
