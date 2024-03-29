import { TempDirectory } from "@manuth/temp-files";
import path from "upath";
import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction.js";
import { LocalizationSetCompiler } from "../../Globalization/LocalizationSetCompiler.js";
import { InstructionCompiler } from "./InstructionCompiler.js";

const { join, normalize } = path;

/**
 * Provides the functionality to compile {@link ILocalizationInstruction `ILocalizationInstruction`}s.
 */
export class LocalizationInstructionCompiler extends InstructionCompiler<ILocalizationInstruction>
{
    /**
     * Initializes a new instance of the {@link LocalizationInstructionCompiler `LocalizationInstructionCompiler`} class.
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
     *
     * @returns
     * The serialized document.
     */
    public override Serialize(): Document
    {
        let document: Document = super.Serialize();

        if (Object.keys(this.Item.GetMessages()).length > 0)
        {
            document.documentElement.textContent = normalize(
                join(
                    this.Item.DestinationRoot,
                    this.Item.TranslationDirectory,
                    "*.xml"));

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
    protected override async Compile(): Promise<void>
    {
        let messages = this.Item.GetMessages();

        if (Object.keys(messages).length > 0)
        {
            let tempDir: TempDirectory = new TempDirectory();
            let compiler = new LocalizationSetCompiler(this.Item.GetMessages());
            compiler.DestinationPath = this.MakePackagePath(this.Item.DestinationRoot, this.Item.TranslationDirectory);
            await compiler.Execute();
            tempDir.Dispose();
        }
    }
}
