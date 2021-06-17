import { ACPOptionFileCompiler } from "../../../Compilation/Options/ACPOptionFileCompiler";
import { INode } from "../../../NodeSystem/Generic/INode";
import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory";
import { ACPOption } from "../../../Options/ControlPanel/ACPOption";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { OptionCompilerTester } from "../TestComponents/Testers/OptionCompilerTester";
import { OptionFileCompilerTestRunner } from "../TestComponents/TestRunners/OptionFileCompilerTestRunner";

/**
 * Registers tests for the {@link ACPOptionFileCompiler `ACPOptionFileCompiler`} class.
 */
export function ACPOptionFileCompilerTests(): void
{
    new class extends OptionFileCompilerTestRunner<OptionCompilerTester<ACPOptionFileCompiler>, ACPOptionFileCompiler, ACPCategory, ACPOption>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): OptionCompilerTester<ACPOptionFileCompiler>
        {
            return new OptionCompilerTester(
                new ACPOptionFileCompiler(
                    new ACPOptionInstruction(
                        {
                            FileName: null,
                            Nodes: [
                                {
                                    Name: "foo",
                                    Item: {
                                        Options: [
                                            {
                                                Name: "bar",
                                                Localizable: Math.random() > 0.5,
                                                ForceLocalization: Math.random() > 0.5,
                                                Visible: Math.random() > 0.5
                                            }
                                        ]
                                    }
                                }
                            ]
                        })));
        }

        /**
         * @inheritdoc
         *
         * @param categoryNode
         * The category-node to check.
         *
         * @param category
         * The category to check.
         */
        protected AssertCategoryMetadata(categoryNode: XMLEditor, category: INode<ACPCategory>): void
        { }

        /**
         * Asserts the content of an option-node.
         *
         * @param optionNode
         * The option-node to check.
         *
         * @param option
         * The option to check.
         */
        protected AssertOptionMetadata(optionNode: XMLEditor, option: ACPOption): void
        {
            this.AssertTagContent(optionNode, "hidden", option.Visible ? "0" : "1");
            this.AssertTagContent(optionNode, "supporti18n", option.Localizable ? "1" : "0");
            this.AssertTagContent(optionNode, "requirei18n", option.ForceLocalization ? "1" : "0");
        }
    }("ACPOptionFileCompiler").Register();
}
