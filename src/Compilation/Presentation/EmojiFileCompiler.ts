import { EmojiInstruction } from "../../PackageSystem/Instructions/Customization/EmojiInstruction.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler.js";

/**
 * Provides the functionality to compile emoji-files.
 */
export class EmojiFileCompiler extends NamedObjectDeletionFileCompiler<EmojiInstruction>
{
    /**
     * Initializes a new instance of the {@link EmojiFileCompiler `EmojiFileCompiler`} class.
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
    protected override CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateImport());

        for (let emoji of this.Item.Emojis)
        {
            let smileyNode = editor.CreateElement("smiley");
            editor.Add(smileyNode);
            smileyNode.SetAttribute("name", `:${emoji.Name}:`);
            smileyNode.Add(smileyNode.CreateTextElement("title", emoji.DisplayName));

            if (emoji.Aliases.length > 0)
            {
                smileyNode.Add(smileyNode.CreateCDATAElement("aliases", emoji.Aliases.map((alias: string) => `:${alias}:`).join("\n")));
            }

            if (emoji.ShowOrder)
            {
                smileyNode.Add(smileyNode.CreateTextElement("showorder", emoji.ShowOrder.toString()));
            }

            smileyNode.Add(smileyNode.CreateTextElement("path", emoji.FileName));

            if (emoji.HighResFileName)
            {
                smileyNode.Add(smileyNode.CreateTextElement("path2x", emoji.HighResFileName));
            }
        }

        return editor.Element;
    }
}
