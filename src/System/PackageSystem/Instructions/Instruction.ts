import Path = require("path");
import UPath = require("upath");
import { isNullOrUndefined } from "util";
import { InstructionCompiler } from "../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { IInstruction } from "./IInstruction";
import { IInstructionOptions } from "./IInstructionOptions";
import { InstructionSet } from "./InstructionSet";

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
     * Initializes a new instance of the `Instruction` class.
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
    public get Collection()
    {
        return this.collection;
    }

    /**
     * @inheritdoc
     */
    public set Collection(value)
    {
        if (this.Collection !== value)
        {
            if (
                !isNullOrUndefined(this.Collection) &&
                this.Collection.includes(this))
            {
                this.Collection.splice(this.Collection.indexOf(this), 1);
            }

            if (
                isNullOrUndefined(value) ||
                value.includes(this))
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
    public get DestinationRoot()
    {
        return Path.join(this.Collection.Directory);
    }

    /**
     * @inheritdoc
     */
    public get FileName()
    {
        return this.fileName;
    }

    /**
     * @inheritdoc
     */
    public set FileName(value)
    {
        this.fileName = value;
    }

    /**
     * @inheritdoc
     */
    public get FullName()
    {
        return UPath.join(this.DestinationRoot, this.FileName);
    }

    /**
     * @inheritdoc
     */
    public get Standalone()
    {
        return this.standalone;
    }

    /**
     * @inheritdoc
     */
    public set Standalone(value)
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
    public get ObjectsByID(): { [id: string]: any }
    {
        return {};
    }
}