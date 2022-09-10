import { UserOptionFileCompiler } from "../../../Compilation/Options/UserOptionFileCompiler.js";
import { INode } from "../../../NodeSystem/Generic/INode.js";
import { EditPermission } from "../../../Options/UserPanel/EditPermission.js";
import { UserCategory } from "../../../Options/UserPanel/UserCategory.js";
import { UserOption } from "../../../Options/UserPanel/UserOption.js";
import { ViewPermission } from "../../../Options/UserPanel/ViewPermission.js";
import { UserOptionInstruction } from "../../../PackageSystem/Instructions/Options/UserOptionInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { OptionCompilerTester } from "../TestComponents/Testers/OptionCompilerTester.js";
import { OptionFileCompilerTestRunner } from "../TestComponents/TestRunners/OptionFileCompilerTestRunner.js";

/**
 * Registers tests for the {@link UserOptionFileCompiler `UserOptionFileCompiler`} class.
 */
export function UserOptionFileCompilerTests(): void
{
    new class extends OptionFileCompilerTestRunner<OptionCompilerTester<UserOptionFileCompiler>, UserOptionFileCompiler, UserCategory, UserOption>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): OptionCompilerTester<UserOptionFileCompiler>
        {
            return new OptionCompilerTester(
                new UserOptionFileCompiler(
                    new UserOptionInstruction(
                        {
                            FileName: null,
                            Nodes: [
                                {
                                    Name: "foo",
                                    Item: {
                                        Options: [
                                            {
                                                Name: "bar",
                                                Required: Math.random() > 0.5,
                                                AskOnRegistration: Math.random() > 0.5,
                                                EditPermissions: EditPermission.Owner | EditPermission.Admin,
                                                ViewPermissions: ViewPermission.Owner | ViewPermission.Admin | ViewPermission.RegisteredUser | ViewPermission.Guest,
                                                OutputClass: "wcf\\system\\foo\\bar\\baz\\BazUserOptionOutput"
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
        protected AssertCategoryMetadata(categoryNode: XMLEditor, category: INode<UserCategory>): void
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
        protected AssertOptionMetadata(optionNode: XMLEditor, option: UserOption): void
        {
            this.AssertTagContent(optionNode, "required", option.Required ? "1" : "0");
            this.AssertTagContent(optionNode, "askduringregistration", option.AskOnRegistration ? "1" : "0");
            this.AssertTagContent(optionNode, "editable", `${option.EditPermissions}`);
            this.AssertTagContent(optionNode, "visible", `${option.ViewPermissions}`);
            this.AssertTagContent(optionNode, "searchable", option.Searchable ? "1" : "0");
            this.AssertTagContent(optionNode, "outputclass", option.OutputClass);
        }
    }(nameof(UserOptionFileCompiler)).Register();
}
