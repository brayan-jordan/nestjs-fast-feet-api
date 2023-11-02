import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface MakeDeliveryCollectedUseCaseRequest {
  deliveryId: string
  courierId: string
}

type MakeDeliveryCollectedUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class MakeDeliveryCollectedUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
    courierId,
  }: MakeDeliveryCollectedUseCaseRequest): Promise<MakeDeliveryCollectedUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    if (delivery.courierId.toString() !== courierId) {
      return left(new NotAllowedError())
    }

    delivery.collectedAt = new Date()

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
