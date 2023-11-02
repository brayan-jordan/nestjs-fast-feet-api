import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'
import { DeliveryFactory } from 'test/factories/make-delivery'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Edit Delivery (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let courierFactory: CourierFactory
  let recipientFactory: RecipientFactory
  let adminFactory: AdminFactory
  let deliveryFactory: DeliveryFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CourierFactory,
        RecipientFactory,
        AdminFactory,
        DeliveryFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    adminFactory = moduleRef.get(AdminFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /deliveries/:id', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const adminId = admin.id.toString()

    const accessToken = jwt.sign({
      sub: adminId,
      role: admin.role,
    })

    const courier = await courierFactory.makePrismaCourier()

    const recipient = await recipientFactory.makePrismaRecipient()

    const delivery = await deliveryFactory.makePrismaDelivery({
      courierId: courier.id,
      recipientId: recipient.id,
      latitude: -27.6554539,
      longitude: -26.6554539,
    })

    const deliveryId = delivery.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/deliveries/${deliveryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        latitude: -28.6554539,
        longitude: -29.6554539,
      })

    expect(response.statusCode).toBe(204)

    const deliveryOnDatabase = await prisma.delivery.findUnique({
      where: {
        id: deliveryId,
      },
    })

    expect(deliveryOnDatabase.latitude.toNumber()).toBe(-28.6554539)
    expect(deliveryOnDatabase.longitude.toNumber()).toBe(-29.6554539)
  })
})
