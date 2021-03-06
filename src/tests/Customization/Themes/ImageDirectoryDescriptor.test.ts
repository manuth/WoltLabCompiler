import { strictEqual } from "assert";
import { ImageDirectoryDescriptor } from "../../../Customization/Presentation/Themes/ImageDirectoryDescriptor";

/**
 * Registers tests for the {@link ImageDirectoryDescriptor `ImageDirectoryDescriptor`} class.
 */
export function ImageDirectoryDescriptorTests(): void
{
    suite(
        "ImageDirectoryDescriptor",
        () =>
        {
            let customFileName: string;
            let customDestination: string;

            let imageDirectory: ImageDirectoryDescriptor;

            let customImageDirectory: ImageDirectoryDescriptor;

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
                "FileName",
                () =>
                {
                    test(
                        'Checking whether the `FileName`-property is set to "images.tar" when no filename is specified…',
                        () => strictEqual(imageDirectory.FileName, "images.tar"));

                    test(
                        "Checking whether the `FileName`-property is set properly when a filename is specified…",
                        () => strictEqual(customImageDirectory.FileName, customFileName));
                });

            suite(
                "DestinationRoot",
                () =>
                {
                    test(
                        "Checking whether `DestinationRoot` is set to `Source` when no destination-root is specified…",
                        () => strictEqual(imageDirectory.DestinationRoot, imageDirectory.Source));

                    test(
                        "Checking whether `DestinationRoot` is set properly when a destination-root is specified…",
                        () => strictEqual(customImageDirectory.DestinationRoot, customDestination));
                });
        });
}
