import { ILocalization } from "../../../Globalization/ILocalization";
import { IComponentOptions } from "../../../PackageSystem/IComponentOptions";
import { IFileDescriptorOptions } from "../../../PackageSystem/IFileDescriptorOptions";
import { IImageDirectoryDescriptorOptions } from "./IImageDirectoryDescriptorOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme } from "./Theme";

/**
 * Provides base-options for the {@link Theme `Theme`} class.
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
