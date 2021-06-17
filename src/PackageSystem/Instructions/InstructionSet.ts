import { BidirectionalCollection } from "../../Collections/BidirectionalCollection";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { Package } from "../Package";
import { Instruction } from "./Instruction";

/**
 * Represents a collection of instructions.
 */
export class InstructionSet extends BidirectionalCollection<InstructionSet, Instruction>
{
    /**
     * The package the collection belongs to.
     */
    private package: Package;

    /**
     * The directory to save the set to.
     */
    private directory = "components";

    /**
     * Initializes a new instance of the {@link InstructionSet `InstructionSet`} class.
     *
     * @param extensionPackage
     * The extension of the instruction-set.
     */
    public constructor(extensionPackage: Package)
    {
        super(null);
        this.Package = extensionPackage;
    }

    /**
     * @inheritdoc
     */
    public override get Owner(): InstructionSet
    {
        return this;
    }

    /**
     * Gets or sets the package the collection belongs to.
     */
    public get Package(): Package
    {
        return this.package;
    }

    /**
     * @inheritdoc
     */
    public set Package(value: Package)
    {
        this.package = value;
    }

    /**
     * Gets or sets the directory to save the components of this set.
     */
    public get Directory(): string
    {
        return this.directory;
    }

    /**
     * @inheritdoc
     */
    public set Directory(value: string)
    {
        this.directory = value;
    }

    /**
     * Serializes the instruction-set to an xml dom-element.
     *
     * @returns
     * An element representing this instruction.
     */
    public Serialize(): Element
    {
        let document = XML.CreateDocument("instructions");
        let editor = new XMLEditor(document.documentElement);
        editor.SetAttribute("type", "install");

        for (let instruction of this)
        {
            if (instruction.Compiler)
            {
                let childNodes = instruction.Compiler.Serialize().childNodes;

                for (let i = 0; i < childNodes.length; i++)
                {
                    let node: Node = childNodes.item(i);
                    editor.Add(node);
                }
            }
        }

        return editor.Element;
    }

    /**
     * @inheritdoc
     *
     * @param child
     * The child whose parent to return.
     *
     * @returns
     * The parent of the `child`.
     */
    protected GetParent(child: Instruction): InstructionSet
    {
        return child?.Collection;
    }

    /**
     * Sets the parent of a child.
     *
     * @param child
     * The child whose parent is to be set.
     *
     * @param parent
     * The parent to set.
     */
    protected SetParent(child: Instruction, parent: InstructionSet): void
    {
        child.Collection = parent;
    }
}
