/**
 * Represents a localization.
 */
export class Localization
{
    /**
     * Strings translated to the specified `locale`.
     */
    public Data: Map<string, string> = new Map();

    /**
     * Loads localizations from the `values`.
     *
     * @param values
     * The values to load.
     */
    public Load(values: Record<string, string>): void
    {
        for (let key of Object.keys(values))
        {
            this.Data.set(key, values[key]);
        }
    }

    /**
     * Gets the locales of the translations.
     *
     * @returns
     * The locales of the localization.
     */
    public GetLocales(): string[]
    {
        return Array.from(this.Data.keys());
    }

    /**
     * Creates an object which represents this localizaion.
     *
     * @returns
     * An object which represents this localization.
     */
    public ToJSON(): Record<string, string>
    {
        let result: Record<string, string> = {};

        for (let key of this.Data.keys())
        {
            result[key] = this.Data.get(key);
        }

        return result;
    }
}
