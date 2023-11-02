import { Either, rigth } from '@/core/either'
import { DeliveriesRepository } from '../repositories/deliveries-repository'
import { Delivery } from '../../enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'

type FetchDeliveriesUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

@Injectable()
export class FetchDeliveriesUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute(): Promise<FetchDeliveriesUseCaseResponse> {
    const deliveries = await this.deliveriesRepository.findMany()

    return rigth({
      deliveries,
    })
  }
}
