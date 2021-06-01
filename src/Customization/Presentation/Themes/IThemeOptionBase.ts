import { ILocalization } from "../../../Globalization/ILocalization";
import { IComponentOptions } from "../../../PackageSystem/IComponentOptions";
import { IFileDescriptorOptions } from "../../../PackageSystem/IFileDescriptorOptions";
import { IImageDirectoryDescriptorOptions } from "./IImageDirectoryDescriptorOptions";

/**
 * Provides base-options for the `Theme` class.
 */
export interface IThemeOptionBase extends Partial<IComponentOptions>
{
    /**
     * @inheritdoc
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
