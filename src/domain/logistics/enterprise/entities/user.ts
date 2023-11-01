import { Entity } from '@/core/entities/entity'

export interface UserProps {
  name: string
  cpf: string
  password: string
}

export interface RoleProps {
  role: 'ADMIN' | 'COURIER' | 'RECIPIENT'
}

export abstract class User<
  Props extends UserProps & RoleProps,
> extends Entity<Props> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  set name(name: string) {
    this.props.name = name
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  set password(password: string) {
    this.props.password = password
  }
}
