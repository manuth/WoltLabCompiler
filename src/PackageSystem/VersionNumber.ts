import { VersionKind } from "./VersionKind.js";

/**
 * Represents a version number.
 */
export type VersionNumber = `${number}.${number}.${number}${` ${VersionKind} ${number}` | ""}`;
