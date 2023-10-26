import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CourierProps {
  name: string
  cpf: string
  password: string
}

export class Courier extends Entity<CourierProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
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

  static create(props: CourierProps, id?: UniqueEntityID) {
    const courier = new Courier(
      {
        ...props,
      },
      id,
    )

    return courier
  }
}
