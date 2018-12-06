import { Compiler } from "../Compiler";
import { LocalizationFileCompiler } from "./LocalizationFileCompiler";

/**
 * Provides the functionality to compile localization-sets.
 */
export class LocalizationSetCompiler extends Compiler<{ [locale: string]: { [category: string]: { [key: string]: string } } }>
{
    /**
     * Initializes a new instance of the `LocalizationSetCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: { [locale: string]: { [category: string]: { [key: string]: string } } })
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        let tasks: Promise<void>[] = [];

        for (let locale in this.Item)
        {
            let compiler: LocalizationFileCompiler = new LocalizationFileCompiler([locale, this.Item[locale]]);
            compiler.DestinationPath = this.MakeDestinationPath(`${locale}.xml`);
            tasks.push(compiler.Execute());
        }

        await Promise.all(tasks);
    }
}