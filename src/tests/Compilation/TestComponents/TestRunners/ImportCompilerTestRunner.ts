import { strictEqual } from "assert";
import { ImportFileCompiler } from "../../../../Compilation/ImportFileCompiler";
import { ImportCompilerTester } from "../Testers/ImportCompilerTester";
import { XMLCompilerTestRunner } from "./XMLCompilerTestRunner";

/**
 * Provides the functionality to register tests for the {@link ImportFileCompiler `ImportFileCompiler<T>`}.
 *
 * @template TTester
 * The type of the compiler-tester.
 *
 * @template TCompiler
 * The type of the compiler.
 */
export abstract class ImportCompilerTestRunner<TTester extends ImportCompilerTester<TCompiler>, TCompiler extends ImportFileCompiler<unknown>> extends XMLCompilerTestRunner<TTester, TCompiler>
{
    /**
     * Initializes a new instance of the {@link ImportCompilerTestRunner `ImportCompilerTestRunner<TTester, TCompiler>`} class.
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
            "Checking whether the import- and delete-sections are present…",
            () =>
            {
                strictEqual(this.Tester.XMLEditor.GetChildrenByTag(this.Tester.ImportTag).length, 1);
                strictEqual(this.Tester.XMLEditor.GetChildrenByTag(this.Tester.DeleteTag).length, 1);
            });
    }
}
