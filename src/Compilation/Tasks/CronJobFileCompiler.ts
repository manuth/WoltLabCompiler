import { Constants } from "../../Constants";
import { CronJobInstruction } from "../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile cron-job files.
 */
export class CronJobFileCompiler extends NamedObjectDeletionFileCompiler<CronJobInstruction>
{
    /**
     * Initializes a new instance of the {@link CronJobFileCompiler `CronJobFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: CronJobInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/tornado/cronjob.xsd";
    }

    /**
     * @inheritdoc
     */
    protected get ObjectTagName(): string
    {
        return "cronjob";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized import.
     */
    protected override CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateImport());

        for (let cronJob of this.Item.CronJobs)
        {
            let cronJobNode = editor.CreateElement("cronjob");
            editor.Add(cronJobNode);

            if (cronJob.Name)
            {
                cronJobNode.SetAttribute("name", cronJob.Name);
            }

            for (let locale of cronJob.Description.GetLocales())
            {
                let descriptionNode = cronJobNode.CreateTextElement("description", cronJob.Description.Data.get(locale));
                cronJobNode.Add(descriptionNode);

                if (locale !== Constants.InvariantCultureName)
                {
                    descriptionNode.SetAttribute("language", locale);
                }
            }

            cronJobNode.Add(cronJobNode.CreateTextElement("classname", cronJob.ClassName));
            cronJobNode.Add(cronJobNode.CreateTextElement("canbeedited", cronJob.AllowEdit ? "1" : "0"));
            cronJobNode.Add(cronJobNode.CreateTextElement("canbedisabled", cronJob.AllowDisable ? "1" : "0"));

            if (cronJob.Options.length > 0)
            {
                cronJobNode.Add(cronJobNode.CreateTextElement("options", cronJob.Options.join(",")));
            }

            cronJobNode.Add(cronJobNode.CreateTextElement("startminute", cronJob.Period.Minute));
            cronJobNode.Add(cronJobNode.CreateTextElement("starthour", cronJob.Period.Hour));
            cronJobNode.Add(cronJobNode.CreateTextElement("startdom", cronJob.Period.DayOfMonth));
            cronJobNode.Add(cronJobNode.CreateTextElement("startmonth", cronJob.Period.Month));
            cronJobNode.Add(cronJobNode.CreateTextElement("startdow", cronJob.Period.DayOfWeek));
        }

        return editor.Element;
    }
}
