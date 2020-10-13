import { ok } from "assert";
import { XMLFileCompiler } from "../../../../Compilation/XMLFileCompiler";
import { XMLFileCompilerTester } from "../Testers/XMLFileCompilerTester";
import { CompilerTestRunner } from "./CompilerTestRunner";

/**
 * Provides the functionality to register tests for the `XMLFileCompiler`.
 */
export abstract class XMLCompilerTestRunner<TTester extends XMLFileCompilerTester<TCompiler>, TCompiler extends XMLFileCompiler<unknown>> extends CompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the `CompilerTester` class.
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
        test(
            "Checking whether the compiled file contains valid xml…",
            () =>
            {
                ok(this.Tester.IsValidXML);
            });
    }
}
