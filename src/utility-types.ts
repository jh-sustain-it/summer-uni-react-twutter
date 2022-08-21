export type ExtractNodeFromConnection<
  Connection extends {
    readonly edges: ReadonlyArray<{ readonly node: unknown } | null>;
  } | null
> = NonNullable<NonNullable<Connection>["edges"][number]>["node"];
