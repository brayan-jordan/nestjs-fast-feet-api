import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface AdminProps extends UserProps {}

export class Admin extends User<
  AdminProps & {
    role: 'ADMIN'
  }
> {
  static create(props: AdminProps, id?: UniqueEntityID) {
    const admin = new Admin(
      {
        ...props,
        role: 'ADMIN',
      },
      id,
    )

    return admin
  }
}
