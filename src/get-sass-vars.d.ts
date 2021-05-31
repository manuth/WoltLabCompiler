declare module "get-sass-vars"
{
    import { Options } from "sass";

    namespace sassVars
    {
        /**
         * Provides options for the `get-sass-vars`-module.
         */
        export interface ISassVarsOptions
        {
            /**
             * A value indicating whether first-level object-keys in the resulting object should be camelized.
             *
             * If enabled, the leading `$` will be removed and variable-names will be camelized (e.g. $foo-bar will become fooBar).
             */
            camelize?: boolean;

            /**
             * The options to pass to `sass`.
             */
            sassOptions?: Options;
        }
    }

    /**
     * Resolves the variables from the specified `sass`-code.
     *
     * @param data
     * The source-code to process.
     *
     * @param options
     * The options for resolving the variables.
     */
    function sassVars(data: string, options?: sassVars.ISassVarsOptions): Promise<Record<string, unknown>>;

    export = sassVars;
}
