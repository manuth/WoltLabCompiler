import { basename } from "node:path";
import { EventListenerFileCompilerTests } from "./EventListenerFileCompiler.test.js";
import { ListenerFileCompilerTests } from "./ListenerFileCompiler.test.js";
import { TemplateListenerFileCompilerTests } from "./TemplateListenerFileCompiler.test.js";

/**
 * Registers tests for events.
 */
export function EventTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ListenerFileCompilerTests();
            EventListenerFileCompilerTests();
            TemplateListenerFileCompilerTests();
        });
}
