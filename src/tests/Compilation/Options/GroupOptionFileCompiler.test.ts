import { GroupOptionFileCompiler } from "../../../Compilation/Options/GroupOptionFileCompiler";
import { GroupCategory } from "../../../Options/Groups/GroupCategory";
import { GroupOption } from "../../../Options/Groups/GroupOption";
import { GroupOptionInstruction } from "../../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { OptionCompilerTester } from "../TestComponents/Testers/OptionCompilerTester";
import { OptionFileCompilerTestRunner } from "../TestComponents/TestRunners/OptionFileCompilerTestRunner";

/**
 * Registers tests for the `GroupOptionFileCompiler` class.
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
        protected AssertCategoryMetadata(categoryNode: XMLEditor, category: GroupCategory): void
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
    }("GroupOptionFileCompiler").Register();
}
