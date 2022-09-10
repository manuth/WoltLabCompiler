import { Listener } from "../../Events/Listener.js";
import { ITemplateListenerOptions } from "./ITemplateListenerOptions.js";

/**
 * Represents a component which listens to template-events.
 */
export class TemplateListener extends Listener
{
    /**
     * The name of the template to listen to.
     */
    private templateName: string;

    /**
     * The code to insert when the event is executed.
     */
    private code: string;

    /**
     * Initializes a new instance of the {@link TemplateListener `TemplateListener`} class.
     *
     * @param options
     * The options of the template-listener.
     */
    public constructor(options: ITemplateListenerOptions)
    {
        super(options);
        this.TemplateName = options.TemplateName;
        this.Code = options.Code;
    }

    /**
     * Gets or sets the name of the template to listen to.
     */
    public get TemplateName(): string
    {
        return this.templateName;
    }

    /**
     * @inheritdoc
     */
    public set TemplateName(value: string)
    {
        this.templateName = value;
    }

    /**
     * Gets or sets the code to insert when the event is executed.
     */
    public get Code(): string
    {
        return this.code;
    }

    /**
     * @inheritdoc
     */
    public set Code(value: string)
    {
        this.code = value;
    }
}
