import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { ChangeRecipientPasswordUseCase } from './change-recipient-password'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let fakeHasher: FakeHasher
let sut: ChangeRecipientPasswordUseCase

describe('Change recipient password use case', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    fakeHasher = new FakeHasher()
    sut = new ChangeRecipientPasswordUseCase(
      inMemoryRecipientsRepository,
      fakeHasher,
    )
  })

  it('should be able to change password of an recipient', async () => {
    const recipient = makeRecipient({
      password: '1234',
    })

    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      password: '123456',
    })

    const newPasswordHashed = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryRecipientsRepository.items[0].password).toEqual(
      newPasswordHashed,
    )
  })
})
