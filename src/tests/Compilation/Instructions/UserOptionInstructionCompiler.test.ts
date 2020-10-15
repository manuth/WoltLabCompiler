import { UserOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/UserOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { UserOptionInstruction } from "../../../PackageSystem/Instructions/Options/UserOptionInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { LocalizationInstructionCompilerTestRunner } from "../TestComponents/TestRunners/LocalizationInstructionCompilerTestRunner";

/**
 * Registers tests for the `UserOptionInstructionCompiler` class.
 */
export function UserOptionInstructionCompilerTests(): void
{
    new class extends LocalizationInstructionCompilerTestRunner<CompilerTester<UserOptionInstructionCompiler>, UserOptionInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<UserOptionInstructionCompiler>
        {
            let locales = ["en", "cn", "es"];
            let displayName: ILocalization = {};

            for (let locale of locales)
            {
                displayName[locale] = "test";
            }

            return new CompilerTester(
                new UserOptionInstructionCompiler(
                    new UserOptionInstruction(
                        {
                            FileName: "userOptions.xml",
                            Nodes: [
                                {
                                    Name: "foo",
                                    Item: {
                                        DisplayName: displayName
                                    }
                                }
                            ]
                        })));
        }
    }("UserOptionInstructionCompiler");
}
