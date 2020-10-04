import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { readFile } from "fs-extra";
import { DOMParser } from "xmldom";
import { EventListenerFileCompiler } from "../../../Compilation/Events/EventListenerFileCompiler";
import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";

/**
 * Registers tests for the `EventListenerFileCompiler` class.
 */
export function EventListenerFileCompilerTests(): void
{
    suite(
        "EventListenerFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: EventListenerFileCompiler;
            let className: string;
            let allowInherit: boolean;
            let eventHandler: string;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    className = "wcf\\system\\foo\\bar";
                    allowInherit = Math.random() > 0.5;
                    eventHandler = "wcf\\system\\baz";

                    let instruction: EventListenerInstruction = new EventListenerInstruction(
                        {
                            FileName: null,
                            Listeners: [
                                {
                                    Name: "test",
                                    EventName: "foo",
                                    ClassName: className,
                                    AllowInherited: allowInherit,
                                    EventHandlerClassName: eventHandler
                                }
                            ]
                        });

                    compiler = new EventListenerFileCompiler(instruction);
                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    suite(
                        "General",
                        () =>
                        {
                            test(
                                "Checking whether the compiler can be executed…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });
                        });

                    suite(
                        "Checking the integrity of the compiled file…",
                        () =>
                        {
                            let editor: XMLEditor;

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        "Checking whether the content of the file is valid xml…",
                                        async () =>
                                        {
                                            let document: Document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                            editor = new XMLEditor(document.documentElement);
                                        });
                                });

                            suite(
                                "Checking the integrity of the event-listener…",
                                () =>
                                {
                                    let eventListenerEditor: XMLEditor;
                                    let listenerTag: string;
                                    let eventClassTag: string;
                                    let inheritTag: string;
                                    let eventHandlerTag: string;

                                    suiteSetup(
                                        () =>
                                        {
                                            listenerTag = "eventlistener";
                                            eventClassTag = "eventclassname";
                                            inheritTag = "inherit";
                                            eventHandlerTag = "listenerclassname";
                                        });

                                    test(
                                        "Checking whether the event-listener is present…",
                                        () =>
                                        {
                                            strictEqual(editor.GetElementsByTag(listenerTag).length, 1);
                                            eventListenerEditor = editor.GetElementsByTag(listenerTag)[0];
                                        });

                                    test(
                                        "Checking the integrity of the meta-data…",
                                        () =>
                                        {
                                            strictEqual(eventListenerEditor.HasText(eventClassTag, className), true);
                                            strictEqual(eventListenerEditor.HasText(inheritTag, allowInherit ? "1" : "0"), true);
                                            strictEqual(eventListenerEditor.HasText(eventHandlerTag, eventHandler), true);
                                        });
                                });
                        });
                });
        });
}
