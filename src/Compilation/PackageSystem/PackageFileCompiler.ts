import { Package } from "../../PackageSystem/Package";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile package-files.
 */
export class PackageFileCompiler extends WoltLabXMLCompiler<Package>
{
    /**
     * Initializes a new instance of the {@link PackageFileCompiler `PackageFileCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Package)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected override get TagName(): string
    {
        return "package";
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/package.xsd";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    protected override CreateDocument(): Document
    {
        let document = super.CreateDocument();
        let editor = new XMLEditor(document.documentElement);
        let packageNode = editor.CreateElement("packageinformation");
        let authorNode = editor.CreateElement("authorinformation");
        let compatibilityNode = editor.CreateElement("compatibility");
        let apiNode = compatibilityNode.CreateElement("api");
        compatibilityNode.Add(apiNode);
        editor.SetAttribute("name", this.Item.Identifier);
        apiNode.SetAttribute("version", "2018");
        editor.Add(packageNode);
        editor.Add(authorNode);

        for (let locale of this.Item.DisplayName.GetLocales())
        {
            let displayNameElement = packageNode.CreateTextElement("packagename", this.Item.DisplayName.Data.get(locale));
            packageNode.Add(displayNameElement);

            if (locale !== "inv")
            {
                displayNameElement.SetAttribute("languagecode", locale);
            }
        }

        for (let locale of this.Item.Description.GetLocales())
        {
            let description = packageNode.CreateTextElement("packagedescription", this.Item.Description.Data.get(locale));
            packageNode.Add(description);

            if (locale !== "inv")
            {
                description.SetAttribute("languagecode", locale);
            }
        }

        packageNode.Add(packageNode.CreateTextElement("version", this.Item.Version));

        packageNode.Add(
            packageNode.CreateTextElement(
                "date",
                this.Item.CreationDate.getFullYear().toString() + "-" +
                (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                this.Item.CreationDate.getDate().toString().padStart(2, "0")));

        if (this.Item.Author.Name)
        {
            authorNode.Add(authorNode.CreateTextElement("author", this.Item.Author.Name));
        }

        if (this.Item.Author.URL)
        {
            authorNode.Add(authorNode.CreateTextElement("authorurl", this.Item.Author.URL));
        }

        if (this.Item.RequiredPackages.length > 0)
        {
            let requiredPackagesNode = editor.CreateElement("requiredpackages");
            editor.Add(requiredPackagesNode);

            for (let requiredPackage of this.Item.RequiredPackages)
            {
                let requiredPackageNode = requiredPackagesNode.CreateTextElement("requiredpackage", requiredPackage.Identifier);
                requiredPackagesNode.Add(requiredPackageNode);
                requiredPackageNode.SetAttribute("minversion", requiredPackage.MinVersion);

                if (requiredPackage.FileName)
                {
                    requiredPackageNode.SetAttribute("file", requiredPackage.FileName);
                }
            }
        }

        if (this.Item.ConflictingPackages.length > 0)
        {
            let conflictingPackagesNode = editor.CreateElement("excludedpackages");
            editor.Add(conflictingPackagesNode);

            for (let conflictingPackage of this.Item.ConflictingPackages)
            {
                let conflictingPackageNode = conflictingPackagesNode.CreateTextElement("excludedpackage", conflictingPackage.Identifier);
                conflictingPackagesNode.Add(conflictingPackageNode);
                conflictingPackageNode.SetAttribute("version", conflictingPackage.Version);
            }
        }

        if (this.Item.OptionalPackages.length > 0)
        {
            let optionalPackagesNode = editor.CreateElement("optionalpackages");
            editor.Add(optionalPackagesNode);

            for (let optionalPackage of this.Item.OptionalPackages)
            {
                let optionalPackageNode = optionalPackagesNode.CreateTextElement("optionalpackage", optionalPackage.Identifier);
                optionalPackagesNode.Add(optionalPackageNode);
                optionalPackageNode.SetAttribute("file", optionalPackage.FileName);
            }
        }

        editor.Add(compatibilityNode);
        editor.Add(this.Item.InstallSet.Serialize());

        for (let instructionSet of this.Item.UpdateSets)
        {
            editor.Add(instructionSet.Serialize());
        }

        return document;
    }
}
