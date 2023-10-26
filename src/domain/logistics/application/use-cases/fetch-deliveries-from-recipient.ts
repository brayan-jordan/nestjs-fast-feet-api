import { Either, rigth } from '@/core/either'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { Delivery } from '../../enterprise/entities/delivery'

interface FetchDeliveriesFromRecipientUseCaseRequest {
  recipientId: string
}

type FetchDeliveriesFromRecipientUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchDeliveriesFromRecipientUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    recipientId,
  }: FetchDeliveriesFromRecipientUseCaseRequest): Promise<FetchDeliveriesFromRecipientUseCaseResponse> {
    const deliveries =
      await this.deliveriesRepository.fetchDeliveriesFromRecipient(recipientId)

    return rigth({
      deliveries,
    })
  }
}
