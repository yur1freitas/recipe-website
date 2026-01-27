import type {
    KyselyPlugin,
    PluginTransformQueryArgs,
    PluginTransformResultArgs,
    QueryResult,
    RootOperationNode,
    UnknownRow
} from 'kysely'

import { Time } from '@utils/time'

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
