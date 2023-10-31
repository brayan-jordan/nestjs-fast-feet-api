import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Delivery as DomainDelivery } from '@/domain/logistics/enterprise/entities/delivery'
import { Delivery as PrismaDelivery, Prisma } from '@prisma/client'

export class PrismaDeliveryMapper {
  static toDomain(raw: PrismaDelivery): DomainDelivery {
    return DomainDelivery.create(
      {
        courierId: new UniqueEntityID(raw.courierId),
        recipientId: new UniqueEntityID(raw.recipientId),
        latitude: raw.latitude.toNumber(),
        longitude: raw.longitude.toNumber(),
        availableToPickupAt: raw.availableToPickupAt,
        collectedAt: raw.collectedAt,
        deliveredAt: raw.deliveredAt,
        returnedAt: raw.returnedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(
    delivery: DomainDelivery,
  ): Prisma.DeliveryUncheckedCreateInput {
    return {
      courierId: delivery.courierId.toString(),
      recipientId: delivery.recipientId.toString(),
      latitude: delivery.latitude,
      longitude: delivery.longitude,
      availableToPickupAt: delivery.availableToPickupAt,
      collectedAt: delivery.collectedAt,
      deliveredAt: delivery.deliveredAt,
      returnedAt: delivery.returnedAt,
    }
  }
}
