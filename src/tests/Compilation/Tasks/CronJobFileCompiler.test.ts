import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { CronJobFileCompiler } from "../../../Compilation/Tasks/CronJobFileCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { TimePeriod } from "../../../Tasks/TimePeriod";

/**
 * Registers tests for the `CronJobFileCompiler` class.
 */
export function CronJobFileCompilerTests(): void
{
    suite(
        "CronJobFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: CronJobFileCompiler;
            let cronJobName: string;
            let locale: string;
            let localizedDescription: string;
            let invariantDescription: string;
            let className: string;
            let allowDisable: boolean;
            let allowEdit: boolean;
            let options: string[];
            let period: TimePeriod;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    cronJobName = "bar";
                    locale = "de";
                    localizedDescription = "test-description";
                    invariantDescription = "invariant-description-Test";
                    className = "foo\\bar";
                    allowDisable = true;
                    allowEdit = false;
                    options = ["foo", "bar", "baz"];
                    period = new TimePeriod("2", "5", "7", "Jan", "*");

                    let description: ILocalization = {};
                    description[locale] = localizedDescription;
                    description["inv"] = invariantDescription;

                    let instruction: CronJobInstruction = new CronJobInstruction(
                        {
                            FileName: "cronJobs.xml",
                            CronJobs: [
                                {
                                    Name: cronJobName,
                                    Description: description,
                                    ClassName: className,
                                    AllowDisable: allowDisable,
                                    AllowEdit: allowEdit,
                                    Options: options,
                                    Period: period
                                }
                            ]
                        });

                    compiler = new CronJobFileCompiler(instruction);
                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    suite(
                        "General tests…",
                        () =>
                        {
                            test(
                                "Checking whether the instruction can be compiled without an error…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });
                        });

                    suite(
                        "Testing the integrity of the created file…",
                        () =>
                        {
                            let importEditor: XMLEditor;

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        "Checking whether the content of the compiled file is valid xml…",
                                        async () =>
                                        {
                                            let document: Document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                            importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                        });
                                });

                            suite(
                                "Checking the integrity of the cron-job…",
                                () =>
                                {
                                    let cronJobTag: string;
                                    let cronJobEditor: XMLEditor;

                                    suiteSetup(
                                        () =>
                                        {
                                            cronJobTag = "cronjob";
                                        });

                                    suite(
                                        "General",
                                        () =>
                                        {
                                            test(
                                                "Checking whether the cron-job is present…",
                                                () =>
                                                {
                                                    strictEqual(importEditor.HasTag(cronJobTag, true), true);
                                                    cronJobEditor = importEditor.GetChildrenByTag(cronJobTag)[0];
                                                });
                                        });

                                    suite(
                                        "Checking the meta-data of the cron-job",
                                        () =>
                                        {
                                            let classTag: string;
                                            let descriptionTag: string;
                                            let disableTag: string;
                                            let editTag: string;
                                            let optionsTag: string;
                                            let minuteTag: string;
                                            let hourTag: string;
                                            let dayOfMonthTag: string;
                                            let monthTag: string;
                                            let dayOfWeekTag: string;

                                            let nameAttribute: string;
                                            let languageAttribute: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    classTag = "classname";
                                                    descriptionTag = "description";
                                                    disableTag = "canbedisabled";
                                                    editTag = "canbeedited";
                                                    optionsTag = "options";
                                                    minuteTag = "startminute";
                                                    hourTag = "starthour";
                                                    dayOfMonthTag = "startdom";
                                                    monthTag = "startmonth";
                                                    dayOfWeekTag = "startdow";

                                                    nameAttribute = "name";
                                                    languageAttribute = "language";
                                                });

                                            test(
                                                "Checking the name of the cron-job…",
                                                () =>
                                                {
                                                    strictEqual(cronJobEditor.GetAttribute(nameAttribute), cronJobName);
                                                });

                                            test(
                                                "Checking the class-name of the cron-job…",
                                                () =>
                                                {
                                                    strictEqual(cronJobEditor.HasText(classTag, className), true);
                                                });

                                            test(
                                                "Checking whether the localized description is correct…",
                                                () =>
                                                {
                                                    for (let editor of cronJobEditor.GetChildrenByTag(descriptionTag))
                                                    {
                                                        if (editor.HasAttribute(languageAttribute))
                                                        {
                                                            strictEqual(editor.GetAttribute(languageAttribute), locale);
                                                        }

                                                        strictEqual(editor.TextContent, editor.HasAttribute(languageAttribute) ? localizedDescription : invariantDescription);
                                                    }
                                                });

                                            test(
                                                "Checking whether the permission-settings are correct…",
                                                () =>
                                                {
                                                    strictEqual(cronJobEditor.HasText(disableTag, allowDisable ? "1" : "0"), true);
                                                    strictEqual(cronJobEditor.HasText(editTag, allowEdit ? "1" : "0"), true);
                                                });

                                            test(
                                                "Checking whether the options are correct…",
                                                () =>
                                                {
                                                    strictEqual(cronJobEditor.GetText(optionsTag), options.join(","));
                                                });

                                            test(
                                                "Checking whether the time-period is correct…",
                                                () =>
                                                {
                                                    strictEqual(cronJobEditor.HasText(minuteTag, period.Minute), true);
                                                    strictEqual(cronJobEditor.HasText(hourTag, period.Hour), true);
                                                    strictEqual(cronJobEditor.HasText(dayOfMonthTag, period.DayOfMonth), true);
                                                    strictEqual(cronJobEditor.HasText(monthTag, period.Month), true);
                                                    strictEqual(cronJobEditor.HasText(dayOfWeekTag, period.DayOfWeek), true);
                                                });
                                        });
                                });
                        });
                });
        });
}
