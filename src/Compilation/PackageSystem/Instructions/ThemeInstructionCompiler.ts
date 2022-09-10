import { TempDirectory } from "@manuth/temp-files";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";
import { ThemeCompiler } from "../../Presentation/ThemeCompiler.js";
import { InstructionCompiler } from "./InstructionCompiler.js";

/**
 * Provides the functionality to compile themes.
 */
export class ThemeInstructionCompiler extends InstructionCompiler<ThemeInstruction>
{
    /**
     * Initializes a new instance of the {@link ThemeInstructionCompiler `ThemeInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ThemeInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        let tempDir: TempDirectory = new TempDirectory();
        let themeDir: TempDirectory = new TempDirectory();
        let themeCompiler: ThemeCompiler = new ThemeCompiler(await this.Item.ThemeLoader.Load());
        themeCompiler.DestinationPath = tempDir.FullName;
        await themeCompiler.Execute();
        await this.CopyTemplate(tempDir.FullName, themeDir.FullName);
        await this.Compress(themeDir.FullName, this.DestinationFileName);
        tempDir.Dispose();
        themeDir.Dispose();
    }
}
