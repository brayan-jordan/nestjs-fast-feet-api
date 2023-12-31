import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { CourierFactory } from 'test/factories/make-courier'
import { DeliveryFactory } from 'test/factories/make-delivery'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Make Delivery Delivered (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let courierFactory: CourierFactory
  let recipientFactory: RecipientFactory
  let deliveryFactory: DeliveryFactory
  let attachmentFactory: AttachmentFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CourierFactory,
        RecipientFactory,
        DeliveryFactory,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /deliveries/:id/delivered/:attachmentId', async () => {
    const courier = await courierFactory.makePrismaCourier()

    const courierId = courier.id.toString()

    const accessToken = jwt.sign({
      sub: courierId,
      role: courier.role,
    })

    const recipient = await recipientFactory.makePrismaRecipient()

    const delivery = await deliveryFactory.makePrismaDelivery({
      courierId: courier.id,
      recipientId: recipient.id,
    })

    const deliveryId = delivery.id.toString()

    const attachment = await attachmentFactory.makePrismaAttachment()

    const attachmentId = attachment.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/deliveries/${deliveryId}/delivered/${attachmentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const deliveryOnDatabase = await prisma.delivery.findUnique({
      where: {
        id: deliveryId,
      },
    })

    expect(deliveryOnDatabase.deliveredAt).toBeTruthy()
  })
})
