import { ok, strictEqual } from "node:assert";
import { CronJobFileCompiler } from "../../../Compilation/Tasks/CronJobFileCompiler.js";
import { Constants } from "../../../Constants.js";
import { ILocalization } from "../../../Globalization/ILocalization.js";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction.js";
import { TimePeriod } from "../../../Tasks/TimePeriod.js";
import { ImportCompilerTester } from "../TestComponents/Testers/ImportCompilerTester.js";
import { ImportCompilerTestRunner } from "../TestComponents/TestRunners/ImportCompilerTestRunner.js";

/**
 * Registers tests for the {@link CronJobFileCompiler `CronJobFileCompiler`} class.
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
            let locales = [Constants.InvariantCultureName, "de", "en"];
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
        protected override ExecuteTests(): void
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
                                                        (locale === Constants.InvariantCultureName) ?
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
    }(nameof(CronJobFileCompiler)).Register();
}
