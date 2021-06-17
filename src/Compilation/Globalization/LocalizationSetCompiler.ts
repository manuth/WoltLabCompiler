import { Compiler } from "../Compiler";
import { LocalizationFileCompiler } from "./LocalizationFileCompiler";

/**
 * Provides the functionality to compile localization-sets.
 */
export class LocalizationSetCompiler extends Compiler<Record<string, Record<string, Record<string, string>>>>
{
    /**
     * Initializes a new instance of the {@link LocalizationSetCompiler `LocalizationSetCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Record<string, Record<string, Record<string, string>>>)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        let tasks: Array<Promise<void>> = [];

        for (let locale in this.Item)
        {
            let compiler: LocalizationFileCompiler = new LocalizationFileCompiler([locale, this.Item[locale]]);
            compiler.DestinationPath = this.MakeDestinationPath(`${locale}.xml`);
            tasks.push(compiler.Execute());
        }

        await Promise.all(tasks);
    }
}
