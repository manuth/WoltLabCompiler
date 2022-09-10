import { Listener } from "../../Events/Listener.js";
import { IListenerInstruction } from "../../PackageSystem/Instructions/Events/IListenerInstruction.js";
import { XML } from "../../Serialization/XML.js";
import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler.js";

/**
 * Provides the functionality to compile listener-files.
 *
 * @template TInstruction
 * The type of the instruction which can be compiled by this compiler.
 *
 * @template TListener
 * The type of the listeners provided by the {@link ListenerFileCompiler.Item `Item`}.
 */
export abstract class ListenerFileCompiler<TInstruction extends IListenerInstruction<TListener>, TListener extends Listener> extends NamedObjectDeletionFileCompiler<TInstruction>
{
    /**
     * Initializes a new instance of the {@link ListenerFileCompiler `ListenerFileCompiler<TInstruction, TListener>`} class.
     *
     * @param instruction
     * The instruction to compile.
     */
    public constructor(instruction: TInstruction)
    {
        super(instruction);
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
