import type { Generated } from 'kysely'

export interface UserSessionsTable {
    id: string
    accessToken: string
    createdAt: number
    expiresAt: number
}

export interface APIKeysTable {
    id: string
    name: string
    token: string
    createdAt: number
}

export interface CaptchaKeysTable {
    id: Generated<number>
    name: string
    siteKey: string
    secretKey: string
    createdAt: number
}

export interface CaptchaConfigsTable {
    id: Generated<number>
    siteKey: string
    count: number
    saltSize: number
    difficulty: number
}

export interface CaptchaSolutionsTable {
    id: Generated<number>
    siteKey: string
    count: number
    bucket: number
}

export interface CaptchaChallengesTable {
    id: Generated<number>
    siteKey: string
    token: string
    count: number
    saltSize: number
    difficulty: number
    createdAt: number
    expiresAt: number
}

export interface CaptchaTokensTable {
    id: Generated<number>
    siteKey: string
    token: string
    createdAt: number
    expiresAt: number
}

export interface Database {
    userSessions: UserSessionsTable
    apiKeys: APIKeysTable
    captchaKeys: CaptchaKeysTable
    captchaConfigs: CaptchaConfigsTable
    captchaChallenges: CaptchaChallengesTable
    captchaSolutions: CaptchaSolutionsTable
    captchaTokens: CaptchaTokensTable
}
