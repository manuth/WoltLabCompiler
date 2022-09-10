import { PHPInstruction } from "../../../PackageSystem/Instructions/PHPInstruction.js";
import { XMLEditor } from "../../../Serialization/XMLEditor.js";
import { InstructionCompiler } from "./InstructionCompiler.js";

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
    public override Serialize(): Document
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
