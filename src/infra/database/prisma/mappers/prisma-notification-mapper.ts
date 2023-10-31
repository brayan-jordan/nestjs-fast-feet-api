import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification as DomainNotification } from '@/domain/notification/enterprise/entities/notification'
import { Notification as PrismaNotification, Prisma } from '@prisma/client'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): DomainNotification {
    return DomainNotification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(
    notification: DomainNotification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      title: notification.title,
      content: notification.content,
      recipientId: notification.recipientId.toString(),
      createdAt: notification.createdAt,
    }
  }
}
