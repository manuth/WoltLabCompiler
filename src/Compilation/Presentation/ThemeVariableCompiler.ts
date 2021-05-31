import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile theme-variables.
 */
export class ThemeVariableCompiler extends WoltLabXMLCompiler<Record<string, string>>
{
    /**
     * Initializes a new instance of the `ThemeVariableCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Record<string, string>)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected override get TagName(): string
    {
        return "variables";
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/styleVariables.xsd";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    protected override CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        for (let name in this.Item)
        {
            let variableNode = editor.CreateTextElement("variable", this.Item[name]);
            variableNode.SetAttribute("name", name);
            editor.Add(variableNode);
        }

        return document;
    }
}
