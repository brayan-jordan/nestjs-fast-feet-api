import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Delivery,
  DeliveryProps,
} from '@/domain/logistics/enterprise/entities/delivery'
import { faker } from '@faker-js/faker'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID,
) {
  const delivery = Delivery.create(
    {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      recipientId: new UniqueEntityID(),
      courierId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return delivery
}
