import { GroupOptionInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/GroupOptionInstructionCompiler.js";
import { ILocalization } from "../../../../Globalization/ILocalization.js";
import { GroupOptionInstruction } from "../../../../PackageSystem/Instructions/Options/GroupOptionInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { LocalizationProviderCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationProviderCompilerTestRunner.js";

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
