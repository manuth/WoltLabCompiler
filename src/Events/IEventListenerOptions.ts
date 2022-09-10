// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { EventListener } from "./EventListener.js";
import { IListenerOptions } from "./IListenerOptions.js";

/**
 * Provides options for the {@link EventListener `EventListener`} class.
 */
export interface IEventListenerOptions extends IListenerOptions
{
    /**
     * The name of the class to listen to.
     */
    ClassName: string;

    /**
     * A value indicating whether listening to the event thrown by a class inheriting from {@link IEventListenerOptions.ClassName `ClassName`} is allowed.
     */
    AllowInherited?: boolean;

    /**
     * The name of the event-handler class which is triggered when the event has been executed.
     *
     * Please consider that the event-handler class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
     */
    EventHandlerClassName: string;
}
