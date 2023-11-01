import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface RecipientProps extends UserProps {}

export class Recipient extends User<
  RecipientProps & {
    role: 'RECIPIENT'
  }
> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
        role: 'RECIPIENT',
      },
      id,
    )

    return recipient
  }
}
