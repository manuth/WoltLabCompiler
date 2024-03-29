import { ImportFileCompiler } from "../../Compilation/ImportFileCompiler.js";
import { ImportCompilerTester } from "./TestComponents/Testers/ImportCompilerTester.js";
import { ImportCompilerTestRunner } from "./TestComponents/TestRunners/ImportCompilerTestRunner.js";

/**
 * Registers tests for the {@link ImportFileCompiler `ImportFileCompiler<T>`} class.
 */
export function ImportFileCompilerTests(): void
{
    new class extends ImportCompilerTestRunner<ImportCompilerTester<ImportFileCompiler<unknown>>, ImportFileCompiler<unknown>>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ImportCompilerTester<ImportFileCompiler<unknown>>
        {
            return new ImportCompilerTester(
                new class extends ImportFileCompiler<unknown>
                {
                    /**
                     * @inheritdoc
                     */
                    protected get SchemaLocation(): string
                    {
                        return "";
                    }
                }({}));
        }
    }(nameof(ImportFileCompiler)).Register();
}
