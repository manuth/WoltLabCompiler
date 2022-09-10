import { strictEqual } from "node:assert";
import { XMLFileCompiler } from "../../Compilation/XMLFileCompiler.js";
import { XMLFileCompilerTester } from "./TestComponents/Testers/XMLFileCompilerTester.js";
import { XMLCompilerTestRunner } from "./TestComponents/TestRunners/XMLCompilerTestRunner.js";

/**
 * Registers tests for the {@link XMLFileCompiler `XMLFileCompiler<T>`} class.
 */
export function XMLFileCompilerTests(): void
{
    let rootTag: string;

    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<XMLFileCompiler<unknown>>, XMLFileCompiler<unknown>>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<XMLFileCompiler<unknown>>
        {
            return new XMLFileCompilerTester(
                new class extends XMLFileCompiler<unknown>
                {
                    /**
                     * @inheritdoc
                     */
                    protected get TagName(): string
                    {
                        return rootTag;
                    }

                    /**
                     * Initializes a new instance of the class.
                     */
                    public constructor()
                    {
                        super({});
                    }
                }());
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            rootTag = "foo";
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether a processing-instruction for `xml` is present…",
                () =>
                {
                    let firstChild = this.Tester.XMLEditor.Document.childNodes[0];
                    strictEqual(firstChild.nodeType, firstChild.PROCESSING_INSTRUCTION_NODE);
                    strictEqual((firstChild as ProcessingInstruction).target, "xml");
                });

            test(
                "Checking whether the root-tag is set correctly…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.TagName, rootTag);
                });
        }
    }(nameof(XMLFileCompiler)).Register();
}
