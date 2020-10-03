import Assert = require("assert");
import FileSystem = require("fs-extra");
import Tar = require("tar");
import { TempDirectory, TempFile } from "temp-filesystem";
import { PackageCompiler } from "../../../Compilation/PackageSystem/PackageCompiler";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `PackageCompiler` class.
 */
export function PackageCompilerTests(): void
{
    suite(
        "PackageCompiler",
        () =>
        {
            let archive: TempFile;
            let archiveDir: TempDirectory;
            let compiler: PackageCompiler;
            let extensionPackage: Package;

            suiteSetup(
                () =>
                {
                    archive = new TempFile();
                    archiveDir = new TempDirectory();

                    extensionPackage = new Package(
                        {
                            Identifier: "com.example.mypackage",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    compiler = new PackageCompiler(extensionPackage);
                    compiler.DestinationPath = archive.FullName;
                });

            suiteTeardown(
                () =>
                {
                    archive.Dispose();
                    archiveDir.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    test(
                        "Checking whether the instruction can be executed…",
                        async () =>
                        {
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether the tar-archive can be extracted…",
                        async () =>
                        {
                            await Tar.extract(
                                {
                                    cwd: archiveDir.FullName,
                                    file: archive.FullName
                                });
                        });

                    test(
                        "Checking whether the package-manifest exists inside the tar-archive…",
                        async () =>
                        {
                            Assert.strictEqual(await FileSystem.pathExists(archiveDir.MakePath("package.xml")), true);
                        });
                });
        });
}
