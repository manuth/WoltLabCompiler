import { Listener } from "../../Events/Listener";
import { IListenerInstruction } from "../../PackageSystem/Instructions/Events/IListenerInstruction";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile listener-files.
 */
export abstract class ListenerFileCompiler<T extends IListenerInstruction<TListener>, TListener extends Listener> extends NamedObjectDeletionFileCompiler<T>
{
    /**
     * Initializes a new instance of the {@link ListenerFileCompiler `ListenerFileCompiler<T, TListener>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
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

        for (let listener of this.Item.Listeners)
        {
            editor.Add(this.CreateListener(listener));
        }

        return editor.Element;
    }

    /**
     * Serializes a listener to xml.
     *
     * @param listener
     * The listener to serialize.
     *
     * @returns
     * The serialized listener.
     */
    protected CreateListener(listener: TListener): Element
    {
        let editor: XMLEditor = new XMLEditor(XML.CreateDocument(this.ObjectTagName).documentElement);
        editor.SetAttribute("name", listener.Name);
        editor.Add(editor.CreateTextElement("environment", listener.Environment));
        editor.Add(editor.CreateTextElement("eventname", listener.EventName));

        if (listener.ExecutionOrder)
        {
            editor.Add(editor.CreateTextElement("nice", listener.ExecutionOrder.toString()));
        }

        if (listener.Permissions.length > 0)
        {
            editor.Add(editor.CreateTextElement("permissions", listener.Permissions.join(",")));
        }

        if (listener.Options.length > 0)
        {
            editor.Add(editor.CreateTextElement("options", listener.Options.join(",")));
        }

        return editor.Element;
    }
}
