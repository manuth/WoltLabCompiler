/**
 * Provides constants for the package.
 */
export class Constants
{
    /**
     * The name of the invariant culture.
     */
    private static invariantCultureName = "inv";

    /**
     * Gets the name of the invariant culture.
     */
    public static get InvariantCultureName(): string
    {
        return this.invariantCultureName;
    }
}
