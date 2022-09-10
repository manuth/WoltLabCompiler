import { ok, strictEqual } from "node:assert";
import { Instruction } from "../../../PackageSystem/Instructions/Instruction.js";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet.js";
import { Package } from "../../../PackageSystem/Package.js";

/**
 * Registers tests for the {@link InstructionSet `InstructionSet`} class.
 */
export function InstructionSetTests(): void
{
    suite(
        nameof(InstructionSet),
        () =>
        {
            let instructionSet: InstructionSet;
            let instruction: Instruction;

            setup(
                () =>
                {
                    instructionSet = new Package(
                        {
                            Identifier: "foo",
                            DisplayName: {},
                            Version: "0.0.0",
                            InstallSet: {
                                Instructions: []
                            }
                        }).InstallSet;

                    instruction = new class extends Instruction
                    {
                        /**
                         * @inheritdoc
                         */
                        public Type: string;

                        /**
                         * Initializes a new instance of the {@link Instruction `Instruction`} class.
                         */
                        public constructor()
                        {
                            super(
                                {
                                    FileName: "example.txt"
                                });
                        }
                    }();
                });

            suite(
                `Checking whether instructions automatically are pushed to the \`${nameof(InstructionSet)}\`…`,
                () =>
                {
                    test(
                        `When the \`${nameof<Instruction>((i) => i.Collection)}\`-member of an instruction is set…`,
                        () =>
                        {
                            instruction.Collection = instructionSet;
                            ok(instructionSet.includes(instruction));
                        });

                    test(
                        `When the \`${nameof<Instruction>((i) => i.Collection)}\`-member of an instruction is overwritten by another \`${nameof(InstructionSet)}\`…`,
                        () =>
                        {
                            instructionSet.push(instruction);
                            instruction.Collection = null;
                            strictEqual(instructionSet.includes(instruction), false);
                        });

                    test(
                        `When pushing an instruction to the \`${nameof(InstructionSet)}\`…`,
                        () =>
                        {
                            instructionSet.push(instruction);
                            ok(instructionSet.includes(instruction));
                        });

                    test(
                        `When popping an instruction from the \`${nameof(InstructionSet)}\`…`,
                        () =>
                        {
                            instructionSet.push(instruction);
                            instructionSet.pop();
                            strictEqual(instructionSet.includes(instruction), false);
                        });
                });
        });
}
