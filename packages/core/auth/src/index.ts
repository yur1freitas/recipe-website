export type { AuthErrorInput } from './shared/errors/AuthError'
export { AuthError } from './shared/errors/AuthError'

export type { UserPayload } from './user/models/UserPayload'

export type {
    UserInput,
    UserProps,
    UserPropsWithoutPassword
} from './user/models/User'

export { User, userSchema } from './user/models/User'

export type { AccessTokenProvider } from './user/providers/AccessTokenProvider'
export type { EncryptProvider } from './user/providers/EncryptProvider'
export type { InvalidTokenRepositoryProvider } from './user/providers/InvalidTokenRepositoryProvider'
export type { UserRepositoryProvider } from './user/providers/UserRepositoryProvider'

export type { LoginUserInput, LoginUserOutput } from './user/usecases/LoginUser'
export { LoginUser, LoginUserErrors } from './user/usecases/LoginUser'

export type {
    RegisterUserInput,
    RegisterUserOutput
} from './user/usecases/RegisterUser'
export { RegisterUser, RegisterUserErrors } from './user/usecases/RegisterUser'

export type {
    VerifyUserSessionInput,
    VerifyUserSessionOutput
} from './user/usecases/VerifyUserSession'
export {
    VerifyUserSession,
    VerifyUserSessionErrors
} from './user/usecases/VerifyUserSession'

export type {
    LogoutUserInput,
    LogoutUserOutput
} from './user/usecases/LogoutUser'

export { LogoutUser, LogoutUserErrors } from './user/usecases/LogoutUser'
