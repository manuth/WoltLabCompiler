import { EventListener } from "../../Events/EventListener.js";
import { EventListenerInstruction } from "../../PackageSystem/Instructions/Events/EventListenerInstruction.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { ListenerFileCompiler } from "./ListenerFileCompiler.js";

/**
 * Provides the functionality to compile event-listener files.
 */
export class EventListenerFileCompiler extends ListenerFileCompiler<EventListenerInstruction, EventListener>
{
    /**
     * Initializes a new instance of the {@link EventListenerFileCompiler `EventListenerFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EventListenerInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/eventListener.xsd";
    }

    /**
     * @inheritdoc
     */
    protected get ObjectTagName(): string
    {
        return "eventlistener";
    }

    /**
     * @inheritdoc
     *
     * @param listener
     * The listener to serialize.
     *
     * @returns
     * The serialized listener.
     */
    protected override CreateListener(listener: EventListener): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateListener(listener));
        editor.Insert(2, editor.CreateTextElement("eventclassname", listener.ClassName));
        editor.Insert(3, editor.CreateTextElement("inherit", listener.AllowInherited ? "1" : "0"));
        editor.Insert(editor.ChildNodes.length, editor.CreateTextElement("listenerclassname", listener.EventHandlerClassName));
        return editor.Element;
    }
}
