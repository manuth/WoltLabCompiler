import { CollectionTests } from "./Collections/index.test.js";
import { CompilationTests } from "./Compilation/index.test.js";
import { CustomizationTests } from "./Customization/index.test.js";
import { GlobalizationTests } from "./Globalization/index.test.js";
import { NodeSystemTests } from "./NodeSystem/index.test.js";
import { OptionTests } from "./Options/index.test.js";
import { PackageSystemTests } from "./PackageSystem/index.test.js";
import { SerializationTests } from "./Serialization/index.test.js";
import { TaskTests } from "./Tasks/index.test.js";

suite(
    "WoltLabCompiler",
    () =>
    {
        CollectionTests();
        CompilationTests();
        GlobalizationTests();
        NodeSystemTests();
        OptionTests();
        PackageSystemTests();
        SerializationTests();
        TaskTests();
        CustomizationTests();
    });
