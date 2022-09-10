import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { UserOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/UserOptionInstructionCompiler.js";
import { Node } from "../../../NodeSystem/Node.js";
import { ICategoryOptions } from "../../../Options/ICategoryOptions.js";
import { IUserOptionOptions } from "../../../Options/UserPanel/IUserOptionOptions.js";
import { UserCategory } from "../../../Options/UserPanel/UserCategory.js";
import { UserOption } from "../../../Options/UserPanel/UserOption.js";
import { IOptionInstructionOptions } from "./IOptionInstructionOptions.js";
import { OptionInstruction } from "./OptionInstruction.js";

/**
 * Represents an instruction which provides options for users.
 */
export class UserOptionInstruction extends OptionInstruction<UserCategory, ICategoryOptions<IUserOptionOptions>, UserOption, IUserOptionOptions>
{
    /**
     * Initializes a new instance of the {@link UserOptionInstruction `UserOptionInstruction`} class.
     *
     * @param options
     * The options of the user-option instruction.
     */
    public constructor(options: IOptionInstructionOptions<ICategoryOptions<IUserOptionOptions>>)
    {
        super(
            options,
            (node: Node<UserCategory, ICategoryOptions<IUserOptionOptions>>, opts: ICategoryOptions<IUserOptionOptions>) =>
            {
                return new UserCategory(node, opts);
            });
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "userOption";
    }

    /**
     * @inheritdoc
     */
    public get RootCategory(): string
    {
        return "wcf.user.option";
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<UserOptionInstruction>
    {
        return new UserOptionInstructionCompiler(this);
    }
}
