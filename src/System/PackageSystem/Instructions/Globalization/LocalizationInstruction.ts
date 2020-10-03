import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { LocalizationInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/LocalizationInstructionCompiler";
import { LocalizationItem } from "../../../Globalization/LocalizationItem";
import { Node } from "../../../NodeSystem/Node";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystem/NodeSystemInstruction";
import { ILocalizationInstruction } from "./ILocalizationInstruction";

/**
 * Represents an instruction which provides localizations.
 */
export abstract class LocalizationInstruction<T extends LocalizationItem, TOptions> extends NodeSystemInstruction<T, TOptions> implements ILocalizationInstruction
{
    /**
     * Initializes a new instance of the `TranslationInstruction<T>` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (node: Node<T, TOptions>, options: TOptions) => T)
    {
        super(options, generator);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "language";
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
    public get Compiler(): InstructionCompiler<ILocalizationInstruction>
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

                        result[locale][rootNode.FullName][node.FullName] = node.Item.Translations.Data[locale];
                    }
                }
            }
        }

        return result;
    }
}
