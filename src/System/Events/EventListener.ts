import { IEventListenerOptions } from "./IEventListenerOptions";
import { Listener } from "./Listener";

/**
 * Represents the declaration of a PHP-class that should be executed when a specific event occurs.
 *
 * Please note that you have to provide your PHP-files using a `FilesInstruction`.
 */
export class EventListener extends Listener
{
    /**
     * The name of the class to listen to.
     */
    private className: string;

    /**
     * A value indicating whether listening to the event thrown by a class inheriting from `className` is allowed.
     */
    private allowInherited = false;

    /**
     * The name of the event-handler class which is triggered when the event has been executed.
     *
     * Please consider that the event-handler class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
     */
    private eventHandlerClassName: string;

    /**
     * Initializes a new instance of the `EventListener` class.
     *
     * @param options
     * The options of the event-listener.
     */
    public constructor(options: IEventListenerOptions)
    {
        super(options);
        this.ClassName = options.ClassName;

        if (options.AllowInherited)
        {
            this.AllowInherited = options.AllowInherited;
        }

        this.EventHandlerClassName = options.EventHandlerClassName;
    }

    /**
     * Gets or sets the name of the class to listen to.
     */
    public get ClassName(): string
    {
        return this.className;
    }

    /**
     * @inheritdoc
     */
    public set ClassName(value: string)
    {
        this.className = value;
    }

    /**
     * Gets or sets a value indicating whether listening to the event thrown by a class inheriting from `className` is allowed.
     */
    public get AllowInherited(): boolean
    {
        return this.allowInherited;
    }

    /**
     * @inheritdoc
     */
    public set AllowInherited(value: boolean)
    {
        this.allowInherited = value;
    }

    /**
     * Gets or sets the name of the event-handler class which is triggered when the event has been executed.
     *
     * Please consider that the event-handler class **must** inherit the `wcf\system\event\listener\IParameterizedEventListener`-class.
     */
    public get EventHandlerClassName(): string
    {
        return this.eventHandlerClassName;
    }

    /**
     * @inheritdoc
     */
    public set EventHandlerClassName(value: string)
    {
        this.eventHandlerClassName = value;
    }
}
