import Assert = require("assert");
import { FileSystemInstruction } from "../../../../System/PackageSystem/Instructions/FileSystem/FileSystemInstruction";

suite(
    "FileSystemInstruction",
    () =>
    {
        let fileName: string;
        let instruction: FileSystemInstruction;

        suiteSetup(
            () =>
            {
                fileName = "foo.sql";

                instruction = new class extends FileSystemInstruction
                {
                    public Type = "foo";
                }(
                    {
                        Source: fileName
                    });
            });

        suite(
            "FileName",
            () =>
            {
                test(
                    "Checking whether the `FileName` is set to `Source` automatically…",
                    () =>
                    {
                        Assert.strictEqual(instruction.FileName, instruction.Source);
                    });
            });
    });