import { GroupCategory } from "../../Options/Groups/GroupCategory";
import { GroupOption } from "../../Options/Groups/GroupOption";
import { GroupOptionInstruction } from "../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { OptionFileCompiler } from "./OptionFileCompiler";

/**
 * Provides the functionality to compile group-option files.
 */
export class GroupOptionFileCompiler extends OptionFileCompiler<GroupOptionInstruction, GroupCategory, GroupOption>
{
    /**
     * Initializes a new instance of the `GroupOptionFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: GroupOptionInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/userGroupOption.xsd";
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
    protected CreateOption(option: GroupOption): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateOption(option));

        if (option.UserDefaultValue)
        {
            editor.AddTextElement("userdefaultvalue", `${option.UserDefaultValue}`);
        }

        if (option.ModDefaultValue)
        {
            editor.AddTextElement("moddefaultvalue", `${option.ModDefaultValue}`);
        }

        if (option.AdminDefaultValue)
        {
            editor.AddTextElement("admindefaultvalue", `${option.AdminDefaultValue}`);
        }

        editor.AddTextElement("usersonly", option.RegisteredOnly ? "1" : "0");
        return editor.Element;
    }
}