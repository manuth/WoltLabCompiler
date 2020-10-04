import { ok } from "assert";
import { TempFile } from "@manuth/temp-files";
import FileSystem = require("fs-extra");
import { DOMParser } from "xmldom";
import { ListenerFileCompiler } from "../../../Compilation/Events/ListenerFileCompiler";
import { IListenerOptions } from "../../../Events/IListenerOptions";
import { Listener } from "../../../Events/Listener";
import { ListenerEnvironment } from "../../../Events/ListenerEnvironment";
import { IListenerInstruction } from "../../../PackageSystem/Instructions/Events/IListenerInstruction";
import { IListenerInstructionOptions } from "../../../PackageSystem/Instructions/Events/IListenerInstructionOptions";
import { ListenerInstruction } from "../../../PackageSystem/Instructions/Events/ListenerInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";

/**
 * Registers tests for the `ListenerFileCompiler` class.
 */
export function ListenerFileCompilerTests(): void
{
    suite(
        "ListenerFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let listenerTag: string;
            let compiler: ListenerFileCompiler<IListenerInstruction<Listener>, Listener>;
            let name: string;
            let environment: ListenerEnvironment;
            let event: string;
            let executionOrder: number;
            let permissions: string[];
            let enableOptions: string[];

            suiteSetup(
                () =>
                {
                    listenerTag = "myListener";

                    /**
                     * Represenst an instruction which provides listeners.
                     */
                    class MyListenerInstruction extends ListenerInstruction<Listener, IListenerOptions>
                    {
                        /**
                         * Initializes a new instance of the `MyListenerInstruction` class.
                         *
                         * @param options
                         * The options for the initialization.
                         */
                        public constructor(options: IListenerInstructionOptions<IListenerOptions>)
                        {
                            super(options,
                                (opts: IListenerOptions) =>
                                {
                                    return new class extends Listener
                                    {
                                    }(opts);
                                });
                        }

                        /**
                         * @inheritdoc
                         */
                        public get Type(): string
                        {
                            return "baz";
                        }
                    }

                    /**
                     * Provides the functionality to compile `MyListenerInstruction`s.
                     */
                    class MyListenerFileCompiler extends ListenerFileCompiler<MyListenerInstruction, Listener>
                    {
                        /**
                         * @inheritdoc
                         */
                        protected get ObjectTagName(): string
                        {
                            return listenerTag;
                        }

                        /**
                         * @inheritdoc
                         */
                        protected get SchemaLocation(): string
                        {
                            return "http://example.com/myListener.xsd";
                        }
                    }

                    tempFile = new TempFile();
                    name = "test";
                    environment = ListenerEnvironment.FrontEnd;
                    event = "exampleEvent";
                    executionOrder = Math.floor(Math.random() * 100);
                    permissions = ["foo", "bar", "baz"];
                    enableOptions = ["this", "is", "a", "test"];

                    let instruction: ListenerInstruction<Listener, IListenerOptions> = new MyListenerInstruction(
                        {
                            FileName: null,
                            Listeners: [
                                {
                                    Name: name,
                                    Environment: environment,
                                    EventName: event,
                                    ExecutionOrder: executionOrder,
                                    Permissions: permissions,
                                    Options: enableOptions
                                }
                            ]
                        });

                    compiler = new MyListenerFileCompiler(instruction);
                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile()",
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
                        "Checking the integrity of the file…",
                        () =>
                        {
                            let importEditor: XMLEditor;

                            suite(
                                "General",
                                () =>
                                {
                                    test(
                                        "Checking whether the content of the compiled file is valid xml…",
                                        async () =>
                                        {
                                            let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                            importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                        });
                                });

                            suite(
                                "Checking the integrity of the listener…",
                                () =>
                                {
                                    let listenerEditor: XMLEditor;
                                    let nameAttribute: string;
                                    let environmentTag: string;
                                    let eventTag: string;
                                    let executionOrderTag: string;
                                    let permissionsTag: string;
                                    let optionsTag: string;

                                    suiteSetup(
                                        () =>
                                        {
                                            nameAttribute = "name";
                                            environmentTag = "environment";
                                            eventTag = "eventname";
                                            executionOrderTag = "nice";
                                            permissionsTag = "permissions";
                                            optionsTag = "options";
                                        });

                                    test(
                                        "Checking whether the listener is present…",
                                        () =>
                                        {
                                            ok(importEditor.HasTag(listenerTag, true));
                                            listenerEditor = importEditor.GetChildrenByTag(listenerTag)[0];
                                        });

                                    test(
                                        "Checking the integrity of the meta-data…",
                                        () =>
                                        {
                                            ok(listenerEditor.HasAttribute(nameAttribute, name));
                                            ok(listenerEditor.HasText(environmentTag, environment));
                                            ok(listenerEditor.HasText(eventTag, event));
                                            ok(listenerEditor.HasText(executionOrderTag, executionOrder.toString()));
                                            ok(listenerEditor.HasText(permissionsTag, permissions.join(",")));
                                            ok(listenerEditor.HasText(optionsTag, enableOptions.join(",")));
                                        });
                                });
                        });
                });
        });
}
