import { GroupOptionFileCompiler } from "../../../Compilation/Options/GroupOptionFileCompiler.js";
import { INode } from "../../../NodeSystem/Generic/INode.js";
import { GroupCategory } from "../../../Options/Groups/GroupCategory.js";
import { GroupOption } from "../../../Options/Groups/GroupOption.js";
import { GroupOptionInstruction } from "../../../PackageSystem/Instructions/Options/GroupOptionInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { OptionCompilerTester } from "../TestComponents/Testers/OptionCompilerTester.js";
import { OptionFileCompilerTestRunner } from "../TestComponents/TestRunners/OptionFileCompilerTestRunner.js";

/**
 * Registers tests for the {@link GroupOptionFileCompiler `GroupOptionFileCompiler`} class.
 */
export function GroupOptionFileCompilerTests(): void
{
    new class extends OptionFileCompilerTestRunner<OptionCompilerTester<GroupOptionFileCompiler>, GroupOptionFileCompiler, GroupCategory, GroupOption>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): OptionCompilerTester<GroupOptionFileCompiler>
        {
            return new OptionCompilerTester(
                new GroupOptionFileCompiler(
                    new GroupOptionInstruction(
                        {
                            FileName: null,
                            Nodes: [
                                {
                                    Name: "example",
                                    Item: {
                                        Options: [
                                            {
                                                Name: "test",
                                                UserDefaultValue: "foo",
                                                ModDefaultValue: "bar",
                                                AdminDefaultValue: "baz",
                                                RegisteredOnly: Math.random() > 0.5
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
        protected AssertCategoryMetadata(categoryNode: XMLEditor, category: INode<GroupCategory>): void
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
        protected AssertOptionMetadata(optionNode: XMLEditor, option: GroupOption): void
        {
            this.AssertTagContent(optionNode, "userdefaultvalue", `${option.UserDefaultValue}`);
            this.AssertTagContent(optionNode, "moddefaultvalue", `${option.ModDefaultValue}`);
            this.AssertTagContent(optionNode, "admindefaultvalue", `${option.AdminDefaultValue}`);
            this.AssertTagContent(optionNode, "usersonly", option.RegisteredOnly ? "1" : "0");
        }
    }(nameof(GroupOptionFileCompiler)).Register();
}
