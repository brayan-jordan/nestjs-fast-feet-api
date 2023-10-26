import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { CouriersRepository } from '../repositories/couriers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CreateDeliveryUseCaseRequest {
  recipientId: string
  courierId: string
  latitude: number
  longitude: number
  availableToPickupAt?: Date | null
  collectedAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

type CreateDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class CreateDeliveryUseCase {
  constructor(
    private deliveriesRepository: DeliveriesRepository,
    private recipientsRepository: RecipientsRepository,
    private couriersRepository: CouriersRepository,
  ) {}

  async execute({
    courierId,
    latitude,
    longitude,
    recipientId,
    availableToPickupAt,
    collectedAt,
    deliveredAt,
    returnedAt,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    const delivery = Delivery.create({
      courierId: courier.id,
      latitude,
      longitude,
      recipientId: recipient.id,
      availableToPickupAt,
      collectedAt,
      deliveredAt,
      returnedAt,
    })

    await this.deliveriesRepository.create(delivery)

    return rigth({ delivery })
  }
}
