import { Either, left, rigth } from '@/core/either'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteDeliveryUseCaseRequest {
  deliveryId: string
}

type DeleteDeliveryUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteDeliveryUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: DeleteDeliveryUseCaseRequest): Promise<DeleteDeliveryUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    await this.deliveriesRepository.delete(delivery)

    return rigth(null)
  }
}
