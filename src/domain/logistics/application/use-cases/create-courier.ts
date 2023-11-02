import { Either, left, rigth } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { HashGenerator } from '../cryptography/hash-generator'
import { CouriersRepository } from '../repositories/couriers-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'

interface CreateCourierUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type CreateCourierUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    courier: Courier
  }
>

@Injectable()
export class CreateCourierUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courierWithSameCpf = await this.couriersRepository.findByCpf(cpf)

    if (courierWithSameCpf) {
      return left(new ResourceAlreadyExistsError('Courier', 'cpf'))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const courier = Courier.create({
      cpf,
      name,
      password: hashedPassword,
    })

    await this.couriersRepository.create(courier)

    return rigth({ courier })
  }
}
