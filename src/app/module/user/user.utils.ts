import { User } from './user.model'

export const lastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}
export const generateUserId = async () => {
  const curretId = (await lastUserId()) || (0).toString().padStart(5, '0')
  const incrementID = (parseInt(curretId) + 1).toString().padStart(5, '0')

  return incrementID
}
