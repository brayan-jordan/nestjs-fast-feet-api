import { Either, left, rigth } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { HashGenerator } from '../cryptography/hash-generator'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'

interface CreateRecipientUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type CreateRecipientUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipientWithSameCpf = await this.recipientsRepository.findByCpf(cpf)

    if (recipientWithSameCpf) {
      return left(new ResourceAlreadyExistsError('Recipient', 'cpf'))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const recipient = Recipient.create({
      cpf,
      name,
      password: hashedPassword,
    })

    await this.recipientsRepository.create(recipient)

    return rigth({ recipient })
  }
}
