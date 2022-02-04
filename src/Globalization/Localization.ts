/**
 * Represents a localization.
 */
export class Localization
{
    /**
     * The translations of this localization mapped to their corresponding locale.
     */
    private data: Map<string, string> = new Map();

    /**
     * Initializes a new instance of the {@link Localization `Localization`} class.
     */
    public constructor()
    { }

    /**
     * Gets the translations of this localization mapped to their corresponding locale.
     */
    public get Data(): Map<string, string>
    {
        return this.data;
    }

    /**
     * Loads localizations from the {@link values `values`}.
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
     * Creates an object which represents this localization.
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
