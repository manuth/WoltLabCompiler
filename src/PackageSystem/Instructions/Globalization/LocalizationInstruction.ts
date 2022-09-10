import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { LocalizationInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/LocalizationInstructionCompiler.js";
import { LocalizationItem } from "../../../Globalization/LocalizationItem.js";
import { Node } from "../../../NodeSystem/Node.js";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions.js";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction.js";
import { ILocalizationInstruction } from "./ILocalizationInstruction.js";

/**
 * Represents an instruction which provides localizations.
 *
 * @template TItem
 * The type of the localization-items.
 *
 * @template TOptions
 * THe type of the options for generating the localization-items.
 */
export abstract class LocalizationInstruction<TItem extends LocalizationItem, TOptions> extends NodeSystemInstruction<TItem, TOptions> implements ILocalizationInstruction
{
    /**
     * The name of the type of localization instructions.
     */
    public static readonly LOCALIZATION_INSTRUCTION_TYPE = "language";

    /**
     * Initializes a new instance of the {@link LocalizationInstruction `LocalizationInstruction<TItem, TOptions>`} class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (node: Node<TItem, TOptions>, options: TOptions) => TItem)
    {
        super(options, generator);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return LocalizationInstruction.LOCALIZATION_INSTRUCTION_TYPE;
    }

    /**
     * @inheritdoc
     */
    public get TranslationDirectory(): string
    {
        return this.FileName;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<ILocalizationInstruction>
    {
        return new LocalizationInstructionCompiler(this);
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The messages of the options-instruction.
     */
    public GetMessages(): Record<string, Record<string, Record<string, string>>>
    {
        let result: Record<string, Record<string, Record<string, string>>> = {};

        for (let rootNode of this.Nodes)
        {
            for (let node of rootNode.GetAllNodes())
            {
                if (node.Item)
                {
                    for (let locale of node.Item.Translations.GetLocales())
                    {
                        if (!(locale in result))
                        {
                            result[locale] = {};
                        }

                        if (!(rootNode.FullName in result[locale]))
                        {
                            result[locale][rootNode.FullName] = {};
                        }

                        result[locale][rootNode.FullName][node.FullName] = node.Item.Translations.Data.get(locale);
                    }
                }
            }
        }

        return result;
    }
}
