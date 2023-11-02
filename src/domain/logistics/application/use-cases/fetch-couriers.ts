import { Either, rigth } from '@/core/either'
import { CouriersRepository } from '../repositories/couriers-repository'
import { Injectable } from '@nestjs/common'
import { Courier } from '../../enterprise/entities/courier'

type FetchCouriersUseCaseResponse = Either<
  null,
  {
    couriers: Courier[]
  }
>

@Injectable()
export class FetchCouriersUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute(): Promise<FetchCouriersUseCaseResponse> {
    const couriers = await this.couriersRepository.findMany()

    return rigth({
      couriers,
    })
  }
}
