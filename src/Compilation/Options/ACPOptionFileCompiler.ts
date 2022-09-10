import { ACPCategory } from "../../Options/ControlPanel/ACPCategory.js";
import { ACPOption } from "../../Options/ControlPanel/ACPOption.js";
import { ACPOptionInstruction } from "../../PackageSystem/Instructions/Options/ACPOptionInstruction.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { OptionFileCompiler } from "./OptionFileCompiler.js";

/**
 * Provides the functionality to compile acp-option files.
 */
export class ACPOptionFileCompiler extends OptionFileCompiler<ACPOptionInstruction, ACPCategory, ACPOption>
{
    /**
     * Initializes a new instance of the {@link ACPOptionFileCompiler `ACPOptionFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ACPOptionInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/option.xsd";
    }

    /**
     * @inheritdoc
     *
     * @param option
     * The option to serialize.
     *
     * @returns
     * The serialized option.
     */
    protected override CreateOption(option: ACPOption): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateOption(option));
        editor.Add(editor.CreateTextElement("hidden", option.Visible ? "0" : "1"));
        editor.Add(editor.CreateTextElement("supporti18n", option.Localizable ? "1" : "0"));
        editor.Add(editor.CreateTextElement("requirei18n", option.ForceLocalization ? "1" : "0"));
        return editor.Element;
    }
}
