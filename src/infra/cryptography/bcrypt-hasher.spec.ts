import { BcryptHasher } from './bcrypt-hasher'

test('teste', async () => {
  const teste = new BcryptHasher()

  const hash = await teste.hash('123456')

  console.log(hash)
})
