import fs from "fs-extra";
import sassVars from "get-sass-vars";
import path from "upath";

const { readFileSync } = fs;
const { dirname } = path;

/**
 * Provides the functionality to parse `sass`-variable files.
 */
export class SassVariableParser
{
    /**
     * The filename of the scss-file to parse.
     */
    private fileName: string;

    /**
     * Provides the functionality to parse an scss-file.
     *
     * @param fileName
     * The filename of the scss-file to parse.
     */
    public constructor(fileName: string)
    {
        this.fileName = fileName;
    }

    /**
     * Parses the scss-file.
     *
     * @returns
     * The variables inside the scss-file.
     */
    public async Parse(): Promise<Record<string, string>>
    {
        // ToDo: Remove workaround
        let variables: Record<string, string> = await (sassVars as any)(
            readFileSync(this.fileName).toString(),
            {
                sassOptions: {
                    includePaths: [
                        dirname(this.fileName)
                    ]
                }
            }) as Record<string, string>;

        return Object.fromEntries(
            Object.entries(variables).map(
                (entry) =>
                {
                    return [
                        entry[0].replace(/^\$/, ""),
                        entry[1]
                    ];
                }));
    }
}
