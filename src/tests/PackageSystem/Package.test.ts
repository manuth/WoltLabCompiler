import { strictEqual } from "assert";
import { TempFileSystem } from "@manuth/temp-files";
import path from "upath";
import { Package } from "../../PackageSystem/Package.js";

const { join } = path;

/**
 * Registers tests for the {@link Package `Package`} class.
 */
export function PackageTests(): void
{
    suite(
        nameof(Package),
        () =>
        {
            let versionNumber: string;

            suiteSetup(
                async () =>
                {
                    // ToDo: use randexp
                    versionNumber = "7.0.0";
                });

            suite(
                nameof<Package>((pkg) => pkg.UpdateSets),
                () =>
                {
                    test(
                        `Checking whether the directory of the \`${nameof<Package>((p) => p.UpdateSets)}\` is being set automatically if none is provided…`,
                        async () =>
                        {
                            strictEqual(
                                new Package(
                                    {
                                        Identifier: "",
                                        DisplayName: {},
                                        Version: "0.0.0",
                                        InstallSet: {
                                            Instructions: []
                                        },
                                        UpdateSets: [
                                            {
                                                FromVersion: versionNumber,
                                                Instructions: []
                                            }
                                        ]
                                    }).UpdateSets[0].Directory,
                                join("update", versionNumber));
                        });

                    test(
                        "Checking whether the directory is set normally if provided…",
                        () =>
                        {
                            let dirName = TempFileSystem.TempBaseName();

                            strictEqual(
                                new Package(
                                    {
                                        Identifier: "",
                                        DisplayName: {},
                                        Version: "0.0.0",
                                        InstallSet: {
                                            Instructions: []
                                        },
                                        UpdateSets: [
                                            {
                                                FromVersion: versionNumber,
                                                Directory: dirName,
                                                Instructions: []
                                            }
                                        ]
                                    }).UpdateSets[0].Directory,
                                dirName);
                        });
                });
        });
}
