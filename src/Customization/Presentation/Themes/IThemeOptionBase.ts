import { ILocalization } from "../../../Globalization/ILocalization.js";
import { IComponentOptions } from "../../../PackageSystem/IComponentOptions.js";
import { IFileDescriptorOptions } from "../../../PackageSystem/IFileDescriptorOptions.js";
import { IImageDirectoryDescriptorOptions } from "./IImageDirectoryDescriptorOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Theme } from "./Theme.js";

/**
 * Provides base-options for the {@link Theme `Theme`} class.
 */
export interface IThemeOptionBase extends Partial<IComponentOptions>
{
    /**
     * The name of the theme.
     */
    Name: string;

    /**
     * @inheritdoc
     */
    DisplayName: ILocalization;

    /**
     * The thumbnail of the theme.
     */
    Thumbnail?: IFileDescriptorOptions | string;

    /**
     * The high resolution version of the thumbnail.
     */
    HighResThumbnail?: IFileDescriptorOptions | string;

    /**
     * The path to the default cover-photo for user-profiles.
     */
    CoverPhoto?: IFileDescriptorOptions | string;

    /**
     * The variables of the theme.
     */
    Variables?: Record<string, string>;

    /**
     * The image-directory provided by the theme.
     */
    Images?: IImageDirectoryDescriptorOptions;
}
