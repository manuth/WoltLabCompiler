import path from "upath";
import { InstructionCompiler } from "../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { Package } from "../Package.js";
import { IInstruction } from "./IInstruction.js";
import { IInstructionOptions } from "./IInstructionOptions.js";
import { InstructionSet } from "./InstructionSet.js";

const { join } = path;

/**
 * Represents a step of a package-installation.
 */
export abstract class Instruction implements IInstruction
{
    /**
     * The package this instruction belongs to.
     */
    private collection: InstructionSet = null;

    /**
     * The name of the file to save the compiled instruction to.
     */
    private fileName: string = null;

    /**
     * A value indicating whether the instruction should be executed in standalone-mode.
     */
    private standalone = false;

    /**
     * Initializes a new instance of the {@link Instruction `Instruction`} class.
     *
     * @param options
     * The options of the instruction.
     */
    public constructor(options: IInstructionOptions)
    {
        this.FileName = options.FileName;
    }

    /**
     * Gets the name of the type of the instruction.
     */
    public abstract get Type(): string;

    /**
     * @inheritdoc
     */
    public get Collection(): InstructionSet
    {
        return this.collection;
    }

    /**
     * @inheritdoc
     */
    public set Collection(value: InstructionSet)
    {
        if (this.Collection !== value)
        {
            if (this.Collection?.includes(this))
            {
                this.Collection.splice(this.Collection.indexOf(this), 1);
            }

            if (value?.includes(this) ?? true)
            {
                this.collection = value;
            }
            else
            {
                value.push(this);
            }
        }
    }

    /**
     * @inheritdoc
     */
    public get Package(): Package
    {
        return this.Collection?.Package;
    }

    /**
     * @inheritdoc
     */
    public get DestinationRoot(): string
    {
        return join(this.Collection.Directory);
    }

    /**
     * @inheritdoc
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    /**
     * @inheritdoc
     */
    public set FileName(value: string)
    {
        this.fileName = value;
    }

    /**
     * @inheritdoc
     */
    public get FullName(): string
    {
        return join(this.DestinationRoot, this.FileName);
    }

    /**
     * @inheritdoc
     */
    public get Standalone(): boolean
    {
        return this.standalone;
    }

    /**
     * @inheritdoc
     */
    public set Standalone(value: boolean)
    {
        this.standalone = value;
    }

    /**
     * Gets the compiler for compiling the instruction.
     */
    public get Compiler(): InstructionCompiler<IInstruction>
    {
        return new InstructionCompiler(this);
    }

    /**
     * @inheritdoc
     */
    public get ObjectsByID(): Record<string, unknown>
    {
        return {};
    }
}
