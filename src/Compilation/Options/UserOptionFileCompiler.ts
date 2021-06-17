import { UserCategory } from "../../Options/UserPanel/UserCategory";
import { UserOption } from "../../Options/UserPanel/UserOption";
import { UserOptionInstruction } from "../../PackageSystem/Instructions/Options/UserOptionInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { OptionFileCompiler } from "./OptionFileCompiler";

/**
 * Provides the functionality to compiler user-option files.
 */
export class UserOptionFileCompiler extends OptionFileCompiler<UserOptionInstruction, UserCategory, UserOption>
{
    /**
     * Initializes a new instance of the {@link UserOptionFileCompiler `UserOptionFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: UserOptionInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/userOption.xsd";
    }

    /**
     * @inheritdoc
     *
     * @param option
     * The option to serialize.
     *
     * @returns
     * The serialized option.
     */
    protected override CreateOption(option: UserOption): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateOption(option));
        editor.Add(editor.CreateTextElement("required", option.Required ? "1" : "0"));
        editor.Add(editor.CreateTextElement("askduringregistration", option.AskOnRegistration ? "1" : "0"));
        editor.Add(editor.CreateTextElement("editable", option.EditPermissions.toString()));
        editor.Add(editor.CreateTextElement("visible", option.ViewPermissions.toString()));
        editor.Add(editor.CreateTextElement("searchable", option.Searchable ? "1" : "0"));

        if (option.OutputClass)
        {
            editor.Add(editor.CreateTextElement("outputclass", option.OutputClass));
        }

        return editor.Element;
    }
}
