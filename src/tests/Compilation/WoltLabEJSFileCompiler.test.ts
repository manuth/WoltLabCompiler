import { strictEqual } from "assert";
import { WoltLabEJSFileCompiler } from "../../Compilation/WoltLabEJSFileCompiler.js";
import { XMLFileCompilerTester } from "./TestComponents/Testers/XMLFileCompilerTester.js";
import { XMLCompilerTestRunner } from "./TestComponents/TestRunners/XMLCompilerTestRunner.js";

/**
 * Registers tests for the {@link WoltLabEJSFileCompiler `WoltLabEJSFileCompiler<T>`} class.
 */
export function WoltLabEJSFileCompilerTests(): void
{
    let context: Record<string, string>;
    let variableName: string;
    let variableValue: string;
    let delimiter: string;

    /**
     * Provides an implementation of the {@link WoltLabEJSFileCompiler `WoltLabEJSFileCompiler<T>`} for testing.
     */
    class TestWoltlabEJSFileCompiler extends WoltLabEJSFileCompiler<unknown>
    {
        /**
         * Initializes a new instance of the class.
         */
        public constructor()
        {
            super({});
        }

        /**
         * @inheritdoc
         */
        public override get Delimiter(): string
        {
            return delimiter;
        }

        /**
         * @inheritdoc
         */
        protected get SchemaLocation(): string
        {
            return "https://example.com";
        }

        /**
         * Copies files using `ejs`.
         *
         * @param source
         * The source to copy the files from.
         *
         * @param destination
         * The destination to copy the files to.
         *
         * @param context
         * The context to use.
         *
         * @param delimiter
         * The delimiter of the ejs-tags.
         */
        public override async CopyTemplate(source: string, destination: string, context: Record<string, unknown>, delimiter?: string): Promise<void>
        {
            return super.CopyTemplate(source, destination, context, delimiter);
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The serialized document.
         */
        protected override CreateDocument(): Document
        {
            let document = super.CreateDocument();
            document.documentElement.appendChild(document.createTextNode(`<${this.Delimiter}= ${variableName} ${this.Delimiter}>`));
            return document;
        }
    }

    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<TestWoltlabEJSFileCompiler>, TestWoltlabEJSFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<TestWoltlabEJSFileCompiler>
        {
            return new XMLFileCompilerTester(new TestWoltlabEJSFileCompiler());
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            context = {};
            variableName = "foo";
            variableValue = "Hello World";
            context[variableName] = variableValue;
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override async Setup(): Promise<void>
        {
            delimiter = "%";
            return super.Setup();
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the ejs-variables inside `xml`-files are substituted correctly…",
                async () =>
                {
                    await this.Compiler.CopyTemplate(this.Compiler.DestinationPath, this.Compiler.DestinationPath, context, delimiter);
                    strictEqual(this.Tester.XMLEditor.TextContent, variableValue);
                });

            test(
                "Checking whether ejs-variables with custom delimiters are substituted correctly…",
                async () =>
                {
                    delimiter = "!!";
                    strictEqual(this.Compiler.Delimiter, delimiter);
                    await this.Compiler.Execute();
                    await this.Compiler.CopyTemplate(this.Compiler.DestinationPath, this.Compiler.DestinationPath, context, delimiter);
                    strictEqual(this.Tester.XMLEditor.TextContent, variableValue);
                });
        }
    }(nameof(WoltLabEJSFileCompiler)).Register();
}
