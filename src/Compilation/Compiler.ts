import { ensureDir, readdir } from "fs-extra";
import { create as createFS } from "mem-fs";
import { create as createEditor } from "mem-fs-editor";
import { create as createArchive } from "tar";
import { dirname, join, resolve } from "upath";

/**
 * Provides the functionality to compile a component.
 *
 * @template T
 * The type of the item which can be compiled by this compiler.
 */
export abstract class Compiler<T>
{
    /**
     * The item to compile.
     */
    private item: T;

    /**
     * The path to save the compiled item to.
     */
    private destinationPath = "";

    /**
     * Initializes a new instance of the {@link Compiler `Compiler<T>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        this.item = item;
    }

    /**
     * Gets the item to compile.
     */
    public get Item(): T
    {
        return this.item;
    }

    /**
     * Gets or sets the path to save the compiled item to.
     */
    public get DestinationPath(): string
    {
        return this.destinationPath;
    }

    /**
     * @inheritdoc
     */
    public set DestinationPath(value: string)
    {
        this.destinationPath = value;
    }

    /**
     * Compiles the item.
     */
    public async Execute(): Promise<void>
    {
        await this.Compile();
    }

    /**
     * Compiles the item.
     */
    protected abstract Compile(): Promise<void>;

    /**
     * Copies files using `ejs`.
     *
     * @param source
     * The source to copy the files from.
     *
     * @param destination
     * The destination to copy the files to.
     *
     * @param context
     * The context to use.
     *
     * @param delimiter
     * The delimiter of the ejs-tags.
     */
    protected async CopyTemplate(source: string, destination: string, context?: Record<string, unknown>, delimiter?: string): Promise<void>
    {
        let fileStoreEditor = createEditor(createFS());
        fileStoreEditor.copyTpl(source, destination, context, { delimiter }, { globOptions: { dot: true } });

        await new Promise<void>(
            (resolve) =>
            {
                fileStoreEditor.commit(
                    [],
                    () =>
                    {
                        resolve();
                    });
            });
    }

    /**
     * Joins the paths and returns the path contained by the destination-folder.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The joined path relative to the destination-folder.
     */
    protected MakeDestinationPath(...path: string[]): string
    {
        return join(this.DestinationPath, ...path);
    }

    /**
     * Compresses a folder and saves the result to a specified file.
     *
     * @param source
     * The folder that is to be compressed.
     *
     * @param destination
     * The filename to save the compressed file to.
     */
    protected async Compress(source: string, destination: string): Promise<void>
    {
        await ensureDir(dirname(destination));

        await createArchive(
            {
                cwd: resolve(source),
                file: resolve(destination)
            },
            await readdir(source));
    }
}
