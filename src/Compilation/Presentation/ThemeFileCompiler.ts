import { Theme } from "../../Customization/Presentation/Themes/Theme";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile theme-files.
 */
export class ThemeFileCompiler extends WoltLabXMLCompiler<Theme>
{
    /**
     * The name to save the variables to.
     */
    private variableFileName: string;

    /**
     * Initializes a new instance of the {@link ThemeFileCompiler `ThemeFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     *
     * @param variableFileName
     * The name of the variable-file.
     */
    public constructor(item: Theme, variableFileName: string)
    {
        super(item);
        this.VariableFileName = variableFileName;
    }

    /**
     * @inheritdoc
     */
    protected override get TagName(): string
    {
        return "style";
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/vortex/style.xsd";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    protected override CreateDocument(): Document
    {
        let document = super.CreateDocument();
        let editor = new XMLEditor(document.documentElement);
        let generalNode = editor.CreateElement("general");
        let authorNode = editor.CreateElement("author");
        let filesNode = editor.CreateElement("files");
        editor.Add(generalNode);
        editor.Add(authorNode);
        editor.Add(filesNode);

        for (let locale of this.Item.DisplayName.GetLocales())
        {
            let styleNameNode = generalNode.CreateTextElement("stylename", this.Item.DisplayName.Data.get(locale));
            generalNode.Add(styleNameNode);

            if (locale !== "inv")
            {
                styleNameNode.SetAttribute("language", locale);
            }
        }

        generalNode.Add(generalNode.CreateTextElement("version", this.Item.Version));

        generalNode.Add(
            generalNode.CreateTextElement(
                "date",
                this.Item.CreationDate.getFullYear().toString() + "-" +
                (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                this.Item.CreationDate.getDate().toString().padStart(2, "0")));

        for (let locale of this.Item.Description.GetLocales())
        {
            let descriptionNode = generalNode.CreateTextElement("description", this.Item.Description.Data.get(locale));
            generalNode.Add(descriptionNode);

            if (locale !== "inv")
            {
                descriptionNode.SetAttribute("language", locale);
            }
        }

        if (this.Item.License)
        {
            generalNode.Add(generalNode.CreateTextElement("license", this.Item.License));
        }

        generalNode.Add(generalNode.CreateTextElement("packageName", this.Item.Instruction.Collection.Package.Identifier));
        generalNode.Add(generalNode.CreateTextElement("apiVersion", "3.1"));

        if (this.Item.Thumbnail)
        {
            generalNode.Add(generalNode.CreateTextElement("image", this.Item.Thumbnail.FileName));
        }

        if (this.Item.HighResThumbnail)
        {
            generalNode.Add(generalNode.CreateTextElement("image2x", this.Item.HighResThumbnail.FileName));
        }

        if (this.Item.CoverPhoto)
        {
            generalNode.Add(generalNode.CreateTextElement("coverPhoto", this.Item.CoverPhoto.FileName));
        }

        if (this.Item.Author.Name)
        {
            authorNode.Add(authorNode.CreateTextElement("authorname", this.Item.Author.Name));
        }

        if (this.Item.Author.URL)
        {
            authorNode.Add(authorNode.CreateTextElement("authorurl", this.Item.Author.URL));
        }

        if (
            this.Item.Variables.size > 0 ||
            this.Item.CustomScss ||
            this.Item.ScssOverride)
        {
            filesNode.Add(filesNode.CreateTextElement("variables", this.VariableFileName));
        }

        if (this.Item.Images)
        {
            let imagesNode = filesNode.CreateTextElement("images", this.Item.Images.FileName);
            filesNode.Add(imagesNode);
            imagesNode.SetAttribute("path", this.Item.Images.DestinationRoot);
        }

        if (filesNode.ChildNodes.length > 0)
        {
            editor.Add(filesNode.Element);
        }

        return document;
    }

    /**
     * Gets or sets the filename to save variables to.
     */
    public get VariableFileName(): string
    {
        return this.variableFileName;
    }

    /**
     * @inheritdoc
     */
    public set VariableFileName(value: string)
    {
        this.variableFileName = value;
    }
}
