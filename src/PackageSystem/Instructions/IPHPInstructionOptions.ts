import { IInstructionOptions } from "./IInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PHPInstruction } from "./PHPInstruction";

 /**
  * Provides options for the {@link PHPInstruction `PHPInstruction`} class.
  */
export interface IPHPInstructionOptions extends IInstructionOptions
{
    /**
     * The name of the file to load the php-script from.
     */
    FileName: string;

    /**
     * The application to load the php-file from.
     */
    Application: string;
}
