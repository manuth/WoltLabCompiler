import { XMLEditor } from "../../Serialization/XMLEditor.js";
import { Package } from "../Package.js";
import { InstructionSet } from "./InstructionSet.js";

/**
 * Represents a collection of instructions for updating a package.
 */
export class UpdateInstructionSet extends InstructionSet
{
    /**
     * The version to update the package from.
     */
    private fromVersion: string;

    /**
     * Initializes a new instance of the {@link UpdateInstructionSet `UpdateInstructionSet`} class.
     *
     * @param extensionPackage
     * The package of the update-instruction.
     *
     * @param fromVersion
     * The minimum version of the update-instruction.
     */
    public constructor(extensionPackage: Package, fromVersion: string)
    {
        super(extensionPackage);
        this.FromVersion = fromVersion;
    }

    /**
     * Gets or sets the version to update the package from.
     */
    public get FromVersion(): string
    {
        return this.fromVersion;
    }

    /**
     * @inheritdoc
     */
    public set FromVersion(value: string)
    {
        this.fromVersion = value;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * An element representing this instruction.
     */
    public override Serialize(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.Serialize());
        editor.SetAttribute("type", "update");
        editor.SetAttribute("fromversion", this.FromVersion);
        return editor.Element;
    }
}
