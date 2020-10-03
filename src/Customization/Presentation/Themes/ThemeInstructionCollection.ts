import { lstatSync, pathExistsSync, readdirSync } from "fs-extra";
import { join, resolve } from "upath";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { IThemeOptions } from "./IThemeOptions";

/**
 * Represents a set of theme-instructions.
 */
export class ThemeInstructionCollection extends Array<ThemeInstruction>
{
    /**
     * Initializes a new instance of the `ThemeInstructionCollection` class.
     *
     * @param path
     * The path to look for themes.
     */
    public constructor(path: string)
    {
        super();

        let themeFolders: string[] = pathExistsSync(path) ?
            readdirSync(path).map(
                (entry: string) => join(path, entry)).filter(
                    (entry: string) => lstatSync(entry).isDirectory()) :
            [];

        for (let themeFolder of themeFolders)
        {
            let metaFile: string = resolve(join(themeFolder, "Theme"));

            if (pathExistsSync(metaFile + ".ts"))
            {
                let currentDir: string = process.cwd();
                process.chdir(themeFolder);

                {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    let theme: IThemeOptions = require(metaFile) as IThemeOptions;
                    this.push(new ThemeInstruction({ Theme: theme }));
                }

                process.chdir(currentDir);
            }
        }
    }
}
