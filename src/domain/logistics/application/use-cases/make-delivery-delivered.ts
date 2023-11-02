import { Either, left, rigth } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'
import { AttachmentsRepository } from '../repositories/attachments-repository'

interface MakeDeliveryDeliveredUseCaseRequest {
  deliveryId: string
  courierId: string
  attachmentId: string
}

type MakeDeliveryDeliveredUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class MakeDeliveryDeliveredUseCase {
  constructor(
    private deliveriesRepository: DeliveriesRepository,
    private attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute({
    deliveryId,
    courierId,
    attachmentId,
  }: MakeDeliveryDeliveredUseCaseRequest): Promise<MakeDeliveryDeliveredUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    if (delivery.courierId.toString() !== courierId) {
      return left(new NotAllowedError())
    }

    const attachment = await this.attachmentsRepository.findById(attachmentId)

    if (!attachment) {
      return left(new ResourceNotFoundError())
    }

    delivery.deliveredAt = new Date()
    delivery.attachmentProopOfShippingId = attachment.id

    await this.deliveriesRepository.save(delivery)

    return rigth({ delivery })
  }
}
