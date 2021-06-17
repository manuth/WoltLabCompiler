import { strictEqual } from "assert";
import { TempFileSystem } from "@manuth/temp-files";
import { join } from "upath";
import { Package } from "../../PackageSystem/Package";

/**
 * Registers tests for the {@link Package `Package`} class.
 */
export function PackageTests(): void
{
    suite(
        "Package",
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
                "UpdateSet",
                () =>
                {
                    test(
                        "Checking whether the directory of update-sets is being set if none is provided…",
                        async () =>
                        {
                            strictEqual(
                                new Package(
                                    {
                                        Identifier: "",
                                        DisplayName: {},
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
