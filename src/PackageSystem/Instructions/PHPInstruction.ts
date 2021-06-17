import { InstructionCompiler } from "../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { PHPInstructionCompiler } from "../../Compilation/PackageSystem/Instructions/PHPInstructionCompiler";
import { Instruction } from "./Instruction";
import { IPHPInstructionOptions } from "./IPHPInstructionOptions";

/**
 * Represents an instruction which executes an already existing `.php`-file on the server.
 */
export class PHPInstruction extends Instruction
{
    /**
     * The application to load the php-file from.
     */
    private application: string;

    /**
     * Initializes a new instance of the {@link PHPInstruction `PHPInstruction`} class.
     *
     * @param options
     * The options of the php-instruction.
     */
    public constructor(options: IPHPInstructionOptions)
    {
        super(options);
        this.Application = options.Application;
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "script";
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<PHPInstruction>
    {
        return new PHPInstructionCompiler(this);
    }

    /**
     * Gets or sets the application to load the php-file from.
     */
    public get Application(): string
    {
        return this.application;
    }

    /**
     * @inheritdoc
     */
    public set Application(value: string)
    {
        this.application = value;
    }

    /**
     * Gets or sets the name of the file to load the php-script from.
     */
    public override get FileName(): string
    {
        return super.FileName;
    }

    /**
     * @inheritdoc
     */
    public override set FileName(value: string)
    {
        super.FileName = value;
    }

    /**
     * @inheritdoc
     */
    public override get FullName(): string
    {
        return this.FileName;
    }
}
