import { Dao } from "../../common/decorators"
import { UserModel } from "../models/user"
import LogInInput from "../../../resolvers/User/userInput/LogInInput"
import User from "@/entity/User"

@Dao(UserModel)
class UserDao {
  async isValidId(userId: string): Promise<boolean> {
    return !await UserModel.exists({"userId": userId})
  }

  async isValidNickname(userNickname: string): Promise<boolean> {
    return !await UserModel.exists({"nickname": userNickname})
  }

  async isExistingNickname(nickname: string): Promise<boolean> {
    return await UserModel.exists({"nickname": nickname})
  }

  async getAllNicknames(): Promise<string[]> {
    const usersNickname = await UserModel.find({},{
      _id:0,
      nickname: 1
    })

    return usersNickname.map(res => res.nickname)
  }

  async getMatchingNicknames(keyword: string): Promise<string[]> {
    const reg = new RegExp(keyword, "i")
    const matchingNicknames = await UserModel.find({nickname: {$regex: reg}}, {
      _id: 0,
      nickname: 1
    })

    return matchingNicknames.map(res => res.nickname)
  }

  async matchedUser(userId: string, userPw: string): Promise<User | null>{
    return await UserModel.findOne({$and : [{"userId": userId}, {"userPw": userPw}]})
  }

  async addUser(input: LogInInput): Promise<void> {
    await new UserModel(input).save()
  }

  async findUserById(userId: string): Promise<User | null> {
    return await UserModel.findOne({"userId": userId})
  }

  async findUserByNickname(userNickname: string): Promise<User | null> {
    return await UserModel.findOne({"nickname": userNickname})
  }

  async addTargetNicknameToUserSentFriendRequestList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": userNickname},
      {$push: { sentFriendRequestList: targetNickname }})).modifiedCount
  }

  async addUserNicknameToTargetReceivedFriendRequestList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": targetNickname},
      {$push: {receivedFriendRequestList: userNickname}})).modifiedCount
  }

  async removeTargetNicknameFromUserReceivedFriendRequestList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": userNickname},
      {$pull: {receivedFriendRequestList: targetNickname}})).modifiedCount
  }

  async removeUserNicknameFromTargetSentFriendRequestList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": targetNickname},
      {$pull: {sentFriendRequestList: userNickname}})).modifiedCount
  }

  async removeTargetNicknameFromUserFriendList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": userNickname},
      {$pull: {friendList: targetNickname}})).modifiedCount
  }

  async removeUserNicknameFromTargetFriendList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": targetNickname},
      {$pull: {friendList: userNickname}})).modifiedCount
  }

  async addTargetNicknameToUserFriendList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": userNickname},
      {$push:{friendList: targetNickname}})).modifiedCount
  }

  async addUserNicknameToTargetFriendList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": targetNickname},
      {$push: {friendList: userNickname}})).modifiedCount
  }

  async removeUserNicknameFromTargetReceivedFriendRequestList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": targetNickname},
      {$pull: {receivedFriendRequestList: userNickname}})).modifiedCount
  }

  async removeTargetNicknameFromUserSentFriendRequestList(userNickname: string, targetNickname: string): Promise<boolean> {
    return !!(await UserModel.updateOne({"nickname": userNickname},
      {$pull: {sentFriendRequestList: targetNickname}})).modifiedCount
  }
}

export default new UserDao()