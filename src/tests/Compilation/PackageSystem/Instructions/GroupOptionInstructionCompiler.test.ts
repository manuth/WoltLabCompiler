import { GroupOptionInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/GroupOptionInstructionCompiler";
import { ILocalization } from "../../../../Globalization/ILocalization";
import { GroupOptionInstruction } from "../../../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { LocalizationInstructionCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationInstructionCompilerTestRunner";

/**
 * Registers tests for the `GroupOptionInstructionCompiler` class.
 */
export function GroupOptionInstructionCompilerTests(): void
{
    new class extends LocalizationInstructionCompilerTestRunner<CompilerTester<GroupOptionInstructionCompiler>, GroupOptionInstructionCompiler>
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
    }("GroupOptionInstructionCompiler").Register();
}
