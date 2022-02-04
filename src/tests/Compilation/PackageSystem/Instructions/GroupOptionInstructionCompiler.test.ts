import { GroupOptionInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/GroupOptionInstructionCompiler";
import { ILocalization } from "../../../../Globalization/ILocalization";
import { GroupOptionInstruction } from "../../../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { LocalizationProviderCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationProviderCompilerTestRunner";

/**
 * Registers tests for the {@link GroupOptionInstructionCompiler `GroupOptionInstructionCompiler`} class.
 */
export function GroupOptionInstructionCompilerTests(): void
{
    new class extends LocalizationProviderCompilerTestRunner<CompilerTester<GroupOptionInstructionCompiler>, GroupOptionInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<GroupOptionInstructionCompiler>
        {
            let displayName: ILocalization = {};
            let locales = ["en", "cn", "es"];

            for (let locale of locales)
            {
                displayName[locale] = "test";
            }

            return new CompilerTester(
                new GroupOptionInstructionCompiler(
                    new GroupOptionInstruction(
                        {
                            FileName: "options.xml",
                            Nodes: [
                                {
                                    Name: "bar",
                                    Item: {
                                        DisplayName: displayName
                                    }
                                }
                            ]
                        })));
        }
    }(nameof(GroupOptionInstructionCompiler)).Register();
}
