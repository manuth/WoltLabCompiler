import { basename } from "path";
import { ImageDirectoryDescriptorTests } from "./ImageDirectoryDescriptor.test.js";
import { SassVariableParserTests } from "./SassVariableParser.test.js";
import { ThemeTests as ThemeClassTests } from "./Theme.test.js";
import { ThemeLoaderTests } from "./ThemeLoader.test.js";

/**
 * Registers tests for theme components.
 */
export function ThemeTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            SassVariableParserTests();
            ImageDirectoryDescriptorTests();
            ThemeLoaderTests();
            ThemeClassTests();
        });
}
