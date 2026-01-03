import type { EntityProps, EntityInput } from '@core/shared'
import { Email, EncryptedPassword, Entity, Username } from '@core/shared'

export interface UserInput extends EntityInput {
    name: string
    email: string
    password?: string
}

export type UserProps = EntityProps<UserInput>
export type UserPropsWithoutPassword = Omit<UserProps, 'password'>

export class User extends Entity<UserInput> {
    readonly name: Username
    readonly email: Email
    readonly password?: EncryptedPassword

    constructor(input: UserInput) {
        super(input)

        const { name, email, password } = input

        this.name = new Username(name)
        this.email = new Email(email)

        if (password) {
            this.password = new EncryptedPassword(password)
        }
    }

    get props(): UserProps {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            password: this.password?.value
        }
    }

    get propsWithoutPassword(): UserPropsWithoutPassword {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value
        }
    }
}
