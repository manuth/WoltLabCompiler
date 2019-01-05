import Assert = require("assert");
import { Instruction } from "../../../../System/PackageSystem/Instructions/Instruction";
import { InstructionSet } from "../../../../System/PackageSystem/Instructions/InstructionSet";
import { Package } from "../../../../System/PackageSystem/Package";

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
                    public Type: string;

                    constructor()
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