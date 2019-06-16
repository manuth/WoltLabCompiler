import { TempDirectory } from "temp-filesystem";
import UPath = require("upath");
import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { LocalizationSetCompiler } from "../../Globalization/LocalizationSetCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile `ILocalizationInstruction`s.
 */
export class LocalizationInstructionCompiler extends InstructionCompiler<ILocalizationInstruction>
{
    /**
     * Initializes a new instance of the `LocalizationInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ILocalizationInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    public Serialize(): Document
    {
        let document: Document = super.Serialize();

        if (Object.keys(this.Item.GetMessages()).length > 0)
        {
            document.documentElement.textContent = UPath.normalize(
                this.MakePackagePath(
                    this.Item.DestinationRoot,
                    this.Item.TranslationDirectory,
                    "*"));
            return document;
        }
        else
        {
            return document.implementation.createDocument(null, null, null);
        }
    }

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        let messages = this.Item.GetMessages();

        if (Object.keys(messages).length > 0)
        {
            let tempDir: TempDirectory = new TempDirectory();
            let compiler = new LocalizationSetCompiler(this.Item.GetMessages());
            compiler.DestinationPath = tempDir.FullName;
            await compiler.Execute();
            await this.CopyTemplate(tempDir.FullName, this.MakePackagePath(this.Item.DestinationRoot, this.Item.TranslationDirectory));
            tempDir.Dispose();
        }
    }
}