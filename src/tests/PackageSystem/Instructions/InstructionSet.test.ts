import { ok, strictEqual } from "assert";
import { Instruction } from "../../../PackageSystem/Instructions/Instruction";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the {@link InstructionSet `InstructionSet`} class.
 */
export function InstructionSetTests(): void
{
    suite(
        "InstructionSet",
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
                "Checking whether instructions automatically are pushed to the `InstructionSet`…",
                () =>
                {
                    test(
                        "When the `Collection`-member of an instruction is set…",
                        () =>
                        {
                            instruction.Collection = instructionSet;
                            ok(instructionSet.includes(instruction));
                        });

                    test(
                        "When the `Collection`-member of an instruction is overwritten by another `InstructionSet`…",
                        () =>
                        {
                            instructionSet.push(instruction);
                            instruction.Collection = null;
                            strictEqual(instructionSet.includes(instruction), false);
                        });

                    test(
                        "When pushing an instruction to the `InstructionSet`…",
                        () =>
                        {
                            instructionSet.push(instruction);
                            ok(instructionSet.includes(instruction));
                        });

                    test(
                        "When popping an instruction from the `InstructionSet`…",
                        () =>
                        {
                            instructionSet.push(instruction);
                            instructionSet.pop();
                            strictEqual(instructionSet.includes(instruction), false);
                        });
                });
        });
}
