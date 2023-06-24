import config from '../../../config'
import ApiError from '../../../errors/Apierror'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id
  if (!user.password) {
    user.password = config.default_password as string
  }
  const createdUser = await User.create(user)
  if (!createUser) {
    throw new ApiError(400, 'failed to create user')
  }
  return createdUser
}
export default {
  createUser,
}
