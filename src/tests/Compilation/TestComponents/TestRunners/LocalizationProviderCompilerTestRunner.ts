import { strictEqual } from "assert";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { ILocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { LocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/LocalizationInstruction";
import { CompilerTester } from "../Testers/CompilerTester";
import { LocalizationInstructionCompilerTestRunner } from "./LocalizationInstructionCompilerTestRunner";

/**
 * Registers tests for {@link LocalizationProviderCompiler `LocalizationProviderCompiler`}s.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 */
export abstract class LocalizationProviderCompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends InstructionCompiler<ILocalizationInstruction>> extends LocalizationInstructionCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link OptionInstructionCompilerTestRunner `OptionInstructionCompilerTestRunner<TTester, TCompiler>`} class.
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
    protected override SerializeTests(): void
    {
        super.SerializeTests();

        test(
            "Checking whether the instruction is serialized properly…",
            () =>
            {
                let document = this.Compiler.Serialize();
                strictEqual(document.childNodes.length, 2);
                let instructionElement = document.childNodes[0] as Element;
                let localizationElement = document.childNodes[1] as Element;
                strictEqual(instructionElement.tagName, "instruction");
                strictEqual(instructionElement.getAttribute("type"), this.Compiler.Item.Type);
                strictEqual(localizationElement.getAttribute("type"), LocalizationInstruction.LOCALIZATION_INSTRUCTION_TYPE);
            });
    }
}
