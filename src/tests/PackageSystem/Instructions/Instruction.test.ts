import Assert = require("assert");
import UPath = require("upath");
import { Instruction } from "../../../PackageSystem/Instructions/Instruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `Instruction` class.
 */
export function InstructionTests(): void
{
    suite(
        "Instruction",
        () =>
        {
            /**
             * Represents an instruction.
             */
            class MyInstruction extends Instruction
            {
                /**
                 * @inheritdoc
                 */
                public Type = "custom";
            }

            let extensionPackage: Package;
            let instruction: MyInstruction;

            suiteSetup(
                () =>
                {
                    instruction = new MyInstruction({
                        FileName: "example.txt",
                        Standalone: Math.random() > 0.5
                    });

                    extensionPackage = new Package({
                        Identifier: "example",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });
                });

            suite(
                "Collection",
                () =>
                {
                    suite(
                        "Checking whether the `Collection`-property is automatically set properly, when…",
                        () =>
                        {
                            test(
                                "…setting the `Collection`-property…",
                                () =>
                                {
                                    instruction.Collection = extensionPackage.InstallSet;
                                    Assert.strictEqual(instruction.Collection, extensionPackage.InstallSet);
                                });

                            test(
                                "…setting the `Collection`-property to `null`…",
                                () =>
                                {
                                    instruction.Collection = null;
                                    Assert.strictEqual(instruction.Collection, null);
                                });

                            test(
                                "…adding the instruction to an `InstructionSet`…",
                                () =>
                                {
                                    extensionPackage.InstallSet.push(instruction);
                                    Assert.strictEqual(instruction.Collection, extensionPackage.InstallSet);
                                });

                            test(
                                "…removing the instruction from the `InstructionSet`…",
                                () =>
                                {
                                    extensionPackage.InstallSet.pop();
                                    Assert.strictEqual(instruction.Collection, null);
                                });
                        });
                });

            suite(
                "DestinationRoot",
                () =>
                {
                    suiteSetup(
                        () =>
                        {
                            instruction.Collection = extensionPackage.InstallSet;
                        });

                    test(
                        "Checking whether the `DestinationRoot` is correct…",
                        () =>
                        {
                            Assert.strictEqual(instruction.DestinationRoot, extensionPackage.InstallSet.Directory);
                        });
                });

            suite(
                "FullName",
                () =>
                {
                    test(
                        "Checking whether the `FullName`-property is correct…",
                        () =>
                        {
                            Assert.strictEqual(
                                instruction.FullName,
                                UPath.join(extensionPackage.InstallSet.Directory, instruction.FileName));
                        });
                });
        });
}
