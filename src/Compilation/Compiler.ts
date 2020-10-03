import Path = require("path");
import FileSystem = require("fs-extra");
import MemoryFileStore = require("mem-fs");
import MemoryFileStoreEditor = require("mem-fs-editor");
import Tar = require("tar");

/**
 * Provides the functionality to compile a component.
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
     * Initializes a new instance of the `Compiler<T>` class.
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
    protected abstract async Compile(): Promise<void>;

    /**
     * Copies files using `EJS`.
     *
     * @param source
     * The source to copy the files from.
     *
     * @param destination
     * The destination to copy the files to.
     *
     * @param context
     * The context to use.
     */
    protected async CopyTemplate(source: string, destination: string, context?: Record<string, unknown>): Promise<void>
    {
        let fileStoreEditor = MemoryFileStoreEditor.create(MemoryFileStore.create());
        fileStoreEditor.copyTpl(source, destination, context, {}, { globOptions: { dot: true } });

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
        return Path.join(this.DestinationPath, ...path);
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
        await FileSystem.ensureDir(Path.dirname(destination));
        await Tar.create(
            {
                cwd: Path.resolve(source),
                file: Path.resolve(destination)
            },
            await FileSystem.readdir(source));
    }
}
