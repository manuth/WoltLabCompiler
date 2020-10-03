import Assert = require("assert");
import Dedent = require("dedent");
import FileSystem = require("fs-extra");
import Tar = require("tar");
import { TempDirectory } from "temp-filesystem";
import { ThemeInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ThemeInstructionCompiler";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";

suite(
    "ThemeInstructionCompiler",
    () =>
    {
        let themeArchive: string;
        let tempDir: TempDirectory;
        let themeDir: TempDirectory;
        let compiler: ThemeInstructionCompiler;
        let instruction: ThemeInstruction;

        suiteSetup(
            async () =>
            {
                tempDir = new TempDirectory();
                themeDir = new TempDirectory();

                let $package: Package = new Package(
                    {
                        Identifier: "foo",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                let resourceDir: TempDirectory = new TempDirectory();
                await FileSystem.writeFile(
                    resourceDir.MakePath("variables.json"),
                    Dedent(`
                        {
                            "wcfHeaderBackground": "red",
                            "somethingSpecial": "test-value",
                            "moreSpecialStuff": "foobar"
                        }`));
                await FileSystem.writeFile(
                    resourceDir.MakePath("main.scss"),
                    Dedent(`
                        :root
                        {
                            color: red !important;
                        }`));

                instruction = new ThemeInstruction(
                    {
                        Theme: {
                            Name: "test-theme",
                            DisplayName: {},
                            VariableFileName: resourceDir.MakePath("variables.json"),
                            CustomScssFileName: resourceDir.MakePath("main.scss")
                        }
                    });

                resourceDir.Dispose();
                $package.InstallSet.push(instruction);
                compiler = new ThemeInstructionCompiler(instruction);
                compiler.DestinationPath = tempDir.FullName;
                themeArchive = tempDir.MakePath(instruction.FullName);
            });

        suiteTeardown(
            () =>
            {
                tempDir.Dispose();
                themeDir.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the instruction can be compiled without any errors…",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the tar-archive has been created…",
                    async () =>
                    {
                        Assert.strictEqual(await FileSystem.pathExists(themeArchive), true);
                    });

                test(
                    "Checking whether the tar-archive can be extracted without an error…",
                    async () =>
                    {
                        await Tar.extract(
                            {
                                cwd: themeDir.FullName,
                                file: themeArchive
                            });
                    });

                test(
                    "Checking whether the files expected in the tar-archive exist…",
                    async () =>
                    {
                        Assert.strictEqual(await FileSystem.pathExists(themeDir.MakePath("style.xml")), true);
                        Assert.strictEqual(await FileSystem.pathExists(themeDir.MakePath("variables.xml")), true);
                    });
            });
    });
