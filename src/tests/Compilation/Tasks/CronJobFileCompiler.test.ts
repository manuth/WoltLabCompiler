import { ok, strictEqual } from "assert";
import { CronJobFileCompiler } from "../../../Compilation/Tasks/CronJobFileCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { TimePeriod } from "../../../Tasks/TimePeriod";
import { ImportCompilerTester } from "../TestComponents/Testers/ImportCompilerTester";
import { ImportCompilerTestRunner } from "../TestComponents/TestRunners/ImportCompilerTestRunner";

/**
 * Registers tests for the `CronJobFileCompiler` class.
 */
export function CronJobFileCompilerTests(): void
{
    new class extends ImportCompilerTestRunner<ImportCompilerTester<CronJobFileCompiler>, CronJobFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): ImportCompilerTester<CronJobFileCompiler>
        {
            let locales = ["inv", "de", "en"];
            let description: ILocalization = {};

            for (let locale of locales)
            {
                description[locale] = `${locale}-description`;
            }

            return new ImportCompilerTester(
                new CronJobFileCompiler(
                    new CronJobInstruction(
                        {
                            FileName: "cronJobs.xml",
                            CronJobs: [
                                {
                                    Name: "foo",
                                    Description: description,
                                    ClassName: "foo\\bar",
                                    AllowDisable: Math.random() > 0.5,
                                    AllowEdit: Math.random() > 0.5,
                                    Options: [
                                        "foo",
                                        "bar",
                                        "baz"
                                    ],
                                    Period: new TimePeriod("2", "5", "7", "Jan", "*")
                                }
                            ]
                        })));
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    let localeAttribute = "language";
                    let cronJobNodes = this.Tester.ImportEditor.GetChildrenByTag("cronjob");
                    strictEqual(cronJobNodes.length, this.Compiler.Item.CronJobs.length);

                    for (let cronJob of this.Compiler.Item.CronJobs)
                    {
                        ok(
                            cronJobNodes.some(
                                (cronJobNode) =>
                                {
                                    try
                                    {
                                        strictEqual(cronJobNode.GetAttribute("name"), cronJob.Name);
                                        this.AssertTagContent(cronJobNode, "classname", cronJob.ClassName);

                                        for (let locale of cronJob.Description.GetLocales())
                                        {
                                            cronJobNode.GetChildrenByTag("description").some(
                                                (nameNode) =>
                                                {
                                                    return (
                                                        (locale === "inv") ?
                                                            !nameNode.HasAttribute(localeAttribute) :
                                                            (nameNode.HasAttribute(localeAttribute) && nameNode.GetAttribute(localeAttribute) === locale)) &&
                                                        (nameNode.TextContent === cronJob.Description.Data.get(locale));
                                                });
                                        }

                                        this.AssertTagContent(cronJobNode, "canbedisabled", cronJob.AllowDisable ? "1" : "0");
                                        this.AssertTagContent(cronJobNode, "canbeedited", cronJob.AllowEdit ? "1" : "0");

                                        for (let option of cronJob.Options)
                                        {
                                            ok(this.GetText(cronJobNode, "options").split(",").includes(option));
                                        }

                                        this.AssertTagContent(cronJobNode, "startminute", cronJob.Period.Minute);
                                        this.AssertTagContent(cronJobNode, "starthour", cronJob.Period.Hour);
                                        this.AssertTagContent(cronJobNode, "startdom", cronJob.Period.DayOfMonth);
                                        this.AssertTagContent(cronJobNode, "startmonth", cronJob.Period.Month);
                                        this.AssertTagContent(cronJobNode, "startdow", cronJob.Period.DayOfWeek);
                                        return true;
                                    }
                                    catch
                                    {
                                        return false;
                                    }
                                }));
                    }
                });
        }
    }("CronJobFileCompiler").Register();
}
