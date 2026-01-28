import type {
    TableNode,
    QueryId,
    KyselyPlugin,
    PluginTransformQueryArgs,
    PluginTransformResultArgs,
    QueryResult,
    RootOperationNode,
    UnknownRow
} from 'kysely'

import { Time } from '@utils/time'
import { Numeric } from '@utils/numeric'

export interface TimePluginOptions {
    columns?: string[]
}

export class TimePlugin implements KyselyPlugin {
    private $columns: Set<string>

    constructor(options: TimePluginOptions = {}) {
        const { columns } = options

        this.$columns = new Set(columns)
    }

    transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
        return args.node
    }

    async transformResult(
        args: PluginTransformResultArgs
    ): Promise<QueryResult<UnknownRow>> {
        if (args.result.rows && Array.isArray(args.result.rows)) {
            const rows = args.result.rows.map((row) => {
                const updatedRow = { ...row }

                for (const column of this.$columns) {
                    if (Object.hasOwn(row, column)) {
                        const value = updatedRow[column]

                        if (typeof value === 'number') {
                            updatedRow[column] = new Time({ ms: value })
                        }
                    }
                }

                return updatedRow
            })

            return {
                ...args.result,
                rows
            }
        }

        return args.result
    }
}

export interface NumericPluginOptions {
    identifiers: { table: string; columns: string[] }[]
}

export class NumericPlugin implements KyselyPlugin {
    private $data: WeakMap<QueryId, string[]> = new WeakMap()

    private $identifiers: Map<string, string[]>

    constructor({ identifiers }: NumericPluginOptions) {
        const entries: [string, string[]][] = identifiers.map((item) => [
            item.table,
            item.columns
        ])

        this.$identifiers = new Map(entries)
    }

    transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
        if (args.node.kind === 'SelectQueryNode' && args.node.from) {
            for (const fromNode of args.node.from.froms) {
                if (fromNode.kind === 'TableNode') {
                    const tableNode = fromNode as TableNode
                    const tableName = tableNode.table.identifier.name

                    if (this.$identifiers.has(tableName)) {
                        const columns = this.$identifiers.get(tableName)!

                        this.$data.set(args.queryId, columns)
                    }
                }
            }
        }

        return args.node
    }

    async transformResult(
        args: PluginTransformResultArgs
    ): Promise<QueryResult<UnknownRow>> {
        const columns = this.$data.get(args.queryId)

        if (columns && args.result.rows && Array.isArray(args.result.rows)) {
            const rows = args.result.rows.map((row) => {
                const updatedRow = { ...row }

                for (const column of columns) {
                    if (Object.hasOwn(row, column)) {
                        const value = updatedRow[column]

                        if (typeof value === 'string') {
                            updatedRow[column] = this.parseValue(value)
                        }
                    }
                }

                return updatedRow
            })

            return {
                ...args.result,
                rows
            }
        }

        return args.result
    }

    protected parseValue(value: string): Numeric {
        const cleanValue = value.replace(/"+/g, '')
        return new Numeric(cleanValue)
    }
}
