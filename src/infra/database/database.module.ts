import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CouriersRepository } from '@/domain/logistics/application/repositories/couriers-repository'
import { DeliveriesRepository } from '@/domain/logistics/application/repositories/deliveries-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { RecipientsRepository } from '@/domain/logistics/application/repositories/recipients-repository'
import { PrismaCouriersRepository } from './prisma/repositories/prisma-couriers-repository'
import { PrismaRecipientsRepository } from './prisma/repositories/prisma-recipients-repository'
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository'
import { PrismaDeliveriesRepository } from './prisma/repositories/prisma-deliveries-repository'
import { UsersRepository } from '@/domain/logistics/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: CouriersRepository,
      useClass: PrismaCouriersRepository,
    },
    {
      provide: DeliveriesRepository,
      useClass: PrismaDeliveriesRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: RecipientsRepository,
      useClass: PrismaRecipientsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    PrismaService,
    CouriersRepository,
    DeliveriesRepository,
    NotificationsRepository,
    RecipientsRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
