import { ok } from "assert";
import { pathExists } from "fs-extra";
import { join } from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { IInstruction } from "../../../../PackageSystem/Instructions/IInstruction";
import { Instruction } from "../../../../PackageSystem/Instructions/Instruction";
import { Package } from "../../../../PackageSystem/Package";
import { CompilerTester } from "../Testers/CompilerTester";
import { CompilerTestRunner } from "./CompilerTestRunner";

/**
 * Provides the functionality to register tests for an instruction-compiler.
 */
export abstract class InstructionCompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends InstructionCompiler<IInstruction>> extends CompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the `InstructionCompilerTestRunner` class.
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
    protected override async SuiteSetup(): Promise<void>
    {
        await super.SuiteSetup();

        new Package(
            {
                Identifier: "foo",
                DisplayName: {},
                InstallSet: {
                    Instructions: []
                }
            }).InstallSet.push(this.Tester.Compiler.Item as Instruction);
    }

    /**
     * @inheritdoc
     */
    protected override ExecuteTests(): void
    {
        super.ExecuteTests();

        test(
            "Checking whether the instruction-file exists…",
            async () =>
            {
                ok(
                    await pathExists(
                        join(
                            this.Compiler.DestinationPath,
                            this.Compiler.Item.DestinationRoot,
                            this.Compiler.Item.FileName)));
            });
    }
}
