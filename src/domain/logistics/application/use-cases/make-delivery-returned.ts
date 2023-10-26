import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MakeDeliveryReturnedUseCaseRequest {
  deliveryId: string
}

type MakeDeliveryReturnedUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class MakeDeliveryReturnedUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: MakeDeliveryReturnedUseCaseRequest): Promise<MakeDeliveryReturnedUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    delivery.returnedAt = new Date()

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
