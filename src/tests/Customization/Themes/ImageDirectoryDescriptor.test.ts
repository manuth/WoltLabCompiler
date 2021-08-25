import { strictEqual } from "assert";
import { ImageDirectoryDescriptor } from "../../../Customization/Presentation/Themes/ImageDirectoryDescriptor";

/**
 * Registers tests for the {@link ImageDirectoryDescriptor `ImageDirectoryDescriptor`} class.
 */
export function ImageDirectoryDescriptorTests(): void
{
    suite(
        nameof(ImageDirectoryDescriptor),
        () =>
        {
            let customFileName: string;
            let customDestination: string;
            let imageDirectory: ImageDirectoryDescriptor;
            let customImageDirectory: ImageDirectoryDescriptor;
            let defaultFileName = "images.tar";

            suiteSetup(
                () =>
                {
                    customFileName = "example.tar";
                    customDestination = "dist";

                    imageDirectory = new ImageDirectoryDescriptor(
                        {
                            Source: "example"
                        });

                    customImageDirectory = new ImageDirectoryDescriptor(
                        {
                            Source: "example",
                            FileName: customFileName,
                            DestinationRoot: customDestination
                        });
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
                        () => strictEqual(imageDirectory.DestinationRoot, imageDirectory.Source));

                    test(
                        `Checking whether \`${nameof<ImageDirectoryDescriptor>((d) => d.DestinationRoot)}\` is set properly when a destination-root is specified…`,
                        () => strictEqual(customImageDirectory.DestinationRoot, customDestination));
                });
        });
}
