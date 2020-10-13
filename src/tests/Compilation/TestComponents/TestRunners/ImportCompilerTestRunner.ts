import { ok } from "assert";
import { ImportFileCompiler } from "../../../../Compilation/ImportFileCompiler";
import { ImportCompilerTester } from "../Testers/ImportCompilerTester";
import { XMLCompilerTestRunner } from "./XMLCompilerTestRunner";

/**
 * Provides the functionality to register tests for the `ImportFileCompiler`.
 */
export abstract class ImportCompilerTestRunner<TTester extends ImportCompilerTester<TCompiler>, TCompiler extends ImportFileCompiler<unknown>> extends XMLCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the `ImportCompilerTestRunner` class.
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
            "Checking whether the import- and delete-sections are present…",
            () =>
            {
                ok(this.Tester.XMLEditor.HasTag(this.Tester.ImportTag, true));
                ok(this.Tester.XMLEditor.HasTag(this.Tester.DeleteTag, true));
            });
    }
}
