import { readFileSync } from "fs-extra";
import { parse } from "sass-variable-parser";
import { dirname } from "upath";

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
    public Parse(): Record<string, string>
    {
        let currentDir: string = process.cwd();

        try
        {
            let variables: Record<string, string> = parse(
                readFileSync(this.fileName).toString(),
                {
                    camelCase: false,
                    cwd: dirname(this.fileName)
                }) as Record<string, string>;

            return variables;
        }
        catch (exception)
        {
            throw exception;
        }
        finally
        {
            process.chdir(currentDir);
        }
    }
}
