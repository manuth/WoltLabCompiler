import { strictEqual } from "assert";
import { XMLFileCompiler } from "../../Compilation/XMLFileCompiler";
import { XMLFileCompilerTester } from "./TestComponents/Testers/XMLFileCompilerTester";
import { XMLCompilerTestRunner } from "./TestComponents/TestRunners/XMLCompilerTestRunner";

/**
 * Registers tests for the `XMLFileCompiler` class.
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
        protected async SuiteSetup(): Promise<void>
        {
            await super.SuiteSetup();
            rootTag = "foo";
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
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
                "Checking whether the root-tag is set correct…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.TagName, rootTag);
                });
        }
    }("XMLFileCompiler").Register();
}
