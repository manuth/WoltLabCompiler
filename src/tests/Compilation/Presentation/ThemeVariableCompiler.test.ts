import { strictEqual } from "assert";
import dedent = require("dedent");
import { pathExists, readFile } from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { ThemeVariableCompiler } from "../../../Compilation/Presentation/ThemeVariableCompiler";

/**
 * Registers tests for the `ThemeVariableCompiler` class.
 */
export function ThemeVariableCompilerTests(): void
{
    suite(
        "ThemeVariableCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: ThemeVariableCompiler;
            let variableName: string;
            let value: string;
            let scssCodeName: string;
            let scssCode: string;

            suiteSetup(
                () =>
                {
                    let variables: Record<string, string> = {};
                    tempFile = new TempFile();
                    variableName = "wcfHeaderBackground";
                    value = "rgba(255, 0, 0, 1)";
                    scssCodeName = "individualScss";

                    scssCode = dedent(
                        `
                        :root
                        {
                            color: red !important;
                        }`);

                    variables[variableName] = value;
                    variables[scssCodeName] = scssCode;

                    compiler = new ThemeVariableCompiler(variables);
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
                        "General tests…",
                        () =>
                        {
                            test(
                                "Checking whether the compiler executes without any errors…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });

                            test(
                                "Checking whether the compiled file exists…",
                                async () =>
                                {
                                    strictEqual(await pathExists(tempFile.FullName), true);
                                });
                        });

                    suite(
                        "Testing the integrity of the file…",
                        () =>
                        {
                            let document: Document;
                            let rootTag: string;
                            let variableTag: string;
                            let rootElement: Element;
                            let variableElement: Element;
                            let scssElement: Element;
                            let variableAttribute: string;

                            suiteSetup(
                                async () =>
                                {
                                    document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                    rootTag = "variables";
                                    variableTag = "variable";
                                    rootElement = document.documentElement;
                                    variableAttribute = "name";

                                    let variableElements: Element[] = [];
                                    let variableNodeList = document.getElementsByTagName(variableTag);

                                    for (let i = 0; i < variableNodeList.length; i++)
                                    {
                                        variableElements.push(variableNodeList.item(i));
                                    }

                                    for (let varElement of variableElements)
                                    {
                                        switch (varElement.getAttribute(variableAttribute))
                                        {
                                            case variableName:
                                                variableElement = varElement;
                                                break;

                                            case scssCodeName:
                                                scssElement = varElement;
                                                break;
                                        }
                                    }

                                    strictEqual(variableElement.parentNode === rootElement, true);
                                    strictEqual(scssElement.parentNode === rootElement, true);
                                });

                            suite(
                                "Testing the XML-Document…",
                                () =>
                                {
                                    test(
                                        "Checking whether the tag-name is correct…",
                                        () =>
                                        {
                                            strictEqual(rootElement.tagName, rootTag);
                                        });
                                });

                            suite(
                                "Testing variables…",
                                () =>
                                {
                                    test(
                                        "Checking whether simple the values of simple variables are stored correctly…",
                                        () =>
                                        {
                                            strictEqual(variableElement.textContent, value);
                                        });

                                    test(
                                        "Checking whether scss-code is stored correctly…",
                                        () =>
                                        {
                                            strictEqual(scssElement.textContent, scssCode);
                                        });
                                });
                        });
                });
        });
}
