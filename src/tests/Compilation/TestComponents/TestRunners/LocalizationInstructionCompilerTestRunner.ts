import { ok, strictEqual } from "assert";
import { readdir } from "fs-extra";
import { join, parse } from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { ILocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { CompilerTester } from "../Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "./InstructionCompilerTestRunner";

/**
 * Registers tests for localization-instruction compilers.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 */
export abstract class LocalizationInstructionCompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends InstructionCompiler<ILocalizationInstruction>> extends InstructionCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link LocalizationInstructionCompilerTestRunner `LocalizationInstructionCompilerTestRunner<TTester, TCompiler>`} class.
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
    protected override ExecuteTests(): void
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
                strictEqual(files.length, locales.length);
                ok(locales.every((locale) => files.includes(`${locale}.xml`)));
                ok(files.every((file) => locales.includes(parse(file).name)));
            });
    }
}
