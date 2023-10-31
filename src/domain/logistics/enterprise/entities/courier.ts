import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface CourierProps extends UserProps {}

export class Courier extends User<CourierProps> {
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
