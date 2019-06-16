import Assert = require("assert");
import UPath = require("upath");
import { Instruction } from "../../../../System/PackageSystem/Instructions/Instruction";
import { Package } from "../../../../System/PackageSystem/Package";

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

        let $package: Package;
        let instruction: MyInstruction;

        suiteSetup(
            () =>
            {
                instruction = new MyInstruction({
                    FileName: "example.txt",
                    Standalone: Math.random() > 0.5
                });

                $package = new Package({
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
                                instruction.Collection = $package.InstallSet;
                                Assert.strictEqual(instruction.Collection, $package.InstallSet);
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
                                $package.InstallSet.push(instruction);
                                Assert.strictEqual(instruction.Collection, $package.InstallSet);
                            });

                        test(
                            "…removing the instruction from the `InstructionSet`…",
                            () =>
                            {
                                $package.InstallSet.pop();
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
                        instruction.Collection = $package.InstallSet;
                    });

                test(
                    "Checking whether the `DestinationRoot` is correct…",
                    () =>
                    {
                        Assert.strictEqual(instruction.DestinationRoot, $package.InstallSet.Directory);
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
                            UPath.join($package.InstallSet.Directory, instruction.FileName));
                    });
            });
    });