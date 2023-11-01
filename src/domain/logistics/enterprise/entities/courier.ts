import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface CourierProps extends UserProps {}

export class Courier extends User<
  CourierProps & {
    role: 'COURIER'
  }
> {
  static create(props: CourierProps, id?: UniqueEntityID) {
    const courier = new Courier(
      {
        ...props,
        role: 'COURIER',
      },
      id,
    )

    return courier
  }
}
