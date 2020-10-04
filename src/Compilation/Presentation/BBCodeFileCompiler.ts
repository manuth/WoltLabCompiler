import { BBCodeInstruction } from "../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile bb-codes.
 */
export class BBCodeFileCompiler extends NamedObjectDeletionFileCompiler<BBCodeInstruction>
{
    /**
     * Initializes a new instance of the `BBCodeFileCompiler` class.
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
    protected CreateImport(): Element
    {
        let editor = new XMLEditor(super.CreateImport());

        for (let bbCode of this.Item.BBCodes)
        {
            editor.AddElement(
                this.ObjectTagName,
                (bbCodeEditor) =>
                {
                    bbCodeEditor.SetAttribute("name", bbCode.Name);

                    if (bbCode.DisplayName.GetLocales().length > 0)
                    {
                        bbCodeEditor.AddTextElement("buttonLabel", `wcf.editor.button.${bbCode.Name}`);
                    }

                    if (bbCode.Icon)
                    {
                        bbCodeEditor.AddTextElement("wysiwygicon", bbCode.Icon);
                    }

                    if (bbCode.ClassName)
                    {
                        bbCodeEditor.AddTextElement("classname", bbCode.ClassName);
                    }

                    if (bbCode.TagName)
                    {
                        bbCodeEditor.AddTextElement("htmlopen", bbCode.TagName);

                        if (!bbCode.IsSelfClosing)
                        {
                            bbCodeEditor.AddTextElement("htmlclose", bbCode.TagName);
                        }
                    }

                    bbCodeEditor.AddTextElement("isBlockElement", bbCode.IsBlockElement ? "1" : "0");
                    bbCodeEditor.AddTextElement("sourcecode", bbCode.ParseContent ? "0" : "1");

                    if (bbCode.Attributes.length > 0)
                    {
                        bbCodeEditor.AddElement(
                            "attributes",
                            (attributes) =>
                            {
                                for (let i = 0; i < bbCode.Attributes.length; i++)
                                {
                                    let attribute = bbCode.Attributes[i];

                                    attributes.AddElement(
                                        "attribute",
                                        (attributeEditor) =>
                                        {
                                            attributeEditor.SetAttribute("name", i.toString());

                                            attributeEditor.AddTextElement("required", attribute.Required ? "1" : "0");
                                            attributeEditor.AddTextElement("useText", attribute.ValueByContent ? "1" : "0");

                                            if (attribute.Code)
                                            {
                                                attributeEditor.AddTextElement("html", attribute.Code);
                                            }

                                            if (attribute.ValidationPattern)
                                            {
                                                attributeEditor.AddTextElement("validationpattern", attribute.ValidationPattern.source);
                                            }
                                        });
                                }
                            });
                    }
                });
        }

        return editor.Element;
    }
}