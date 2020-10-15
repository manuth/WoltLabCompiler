import { ok } from "assert";
import { readdir } from "fs-extra";
import { join } from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { ILocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { Instruction } from "../../../../PackageSystem/Instructions/Instruction";
import { CompilerTester } from "../Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "./InstructionCompilerTestRunner";

/**
 * Registers tests for option-instruction compilers.
 */
export abstract class LocalizationInstructionCompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends InstructionCompiler<ILocalizationInstruction & Instruction>> extends InstructionCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the `OptionInstructionCompilerTestRunner` class.
     *
     * @param title
     * The title of the suite.
     */
    public constructor(title: string)
    {
        super(title);
    }

    /**
     * @inheritdoc
     */
    protected ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the language-files exist…",
            async () =>
            {
                let files = await readdir(
                    join(
                        this.Compiler.DestinationPath,
                        this.Compiler.Item.DestinationRoot,
                        this.Compiler.Item.TranslationDirectory));

                let locales = Object.keys(this.Compiler.Item.GetMessages());
                ok(locales.every((locale) => files.includes(`${locale}.xml`)));
            });
    }
}
