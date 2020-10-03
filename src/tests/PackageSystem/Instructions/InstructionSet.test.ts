import Assert = require("assert");
import { Instruction } from "../../../PackageSystem/Instructions/Instruction";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet";
import { Package } from "../../../PackageSystem/Package";

suite(
    "InstructionSet",
    () =>
    {
        let instructionSet: InstructionSet;
        let instruction: Instruction;

        suiteSetup(
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
                     * Initializes a new instance of the `Instruction` class.
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
            "Checking whether instructions automatically are pushed to the `InstructionSet`, when…",
            () =>
            {
                test(
                    "…the `Collection`-member of an instruction is set…",
                    () =>
                    {
                        instruction.Collection = instructionSet;
                        Assert.strictEqual(instructionSet.includes(instruction), true);
                    });

                test(
                    "…the `Collection`-member of an instruction is overwritten by another `InstructionSet`…",
                    () =>
                    {
                        instruction.Collection = null;
                        Assert.strictEqual(instructionSet.includes(instruction), false);
                    });

                test(
                    "…pushing an instruction to the `InstructionSet`…",
                    () =>
                    {
                        instructionSet.push(instruction);
                        Assert.strictEqual(instructionSet.includes(instruction), true);
                    });

                test(
                    "…popping an instruction from the `InstructionSet`…",
                    () =>
                    {
                        instructionSet.pop();
                        Assert.strictEqual(instructionSet.includes(instruction), false);
                    });
            });
    });
