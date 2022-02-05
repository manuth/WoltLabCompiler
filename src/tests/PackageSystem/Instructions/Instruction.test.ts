import { strictEqual } from "assert";
import { join } from "upath";
import { Instruction } from "../../../PackageSystem/Instructions/Instruction";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the {@link Instruction `Instruction`} class.
 */
export function InstructionTests(): void
{
    suite(
        nameof(Instruction),
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

            setup(
                () =>
                {
                    instruction = new MyInstruction(
                        {
                            FileName: "example.txt",
                            Standalone: Math.random() > 0.5
                        });

                    extensionPackage = new Package(
                        {
                            Identifier: "example",
                            DisplayName: {},
                            Version: "0.0.0",
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    extensionPackage.InstallSet.push(instruction);
                });

            suite(
                nameof<Instruction>((instruction) => instruction.Collection),
                () =>
                {
                    suite(
                        `Checking whether the \`${nameof<Instruction>((i) => i.Collection)}\`-property is automatically set properly…`,
                        () =>
                        {
                            test(
                                `When setting the \`${nameof<Instruction>((i) => i.Collection)}\`-property…`,
                                () =>
                                {
                                    instruction.Collection = extensionPackage.InstallSet;
                                    strictEqual(instruction.Collection, extensionPackage.InstallSet);
                                });

                            test(
                                `When setting the \`${nameof<Instruction>((i) => i.Collection)}\`-property to \`${null}\`…`,
                                () =>
                                {
                                    instruction.Collection = null;
                                    strictEqual(instruction.Collection, null);
                                });

                            test(
                                `When adding the instruction to an \`${nameof(InstructionSet)}\`…`,
                                () =>
                                {
                                    extensionPackage.InstallSet.push(instruction);
                                    strictEqual(instruction.Collection, extensionPackage.InstallSet);
                                });

                            test(
                                `When removing the instruction from its \`${nameof(InstructionSet)}\`…`,
                                () =>
                                {
                                    extensionPackage.InstallSet.pop();
                                    strictEqual(instruction.Collection, null);
                                });
                        });
                });

            suite(
                nameof<Instruction>((instruction) => instruction.DestinationRoot),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<Instruction>((i) => i.DestinationRoot)}\` is correct…`,
                        () =>
                        {
                            strictEqual(instruction.DestinationRoot, extensionPackage.InstallSet.Directory);
                        });
                });

            suite(
                nameof<Instruction>((instruction) => instruction.FullName),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<Instruction>((i) => i.FullName)}\`-property is correct…`,
                        () =>
                        {
                            strictEqual(
                                instruction.FullName,
                                join(extensionPackage.InstallSet.Directory, instruction.FileName));
                        });
                });
        });
}
