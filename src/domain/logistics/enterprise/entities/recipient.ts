import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface RecipientProps extends UserProps {}

export class Recipient extends User<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
      },
      id,
    )

    return recipient
  }
}
