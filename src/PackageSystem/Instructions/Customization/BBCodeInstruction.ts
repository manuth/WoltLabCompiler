import { BBCodeInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/BBCodeInstructionCompiler.js";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { BBCode } from "../../../Customization/BBCodes/BBCode.js";
import { LocalizationNode } from "../../../Globalization/LocalizationNode.js";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction.js";
import { TranslationInstruction } from "../Globalization/TranslationInstruction.js";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction.js";
import { IBBCodeInstructionOptions } from "./IBBCodeInstructionOptions.js";

/**
 * Represents an instruction which provides bb-codes.
 */
export class BBCodeInstruction extends NamedDeleteInstruction implements ILocalizationInstruction
{
    /**
     * The bb-codes provided by this instruction.
     */
    private bbCodes: BBCode[] = [];

    /**
     * The path to save the translations to. Gets the path to save the translations to.
     */
    private translationDirectory: string = this.Type;

    /**
     * Initializes a new instance of the {@link BBCodeInstruction `BBCodeInstruction`} class.
     *
     * @param options
     * The options of the bbcode-instruction.
     */
    public constructor(options: IBBCodeInstructionOptions)
    {
        super(options);

        if (
            (options.TranslationDirectory !== null) &&
            (options.TranslationDirectory !== undefined))
        {
            this.TranslationDirectory = options.TranslationDirectory;
        }

        for (let bbCode of options.BBCodes)
        {
            this.BBCodes.push(new BBCode(bbCode));
        }
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "bbcode";
    }

    /**
     * Gets the bb-codes provided by this instruction.
     */
    public get BBCodes(): BBCode[]
    {
        return this.bbCodes;
    }

    /**
     * @inheritdoc
     */
    public get TranslationDirectory(): string
    {
        return this.translationDirectory;
    }

    /**
     * @inheritdoc
     */
    public set TranslationDirectory(value)
    {
        this.translationDirectory = value;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<BBCodeInstruction>
    {
        return new BBCodeInstructionCompiler(this);
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
                FileName: this.TranslationDirectory,
                Nodes: []
            });

        let rootNode: LocalizationNode = new LocalizationNode(
            {
                Name: "wcf.editor.button"
            });

        for (let bbCode of this.BBCodes)
        {
            if (Object.keys(bbCode.DisplayName).length > 0)
            {
                rootNode.Nodes.push(
                    new LocalizationNode(
                        {
                            Name: bbCode.Name,
                            Item: {
                                Translations: bbCode.DisplayName.ToJSON()
                            }
                        }));
            }
        }

        result.Nodes.push(rootNode);
        return result.GetMessages();
    }
}
