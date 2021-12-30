import TodoDao from "@/databases/todoapp/dao/TodoDao"
import UserDao from "@/databases/todoapp/dao/UserDao"
import { ApolloError } from "apollo-server-express"
import { Service } from "typedi"

@Service()
export default class FriendService {
  static async getFriendList(nickname: string): Promise<string[]> {
    const user = await UserDao.findUserByNickname(nickname)
    return user?.friendList ? user.friendList : []
  }
  
  static async getSentFriendRequestList(nickname: string): Promise<string[]> {
    const user = await UserDao.findUserByNickname(nickname)
    return user?.sentFriendRequestList ? user.sentFriendRequestList : []
  }
  
  static async getReceivedFriendRequestList(nickname: string): Promise<string[]> {
    const user = await UserDao.findUserByNickname(nickname)
    return user?.receivedFriendRequestList ? user.receivedFriendRequestList : []
  }

  static async sendFriendRequest(userNickname: string, targetNickname: string): Promise<boolean> {
    if (!await this.areValidNicknames(userNickname, targetNickname)) return false

    const user = await UserDao.findUserByNickname(userNickname)
    if (user?.friendList?.includes(targetNickname)) return false
    if (user?.sentFriendRequestList?.includes(targetNickname)) return false
    if (user?.receivedFriendRequestList?.includes(targetNickname)) return false

    return await UserDao.addTargetNicknameToUserSentFriendRequestList(userNickname, targetNickname) &&
           await UserDao.addUserNicknameToTargetReceivedFriendRequestList(userNickname, targetNickname)
  }

  static async rejectFriendRequest(userNickname: string, targetNickname: string): Promise<boolean> {
    if (!await this.areValidNicknames(userNickname, targetNickname)) return false

    return await UserDao.removeTargetNicknameFromUserReceivedFriendRequestList(userNickname, targetNickname) &&
           await UserDao.removeUserNicknameFromTargetSentFriendRequestList(userNickname, targetNickname)
  }

  static async removeFriend(userNickname: string, targetNickname: string): Promise<boolean> {
    if (!await this.areValidNicknames(userNickname, targetNickname)) return false
    
    return await UserDao.removeTargetNicknameFromUserFriendList(userNickname, targetNickname) &&
    await UserDao.removeUserNicknameFromTargetFriendList(userNickname, targetNickname)
  }

  static async acceptFriendRequest(userNickname: string, targetNickname: string): Promise<boolean> {
    if (!await this.areValidNicknames(userNickname, targetNickname)) return false

    if (!(await UserDao.removeTargetNicknameFromUserReceivedFriendRequestList(userNickname, targetNickname) &&
          await UserDao.removeUserNicknameFromTargetSentFriendRequestList(userNickname, targetNickname))) return false

    return await UserDao.addTargetNicknameToUserFriendList(userNickname, targetNickname) &&
           await UserDao.addUserNicknameToTargetFriendList(userNickname, targetNickname)
  }

  static async cancelFriendRequest(userNickname: string, targetNickname: string): Promise<boolean> {
    if (!await this.areValidNicknames(userNickname, targetNickname)) return false

    return await UserDao.removeUserNicknameFromTargetReceivedFriendRequestList(userNickname, targetNickname) &&
           await UserDao.removeTargetNicknameFromUserSentFriendRequestList(userNickname, targetNickname)
  }

  static async checkFriendStatus(userNickname: string, targetNickname: string): Promise<boolean> {
    const userFriendList = this.getFriendList(userNickname)
    const targetFriendList = this.getFriendList(targetNickname)

    return (await userFriendList).includes(targetNickname) && (await targetFriendList).includes(userNickname)
  }

  static async getTodosOfFriend(userNickname: string, targetNickname: string): Promise<[string, boolean][]> {
    if (!await this.areValidNicknames(userNickname, targetNickname)) throw new ApolloError("Not Valid Nicknames")

    if (!await this.checkFriendStatus(userNickname, targetNickname)) throw new ApolloError("Not Friend of Each other")

    return TodoDao.getAllCommentsAndCompletedOfNickname(targetNickname)
  }

  static async areValidNicknames(userNickname: string, targetNickname: string): Promise<boolean> {
    if (userNickname === targetNickname) return false

    return await UserDao.isExistingNickname(userNickname) &&
           await UserDao.isExistingNickname(targetNickname)
  }

  static async getUsersNickname(keyword: string, userNickname: string): Promise<string[]> {
    const friendRelatedList = [userNickname, ...await this.getFriendList(userNickname), ...await this.getReceivedFriendRequestList(userNickname), ...await this.getSentFriendRequestList(userNickname)]
    
    const matchingNicknames = await UserDao.getMatchingNicknames(keyword)

    return matchingNicknames.filter(matchingNickname => !friendRelatedList.includes(matchingNickname))
  }
}
