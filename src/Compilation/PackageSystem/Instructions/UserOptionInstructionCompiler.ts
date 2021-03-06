import { UserCategory } from "../../../Options/UserPanel/UserCategory";
import { UserOption } from "../../../Options/UserPanel/UserOption";
import { UserOptionInstruction } from "../../../PackageSystem/Instructions/Options/UserOptionInstruction";
import { UserOptionFileCompiler } from "../../Options/UserOptionFileCompiler";
import { OptionInstructionCompiler } from "./OptionInstructionCompiler";

/**
 * Provides the functionality to compile {@link UserOptionInstruction `UserOptionInstruction`}s.
 */
export class UserOptionInstructionCompiler extends OptionInstructionCompiler<UserOptionInstruction, UserCategory, UserOption>
{
    /**
     * Initializes a new instance of the {@link UserOptionInstructionCompiler `UserOptionInstructionCompiler`} class.
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
    protected get OptionFileCompiler(): UserOptionFileCompiler
    {
        return new UserOptionFileCompiler(this.Item);
    }
}
