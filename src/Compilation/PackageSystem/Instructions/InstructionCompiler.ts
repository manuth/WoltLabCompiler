import { DOMParser } from "@xmldom/xmldom";
import { join } from "upath";
import { IInstruction } from "../../../PackageSystem/Instructions/IInstruction";
import { Compiler } from "../../Compiler";

/**
 * Provides the functionality to compile an instruction.
 *
 * @template T
 * The type of the instruction which can be compiled by this compiler.
 */
export class InstructionCompiler<T extends IInstruction> extends Compiler<T>
{
    /**
     * Initializes a new instance of the {@link InstructionCompiler `InstructionCompiler<T>`} class.
     *
     * @param instruction
     * The instruction to compile.
     */
    public constructor(instruction: T)
    {
        super(instruction);
    }

    /**
     * Gets the name of the file to write the compiled item to.
     */
    public get DestinationFileName(): string
    {
        return this.MakePackagePath(this.Item.FullName);
    }

    /**
     * Returns an xml-{@link Document `Document`} which represents the compiled instruction.
     *
     * @returns
     * The serialized document.
     */
    public Serialize(): Document
    {
        let document = new DOMParser().parseFromString("<instruction />");
        document.documentElement.textContent = this.Item.FullName;
        document.documentElement.setAttribute("type", this.Item.Type);

        if (this.Item.Standalone)
        {
            document.documentElement.setAttribute("run", "standalone");
        }

        return document;
    }

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    { }

    /**
     * Copies files using `ejs`.
     *
     * @param source
     * The source to copy the files from.
     *
     * @param destination
     * The destination to copy the files to.
     *
     * @param context
     * The context to use.
     *
     * @param delimiter
     * The delimiter of the ejs-tags.
     */
    protected override async CopyTemplate(source: string, destination: string, context?: Record<string, unknown>, delimiter?: string): Promise<void>
    {
        context = context || {};

        Object.assign(
            context,
            {
                $: (id: string): any => this.Item.Collection.Package.GetObjectByID(id),
                Item: this.Item
            });

        await super.CopyTemplate(source, destination, context, delimiter);
    }

    /**
     * Joins the paths and returns the path contained by the package-folder.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The joined path relative to the package-folder.
     */
    protected MakePackagePath(...path: string[]): string
    {
        return super.MakeDestinationPath(...path);
    }

    /**
     * @inheritdoc
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The joined path relative to the destination-folder.
     */
    protected override MakeDestinationPath(...path: string[]): string
    {
        return join(this.DestinationFileName, ...path);
    }
}
