import { TempFile } from "@manuth/temp-files";
import { readFile, writeFile } from "fs-extra";
import { IInstruction } from "../../../PackageSystem/Instructions/IInstruction";
import { InstructionFileCompiler } from "./InstructionFileCompiler";

/**
 * Provides the functionality to compile files which make use of EJS-templates.
 */
export abstract class TemplateInstructionCompiler<T extends IInstruction> extends InstructionFileCompiler<T>
{
    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        await super.Compile();
        let tempFile: TempFile = new TempFile();
        await writeFile(tempFile.FullName, await readFile(this.DestinationFileName));
        await this.CopyTemplate(tempFile.FullName, this.DestinationFileName);
        tempFile.Dispose();
    }
}
