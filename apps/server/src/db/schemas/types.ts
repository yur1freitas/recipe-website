import { customType } from 'drizzle-orm/pg-core'
import { Time } from '@utils/time'
import { Numeric } from '@utils/numeric'

export const pgTime = customType<{
    data: Time
    driverData: number
    notNull: true
}>({
    dataType(): string {
        return 'integer'
    },
    toDriver(value) {
        return value.toMilliseconds()
    },
    fromDriver(value) {
        return Time.fromMilliseconds(value)
    }
})

export const pgNumeric = customType<{
    data: Numeric
    driverData: string
    notNull: true
}>({
    dataType(): string {
        return 'varchar(120)'
    },
    toDriver(value) {
        return value.toString()
    },
    fromDriver(value) {
        return new Numeric(value)
    }
})
