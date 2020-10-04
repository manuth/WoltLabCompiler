import { EmojiInstruction } from "../../PackageSystem/Instructions/Customization/EmojiInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile emoji-files.
 */
export class EmojiFileCompiler extends NamedObjectDeletionFileCompiler<EmojiInstruction>
{
    /**
     * Initializes a new instance of the `EmojiFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EmojiInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/tornado/smiley.xsd";
    }

    /**
     * @inheritdoc
     */
    protected get ObjectTagName(): string
    {
        return "smiley";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized import.
     */
    protected CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateImport());

        for (let emoji of this.Item.Emojis)
        {
            editor.AddElement(
                "smiley",
                (smiley: XMLEditor) =>
                {
                    smiley.SetAttribute("name", `:${emoji.Name}:`);
                    smiley.AddTextElement("title", emoji.DisplayName);

                    if (emoji.Aliases.length > 0)
                    {
                        smiley.AddCDATAElement("aliases", emoji.Aliases.map((alias: string) => `:${alias}:`).join("\n"));
                    }

                    if (emoji.ShowOrder)
                    {
                        smiley.AddTextElement("showorder", emoji.ShowOrder.toString());
                    }

                    smiley.AddTextElement("path", emoji.FileName);

                    if (emoji.HighResFileName)
                    {
                        smiley.AddTextElement("path2x", emoji.HighResFileName);
                    }
                });
        }

        return editor.Element;
    }
}