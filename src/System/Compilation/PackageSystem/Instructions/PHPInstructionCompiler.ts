import { PHPInstruction } from "../../../PackageSystem/Instructions/PHPInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile PHP-instructions.
 */
export class PHPInstructionCompiler extends InstructionCompiler<PHPInstruction>
{
    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    public Serialize(): Document
    {
        let document = super.Serialize();
        let editor = new XMLEditor(document.documentElement);

        if (this.Item.Application)
        {
            editor.SetAttribute("application", this.Item.Application);
        }

        return document;
    }
}
