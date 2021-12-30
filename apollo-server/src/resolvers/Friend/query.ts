import Auth from "@/middleware/auth"
import FriendService from "@/services/friend/FriendService"
import {
  Arg,
  Ctx,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql"
  
  @Resolver()
export default class FriendQueryResolver {

  @UseMiddleware(Auth())
  @Query(() => [String])
  async getFriendList(
  @Ctx() context: any) {
    return await FriendService.getFriendList(context.user.nickname)
  }

  @UseMiddleware(Auth())
  @Query(() => [String])
  async getSentFriendRequestList(
  @Ctx() context: any) {
    return await FriendService.getSentFriendRequestList(context.user.nickname)
  }

  @UseMiddleware(Auth())
  @Query(() => [String])
  async getReceivedFriendRequestList(
  @Ctx() context: any) {
    return await FriendService.getReceivedFriendRequestList(context.user.nickname)
  }

  @UseMiddleware(Auth())
  @Query(() => [String])
  async getUsersNickname(
  @Arg("input", () => String) keyword: string,
  @Ctx() context: any) {
    return await FriendService.getUsersNickname(keyword, context.user.nickname)
  }

  @UseMiddleware(Auth())
  @Query(() => [[String, Boolean]])
  async getTodosOfFriend(
  @Arg("input", () => String) targetNickname: string,
  @Ctx() context: any) {
    return await FriendService.getTodosOfFriend(context.user.nickname, targetNickname)
  }
}