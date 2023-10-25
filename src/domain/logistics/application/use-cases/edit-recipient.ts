import { Either, left, rigth } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditRecipientUseCaseRequest {
  recipientId: string
  name: string
  cpf: string
}

type EditRecipientUseCaseResponse = Either<
  ResourceAlreadyExistsError | ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

export class EditRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    recipientId,
    name,
    cpf,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    if (recipient.cpf !== cpf) {
      const recipientWithSameCpf =
        await this.recipientsRepository.findByCpf(cpf)

      if (recipientWithSameCpf) {
        return left(new ResourceAlreadyExistsError('Recipient', 'cpf'))
      }
    }

    recipient.name = name
    recipient.cpf = cpf

    await this.recipientsRepository.save(recipient)

    return rigth({ recipient })
  }
}
