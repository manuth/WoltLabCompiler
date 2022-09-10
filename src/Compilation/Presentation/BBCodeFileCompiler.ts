import { BBCodeInstruction } from "../../PackageSystem/Instructions/Customization/BBCodeInstruction.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler.js";

/**
 * Provides the functionality to compile bb-codes.
 */
export class BBCodeFileCompiler extends NamedObjectDeletionFileCompiler<BBCodeInstruction>
{
    /**
     * Initializes a new instance of the {@link BBCodeFileCompiler `BBCodeFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: BBCodeInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/vortex/bbcode.xsd";
    }

    /**
     * @inheritdoc
     */
    protected get ObjectTagName(): string
    {
        return "bbcode";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized import.
     */
    protected override CreateImport(): Element
    {
        let editor = new XMLEditor(super.CreateImport());

        for (let bbCode of this.Item.BBCodes)
        {
            let bbCodeNode = editor.CreateElement(this.ObjectTagName);
            editor.Add(bbCodeNode);
            bbCodeNode.SetAttribute("name", bbCode.Name);

            if (bbCode.DisplayName.GetLocales().length > 0)
            {
                bbCodeNode.Add(bbCodeNode.CreateTextElement("buttonlabel", `wcf.editor.button.${bbCode.Name}`));
            }

            if (bbCode.Icon)
            {
                bbCodeNode.Add(bbCodeNode.CreateTextElement("wysiwygicon", bbCode.Icon));
            }

            if (bbCode.ClassName)
            {
                bbCodeNode.Add(bbCodeNode.CreateTextElement("classname", bbCode.ClassName));
            }

            if (bbCode.TagName)
            {
                bbCodeNode.Add(bbCodeNode.CreateTextElement("htmlopen", bbCode.TagName));

                if (!bbCode.IsSelfClosing)
                {
                    bbCodeNode.Add(bbCodeNode.CreateTextElement("htmlclose", bbCode.TagName));
                }
            }

            bbCodeNode.Add(bbCodeNode.CreateTextElement("isBlockElement", bbCode.IsBlockElement ? "1" : "0"));
            bbCodeNode.Add(bbCodeNode.CreateTextElement("sourcecode", bbCode.ParseContent ? "0" : "1"));

            if (bbCode.Attributes.length > 0)
            {
                let attributesNode = bbCodeNode.CreateElement("attributes");
                bbCodeNode.Add(attributesNode);

                for (let i = 0; i < bbCode.Attributes.length; i++)
                {
                    let attribute = bbCode.Attributes[i];
                    let attributeNode = attributesNode.CreateElement("attribute");
                    attributesNode.Add(attributeNode);
                    attributeNode.SetAttribute("name", i.toString());

                    attributeNode.Add(attributeNode.CreateTextElement("required", attribute.Required ? "1" : "0"));
                    attributeNode.Add(attributeNode.CreateTextElement("useText", attribute.ValueByContent ? "1" : "0"));

                    if (attribute.Code)
                    {
                        attributeNode.Add(attributeNode.CreateTextElement("html", attribute.Code));
                    }

                    if (attribute.ValidationPattern)
                    {
                        attributeNode.Add(attributeNode.CreateTextElement("validationpattern", attribute.ValidationPattern.source));
                    }
                }
            }
        }

        return editor.Element;
    }
}
