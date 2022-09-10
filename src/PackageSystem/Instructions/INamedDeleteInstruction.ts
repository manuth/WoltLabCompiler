import { INamedObject } from "../../INamedObject.js";
import { IDeleteInstruction } from "./IDeleteInstruction.js";

/**
 * Represents an instruction which provides the functionality to delete named objects.
 */
export interface INamedDeleteInstruction extends IDeleteInstruction<INamedObject>
{
}
