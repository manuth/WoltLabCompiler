import { TempDirectory } from "@manuth/temp-files";
import fs from "fs-extra";
import { Package } from "../../PackageSystem/Package.js";
import { Compiler } from "../Compiler.js";
import { InstructionSetCompiler } from "./InstructionSetCompiler.js";
import { PackageFileCompiler } from "./PackageFileCompiler.js";

const { copy } = fs;

/**
 * Provides the functionality to compile packages.
 */
export class PackageCompiler extends Compiler<Package>
{
    /**
     * Initializes a new instance of the {@link PackageCompiler `PackageCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Package)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        let tempDir: TempDirectory = new TempDirectory();

        {
            for (let additionalFile of this.Item.AdditionalFiles)
            {
                copy(additionalFile.Source, additionalFile.FileName);
            }

            let compiler: PackageFileCompiler = new PackageFileCompiler(this.Item);
            compiler.DestinationPath = tempDir.MakePath("package.xml");
            await compiler.Execute();
            let installSetCompiler: InstructionSetCompiler = new InstructionSetCompiler(this.Item.InstallSet);
            installSetCompiler.DestinationPath = tempDir.FullName;
            await installSetCompiler.Execute();

            for (let updateSet of this.Item.UpdateSets)
            {
                let updateSetCompiler: InstructionSetCompiler = new InstructionSetCompiler(updateSet);
                updateSetCompiler.DestinationPath = tempDir.FullName;
                await updateSetCompiler.Execute();
            }

            await this.Compress(tempDir.FullName, this.DestinationPath);
        }

        tempDir.Dispose();
    }
}
