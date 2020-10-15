import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { Instruction } from "../../../../PackageSystem/Instructions/Instruction";
import { Package } from "../../../../PackageSystem/Package";
import { CompilerTester } from "../Testers/CompilerTester";
import { CompilerTestRunner } from "./CompilerTestRunner";

/**
 * Provides the functionality to register tests for an instruction-compiler.
 */
export abstract class InstructionCompilerTestRunner<TTester extends CompilerTester<TCompiler>, TCompiler extends InstructionCompiler<Instruction>> extends CompilerTestRunner<TTester, TCompiler>
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
    protected async SuiteSetup(): Promise<void>
    {
        await super.SuiteSetup();

        new Package(
            {
                Identifier: "foo",
                DisplayName: {},
                InstallSet: {
                    Instructions: []
                }
            }).InstallSet.push(this.Tester.Compiler.Item);
    }
}
