import { UserOptionInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/UserOptionInstructionCompiler.js";
import { ILocalization } from "../../../../Globalization/ILocalization.js";
import { UserOptionInstruction } from "../../../../PackageSystem/Instructions/Options/UserOptionInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { LocalizationProviderCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationProviderCompilerTestRunner.js";

/**
 * Registers tests for the {@link UserOptionInstructionCompiler `UserOptionInstructionCompiler`} class.
 */
export function UserOptionInstructionCompilerTests(): void
{
    new class extends LocalizationProviderCompilerTestRunner<CompilerTester<UserOptionInstructionCompiler>, UserOptionInstructionCompiler>
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
    }(nameof(UserOptionInstructionCompiler)).Register();
}
