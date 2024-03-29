import { IDeleteInstruction } from "../PackageSystem/Instructions/IDeleteInstruction.js";
import { XMLEditor } from "../Serialization/XMLEditor.js";
import { ImportFileCompiler } from "./ImportFileCompiler.js";

/**
 * Provides the functionality to compile files with an import- and a delete-section.
 *
 * @template TItem
 * The type of the item which can be compiled by this compiler.
 *
 * @template TObject
 * The type of the information that is required for serializing an object-deletion.
 */
export abstract class ObjectDeletionFileCompiler<TItem extends IDeleteInstruction<TObject>, TObject> extends ImportFileCompiler<TItem>
{
    /**
     * Initializes a new instance of the {@link ObjectDeletionFileCompiler `ObjectDeletionFileCompiler<TItem, TObject>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: TItem)
    {
        super(item);
    }

    /**
     * Serializes the delete-section of the document.
     *
     * @returns
     * The serialized deletion.
     */
    protected override CreateDelete(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateDelete());

        for (let objectToDelete of this.Item.ObjectsToDelete)
        {
            editor.Add(this.CreateDeleteObject(objectToDelete));
        }

        return editor.Element;
    }

    /**
     * Serializes an object to delete.
     *
     * @param object
     * The object to delete.
     *
     * @returns
     * The serialized deletion-entry.
     */
    protected abstract CreateDeleteObject(object: TObject): Element;
}
