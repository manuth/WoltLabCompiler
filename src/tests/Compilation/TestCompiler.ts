import { Compiler } from "../../Compilation/Compiler";

/**
 * Provides a test-implementation of the {@link Compiler `Compiler`} class.
 */
export class TestCompiler extends Compiler<unknown>
{
    /**
     * @inheritdoc
     */
    public async Compile(): Promise<void>
    { }

    /**
     * @inheritdoc
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
    public override async CopyTemplate(source: string, destination: string, context: Record<string, unknown>, delimiter?: string): Promise<void>
    {
        return super.CopyTemplate(source, destination, context, delimiter);
    }

    /**
     * @inheritdoc
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The joined path relative to the destination-folder.
     */
    public override MakeDestinationPath(...path: string[]): string
    {
        return super.MakeDestinationPath(...path);
    }

    /**
     * @inheritdoc
     *
     * @param source
     * The folder that is to be compressed.
     *
     * @param destination
     * The filename to save the compressed file to.
     */
    public override async Compress(source: string, destination: string): Promise<void>
    {
        return super.Compress(source, destination);
    }
}
