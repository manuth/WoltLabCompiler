import { strictEqual } from "node:assert";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { IImageDirectoryDescriptorOptions } from "../../../Customization/Presentation/Themes/IImageDirectoryDescriptorOptions.js";
import { ImageDirectoryDescriptor } from "../../../Customization/Presentation/Themes/ImageDirectoryDescriptor.js";

/**
 * Registers tests for the {@link ImageDirectoryDescriptor `ImageDirectoryDescriptor`} class.
 */
export function ImageDirectoryDescriptorTests(): void
{
    suite(
        nameof(ImageDirectoryDescriptor),
        () =>
        {
            let dirName: string;
            let customFileName: string;
            let customDestination: string;
            let imageDirectoryOptions: IImageDirectoryDescriptorOptions;
            let imageDirectory: ImageDirectoryDescriptor;
            let customOptions: IImageDirectoryDescriptorOptions;
            let customImageDirectory: ImageDirectoryDescriptor;
            let defaultFileName = "images.tar";

            suiteSetup(
                () =>
                {
                    dirName = fileURLToPath(new URL(".", import.meta.url));
                    customFileName = "example.tar";
                    customDestination = "dist";

                    imageDirectoryOptions = {
                        Source: "example"
                    };

                    customOptions = {
                        ...imageDirectoryOptions,
                        FileName: customFileName,
                        DestinationRoot: customDestination
                    };

                    imageDirectory = new ImageDirectoryDescriptor(imageDirectoryOptions);
                    customImageDirectory = new ImageDirectoryDescriptor(customOptions);
                });

            suite(
                nameof<ImageDirectoryDescriptor>((descriptor) => descriptor.FileName),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<ImageDirectoryDescriptor>((d) => d.FileName)}\`-property is set to "${defaultFileName}" when no filename is specified…`,
                        () => strictEqual(imageDirectory.FileName, defaultFileName));

                    test(
                        `Checking whether the \`${nameof<ImageDirectoryDescriptor>((d) => d.FileName)}\`-property is set properly when a filename is specified…`,
                        () => strictEqual(customImageDirectory.FileName, customFileName));
                });

            suite(
                nameof<ImageDirectoryDescriptor>((descriptor) => descriptor.DestinationRoot),
                () =>
                {
                    test(
                        `Checking whether \`${nameof<ImageDirectoryDescriptor>((d) => d.DestinationRoot)}\` is set to the \`${nameof<ImageDirectoryDescriptor>((d) => d.Source)}\` if no destination-root is specified…`,
                        () =>
                        {
                            strictEqual(imageDirectory.DestinationRoot, imageDirectoryOptions.Source);
                        });

                    test(
                        `Checking whether the \`${nameof<ImageDirectoryDescriptor>((d) => d.DestinationRoot)}\` is set to the basename of the \`${nameof<ImageDirectoryDescriptor>((d) => d.Source)}\` if no destination-root is specified and the source is absolute or starts with \`..\`…`,
                        () =>
                        {
                            strictEqual(
                                new ImageDirectoryDescriptor({ Source: resolve(dirName) }).DestinationRoot,
                                basename(dirName));
                        });

                    test(
                        `Checking whether \`${nameof<ImageDirectoryDescriptor>((d) => d.DestinationRoot)}\` is set properly when a destination-root is specified…`,
                        () => strictEqual(customImageDirectory.DestinationRoot, customDestination));
                });
        });
}
