import { ILocalization } from "../Globalization/ILocalization";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component } from "./Component";
import { IPersonOptions } from "./IPersonOptions";
import { VersionNumber } from "./VersionNumber";

/**
 * Provides options for the {@link Component `Component`} class.
 */
export interface IComponentOptions
{
    /**
     * The human-readable name of the component.
     */
    DisplayName: ILocalization;

    /**
     * The version of the component.
     */
    Version: VersionNumber;

    /**
     * The author of the component.
     */
    Author?: IPersonOptions;

    /**
     * The creation-date of the component.
     */
    CreationDate?: Date;

    /**
     * The description of the component.
     */
    Description?: ILocalization;

    /**
     * The license of the component.
     */
    License?: string;
}
