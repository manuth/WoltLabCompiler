import { Package } from "../../Package.js";
import { InstructionSet } from "../InstructionSet.js";
import { ILocalizationInstruction } from "./ILocalizationInstruction.js";
import { LocalizationInstruction } from "./LocalizationInstruction.js";

/**
 * Provides the functionality to expose an {@link ILocalizationInstruction `ILocalizationInstruction`}s translations.
 */
export class LocalizationProviderInstruction implements ILocalizationInstruction
{
    /**
     * The instruction containing the localized messages.
     */
    private instruction: ILocalizationInstruction;

    /**
     * Initializes a new instance of the {@link LocalizationProviderInstruction `LocalizationProviderInstruction`} class.
     *
     * @param instruction
     * The instruction containing the localized messages.
     */
    public constructor(instruction: ILocalizationInstruction)
    {
        this.instruction = instruction;
    }

    /**
     * Gets the instruction containing the localized messages.
     */
    protected get Instruction(): ILocalizationInstruction
    {
        return this.instruction;
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return LocalizationInstruction.LOCALIZATION_INSTRUCTION_TYPE;
    }

    /**
     * @inheritdoc
     */
    public get Collection(): InstructionSet
    {
        return this.Instruction.Collection;
    }

    /**
     * @inheritdoc
     */
    public get Package(): Package
    {
        return this.Instruction.Package;
    }

    /**
     * @inheritdoc
     */
    public get DestinationRoot(): string
    {
        return this.Instruction.DestinationRoot;
    }

    /**
     * @inheritdoc
     */
    public get FileName(): string
    {
        return this.Instruction.FileName;
    }

    /**
     * @inheritdoc
     */
    public get FullName(): string
    {
        return this.Instruction.FullName;
    }

    /**
     * @inheritdoc
     */
    public get Standalone(): boolean
    {
        return this.Instruction.Standalone;
    }

    /**
     * @inheritdoc
     */
    public get ObjectsByID(): Record<string, unknown>
    {
        return this.Instruction.ObjectsByID;
    }

    /**
     * @inheritdoc
     */
    public get TranslationDirectory(): string
    {
        return this.Instruction.TranslationDirectory;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The messages of the options-instruction.
     */
    public GetMessages(): Record<string, Record<string, Record<string, string>>>
    {
        return this.Instruction.GetMessages();
    }
}
