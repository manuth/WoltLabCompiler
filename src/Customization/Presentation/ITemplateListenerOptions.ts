import { IListenerOptions } from "../../Events/IListenerOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateListener } from "./TemplateListener";

/**
 * Provides options for the {@link TemplateListener `TemplateListener`} class.
 */
export interface ITemplateListenerOptions extends IListenerOptions
{
    /**
     * The name of the template to listen to.
     */
    TemplateName: string;

    /**
     * The code to insert when the event is executed.
     */
    Code: string;
}
