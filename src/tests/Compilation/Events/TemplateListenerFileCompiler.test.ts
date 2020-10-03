import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { TemplateListenerFileCompiler } from "../../../Compilation/Events/TemplateListenerFileCompiler";
import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";

/**
 * Registers tests for the `TemplateListenerFileCompiler` class.
 */
export function TemplateListenerFileCompilerTests(): void
{
    suite(
        "TemplateListenerFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: TemplateListenerFileCompiler;
            let templateName: string;
            let code: string;

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    templateName = "fooTemplate";
                    code = "{include file='__myFooScript'}";

                    let instruction: TemplateListenerInstruction = new TemplateListenerInstruction(
                        {
                            FileName: null,
                            Listeners: [
                                {
                                    Name: "test",
                                    EventName: "foo",
                                    TemplateName: templateName,
                                    Code: code
                                }
                            ]
                        });

                    compiler = new TemplateListenerFileCompiler(instruction);
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
                                            let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                            editor = new XMLEditor(document.documentElement);
                                        });
                                });

                            suite(
                                "Checking the integrity of the template-listener…",
                                () =>
                                {
                                    let templateListenerEditor: XMLEditor;
                                    let listenerTag: string;
                                    let templateTag: string;
                                    let codeTag: string;

                                    suiteSetup(
                                        () =>
                                        {
                                            listenerTag = "templatelistener";
                                            templateTag = "templatename";
                                            codeTag = "code";
                                        });

                                    test(
                                        "Checking whether the template-listener is present…",
                                        () =>
                                        {
                                            Assert.strictEqual(editor.GetElementsByTag(listenerTag).length, 1);
                                            templateListenerEditor = editor.GetElementsByTag(listenerTag)[0];
                                        });

                                    test(
                                        "Checking the integrity of the meta-data…",
                                        () =>
                                        {
                                            Assert.strictEqual(templateListenerEditor.HasText(templateTag, templateName), true);
                                            Assert.strictEqual(templateListenerEditor.HasText(codeTag, code), true);
                                        });
                                });
                        });
                });
        });
}
