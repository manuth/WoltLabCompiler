import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { LocalizationProviderInstruction } from "../../../PackageSystem/Instructions/Globalization/LocalizationProviderInstruction";
import { InstructionCompiler } from "./InstructionCompiler";
import { LocalizationInstructionCompiler } from "./LocalizationInstructionCompiler";

/**
 * Provides the functionality to compile files which provide localizations.
 *
 * @template T
 * The type of the item which can be compiled by this compiler.
 */
export class LocalizationProviderCompiler<T extends ILocalizationInstruction> extends InstructionCompiler<T>
{
    /**
     * Initializes a new instance of the {@link LocalizationProviderCompiler `LocalizationProviderCompiler<T>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
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
        let document = super.Serialize();

        if (Object.keys(this.Item.GetMessages()).length > 0)
        {
            let childNodes = new LocalizationInstructionCompiler(new LocalizationProviderInstruction(this.Item)).Serialize().childNodes;

            for (let i = 0; i < childNodes.length; i++)
            {
                let node = childNodes.item(i);
                document.appendChild(node);
            }
        }

        return document;
    }

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        let compiler = new LocalizationInstructionCompiler(this.Item);
        compiler.DestinationPath = this.DestinationPath;
        await compiler.Execute();
    }
}
