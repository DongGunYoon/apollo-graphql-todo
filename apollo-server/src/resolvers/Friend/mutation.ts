import {
  Arg,
  Mutation,
  Resolver,
  Ctx,
  UseMiddleware
} from "type-graphql"
import FriendService from "@/services/friend/FriendService"
import Auth from "@/middleware/auth"
  
  @Resolver()
export default class FriendMutationResolver {

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async sendFriendRequest(
    @Arg("input", () => String) targetNickname: string,
    @Ctx() context: any) {
    return await FriendService.sendFriendRequest(context.user.nickname, targetNickname)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async rejectFriendRequest(
    @Arg("input", () => String) targetNickname: string,
    @Ctx() context: any) {
    return await FriendService.rejectFriendRequest(context.user.nickname, targetNickname)
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async removeFriend(
    @Arg("input", () => String) targetNickname: string,
    @Ctx() context: any) {
    return await FriendService.removeFriend(context.user.nickname, targetNickname)
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async acceptFriendRequest(
    @Arg("input", () => String) targetNickname: string,
    @Ctx() context: any) {
    return await FriendService.acceptFriendRequest(context.user.nickname, targetNickname)
  }
  
  @Mutation(() => Boolean)
  @UseMiddleware(Auth())
  async cancelFriendRequest(
    @Arg("input", () => String) targetNickname: string,
    @Ctx() context: any) {
    return await FriendService.cancelFriendRequest(context.user.nickname, targetNickname)
  }
}