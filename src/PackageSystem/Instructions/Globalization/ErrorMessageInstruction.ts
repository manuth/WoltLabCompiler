import { ILocalizationItemOptions } from "../../../Globalization/ILocalizationItemOptions";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
import { TranslationInstruction } from "./TranslationInstruction";

/**
 * Represents an instruction which provides translations.
 */
export class ErrorMessageInstruction extends TranslationInstruction
{
    /**
     * Initializes a new instance of the `ErrorMessageInstruction` class.
     *
     * @param options
     * The options of the error-message.
     */
    public constructor(options: INodeSystemInstructionOptions<ILocalizationItemOptions>)
    {
        super(options);
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

        let optionNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.acp.option"
            });

        let errorNode: LocalizationNode = new LocalizationNode(
            {
                Name: "error"
            });

        for (let rootNode of this.Nodes)
        {
            for (let node of rootNode.GetAllNodes())
            {
                if (node.Item)
                {
                    if (node.Item.Translations.GetLocales().length > 0)
                    {
                        errorNode.Nodes.push(
                            new LocalizationNode(
                                {
                                    Name: node.FullName,
                                    Item:
                                    {
                                        Translations: node.Item.Translations.ToJSON()
                                    }
                                }));
                    }
                }
            }
        }

        optionNode.Nodes.push(errorNode);
        result.Nodes.push(optionNode);
        return result.GetMessages();
    }
}
