import { GroupCategory } from "../../../Options/Groups/GroupCategory.js";
import { GroupOption } from "../../../Options/Groups/GroupOption.js";
import { GroupOptionInstruction } from "../../../PackageSystem/Instructions/Options/GroupOptionInstruction.js";
import { GroupOptionFileCompiler } from "../../Options/GroupOptionFileCompiler.js";
import { OptionInstructionCompiler } from "./OptionInstructionCompiler.js";

/**
 * Provides the functionality to compile {@link GroupOptionInstruction `GroupOptionInstruction`}s.
 */
export class GroupOptionInstructionCompiler extends OptionInstructionCompiler<GroupOptionInstruction, GroupCategory, GroupOption>
{
    /**
     * Initializes a new instance of the {@link GroupOptionInstructionCompiler `GroupOptionInstructionCompiler`} class.
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
    protected get OptionFileCompiler(): GroupOptionFileCompiler
    {
        return new GroupOptionFileCompiler(this.Item);
    }
}
