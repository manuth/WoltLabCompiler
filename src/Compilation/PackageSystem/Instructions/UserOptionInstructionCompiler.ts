import { UserCategory } from "../../../Options/UserPanel/UserCategory.js";
import { UserOption } from "../../../Options/UserPanel/UserOption.js";
import { UserOptionInstruction } from "../../../PackageSystem/Instructions/Options/UserOptionInstruction.js";
import { UserOptionFileCompiler } from "../../Options/UserOptionFileCompiler.js";
import { OptionInstructionCompiler } from "./OptionInstructionCompiler.js";

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
