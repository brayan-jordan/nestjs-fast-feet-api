import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CourierFactory } from 'test/factories/make-courier'
import { DeliveryFactory } from 'test/factories/make-delivery'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Fetch Deliveries From Courier (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let courierFactory: CourierFactory
  let recipientFactory: RecipientFactory
  let deliveryFactory: DeliveryFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CourierFactory, RecipientFactory, DeliveryFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)

    await app.init()
  })

  test('[GET] /deliveries/nearby', async () => {
    const courier = await courierFactory.makePrismaCourier()

    const courierId = courier.id.toString()

    const accessToken = jwt.sign({
      sub: courierId,
      role: courier.role,
    })

    const recipient = await recipientFactory.makePrismaRecipient()

    const delivery1 = await deliveryFactory.makePrismaDelivery({
      courierId: courier.id,
      recipientId: recipient.id,
      latitude: -27.6554539,
      longitude: -27.6554539,
    })

    await deliveryFactory.makePrismaDelivery({
      courierId: courier.id,
      recipientId: recipient.id,
      latitude: -28.6554539,
      longitude: -28.6554539,
    })

    const response = await request(app.getHttpServer())
      .get(`/deliveries/nearby`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        latitude: -27.6554539,
        longitude: -27.6554539,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.deliveries).toEqual([
      expect.objectContaining({
        id: delivery1.id.toString(),
      }),
    ])
  })
})
