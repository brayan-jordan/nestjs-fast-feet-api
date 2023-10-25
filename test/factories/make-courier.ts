import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Courier,
  CourierProps,
} from '@/domain/logistics/enterprise/entities/courier'
import { faker } from '@faker-js/faker'

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityID,
) {
  const courier = Courier.create(
    {
      cpf: faker.string.sample(14),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return courier
}
