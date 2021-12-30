<template>
<div>
  <div class="friend-page">
  <div class="welcome-title">Welcome {{ nickname }}!</div>
    <div class="friend-wrapper">
      <div class="userSearch">
        <label for="searchInput"></label>
        <input v-model="searchInput" placeholder="Search User By Nickname!" autocomplete="off" @keyup="getMatchedNicknames"  id="searchInput" type="text">
      </div>
      <ul class="searchedUsers common-list">
        <li class="common-list-item" :key="id" v-for="(nickname, id) in matchedNicknames">
          <label class="common-label" for="">{{nickname}}</label>
          <button @click="sendFriendRequest(nickname)" class="single-button">➕</button>
        </li>
      </ul>
      <div class="friend-list-wrapper" v-if="friendList.length">
        <h2 class="common-list-title">친구 목록 👬</h2>
        <ul class="freind-list common-list">
          <li class="common-list-item" :key="id" v-for="(nickname, id) in friendList">
            <label class="common-label" for="">{{nickname}}</label>
            <div class="double-buttons">
              <button @click="getTodosOfFriend(nickname)" class="double-button-item">✈️</button>
              <button @click="removeFriend(nickname)" class="double-button-item">❌</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="friend-list-wrapper" v-if="sentFriendRequestList.length">
        <h2 class="common-list-title">친구 신청 목록 ✉️</h2>
        <ul class="freind-list common-list">
          <li class="common-list-item" :key="id" v-for="(nickname, id) in sentFriendRequestList">
            <label class="common-label" for="">{{nickname}}</label>
            <button @click="cancelFriendRequest(nickname)" class="single-button">❌</button>
          </li>
        </ul>
      </div>
      <div class="friend-list-wrapper" v-if="receivedFriendRequestList.length">
        <h2 class="common-list-title">친구 수신 목록 📩</h2>
        <ul class="freind-list common-list">
          <li class="common-list-item" :key="id" v-for="(nickname, id) in receivedFriendRequestList">
            <label class="common-label" for="">{{nickname}}</label>
            <div class="double-buttons">
              <button @click="acceptFriendRequest(nickname)" class="double-button-item">🤝</button>
              <button @click="rejectFriendRequest(nickname)" class="double-button-item">❌</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 친구 페이지라고 가정 -->
  <div class="friend-todo-page" :class="showType ? 'show' : 'hide'" v-if="todosOfFriend.length">
    <div class="friend-todo-header">
      <span @click="backToFriendPage()" class="friend-todo-back">🔙BACK To Friend Page</span>      
    </div>
    <div class="welcome-title">Watching {{ nicknameOfFriend }}'s Todo!</div>
    <ul class="friend-todo-list">
      <li :key="id" v-for="(todo, id) in todosOfFriend">
        <input :checked="todo[1]==='true' ? true : false " class="check-box" type="checkbox"/>
        <label>{{ todo[0] }}</label>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { GraphQLClient, gql } from "graphql-request";

export default {
  name: "Friend",
  data() {
    return {
      matchedNicknames: [],
      searchInput: '',
      endpoint: '',
      nickname: "",
      header: '',
      token: '',
      friendList: [],
      sentFriendRequestList: [],
      receivedFriendRequestList: [],
      todosOfFriend: [],
      nicknameOfFriend: "",
      showType: false
    };
  },
  async created() {    
    this.endpoint = `http://localhost:3000/friend`;
    this.nickname = localStorage.getItem('nickname');
    this.token = localStorage.getItem('token');
    this.header = {headers: {"Authorization": this.token}}

    const graphQLClient = new GraphQLClient(this.endpoint, this.header);

    try { 
      await graphQLClient.request(gql`query{getFriendList}`).then(res => this.friendList = res.getFriendList)
    }
    catch (err) {
      this.unauthorized()
    }
    await graphQLClient.request(gql`query{getSentFriendRequestList}`).then(res => this.sentFriendRequestList = res.getSentFriendRequestList)
    await graphQLClient.request(gql`query{getReceivedFriendRequestList}`).then(res => this.receivedFriendRequestList = res.getReceivedFriendRequestList)
  },
    methods: {
        async getMatchedNicknames() {
            if (this.searchInput === '') {
            this.matchedNicknames = []
            return
            }
            const graphQLClient = new GraphQLClient(this.endpoint, this.header);
            this.matchedNicknames = await graphQLClient.request(
            gql`query {
                getUsersNickname(input: "${this.searchInput}")
                }`
            ).then(res => res.getUsersNickname)
        },

        async sendFriendRequest(targetNickname) {
          const graphQLClient = new GraphQLClient(this.endpoint, this.header);
          
          const result = await graphQLClient.request(
            gql`mutation {
              sendFriendRequest(input: "${targetNickname}")
            }`
          ).then(res => res.sendFriendRequest)

          this.sentFriendRequestList.push(targetNickname)
          this.matchedNicknames = this.matchedNicknames.filter(nickname => nickname !== targetNickname)

          if (!result) alert("Already Requested or a Friend!")
        },

        async removeFriend(targetNickname) {
          const graphQLClient = new GraphQLClient(this.endpoint, this.header);
          
          const result = await graphQLClient.request(
            gql`mutation {
              removeFriend(input: "${targetNickname}")
            }`
          ).then(res => res.removeFriend)

          this.friendList = this.friendList.filter(nickname => nickname !== targetNickname)

          if (!result) alert("Already removed")
        },

        async cancelFriendRequest(targetNickname) {
          const graphQLClient = new GraphQLClient(this.endpoint, this.header);
          
          const result = await graphQLClient.request(
            gql`mutation {
              cancelFriendRequest(input: "${targetNickname}")
            }`
          ).then(res => res.cancelFriendRequest)

          this.sentFriendRequestList = this.sentFriendRequestList.filter(nickname => nickname !== targetNickname)

          if (!result) alert("Already removed")
        },

        async acceptFriendRequest(targetNickname) {
          const graphQLClient = new GraphQLClient(this.endpoint, this.header);
          
          const result = await graphQLClient.request(
            gql`mutation {
              acceptFriendRequest(input: "${targetNickname}")
            }`
          ).then(res => res.acceptFriendRequest)

          this.receivedFriendRequestList = this.receivedFriendRequestList.filter(nickname => nickname !== targetNickname)
          this.friendList.push(targetNickname)

          if (!result) alert("Already accpeted")
        },

        async rejectFriendRequest(targetNickname) {
          const graphQLClient = new GraphQLClient(this.endpoint, this.header);
          
          const result = await graphQLClient.request(
            gql`mutation {
              rejectFriendRequest(input: "${targetNickname}")
            }`
          ).then(res => res.rejectFriendRequest)

          this.receivedFriendRequestList = this.receivedFriendRequestList.filter(nickname => nickname !== targetNickname)

          if (!result) alert("Already removed")
        },

        async getTodosOfFriend(targetNickname) {
          const graphQLClient = new GraphQLClient(this.endpoint, this.header);

          await graphQLClient.request(
            gql`query {
              getTodosOfFriend(input: "${targetNickname}")
            }`
          ).then(res => this.todosOfFriend = res.getTodosOfFriend)

          if (!this.todosOfFriend.length) return alert(`${targetNickname} has empty todo list!`)
          this.showType = true
          this.nicknameOfFriend = targetNickname
        },

        backToFriendPage() {
          this.showType = false
          setTimeout(()=> {
            this.nicknameOfFriend = ''
            this.todosOfFriend = []
          }, 1500)
        },
        
        unauthorized() {
          localStorage.clear();
          this.$router.push({path: 'login'})
          alert("다시 로그인 부탁드립니다.")
        }
    }
}
</script>

<style scoped>
.friend-page {
  min-width: 730px;
  animation: slideRightFromLeft 2s;
}

.welcome-title {
  width: 60%;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin: auto;
  margin-bottom: 1em;
}

.friend-wrapper {
    width: 60%;
    margin: 10px auto;
}

.common-list {
  max-height: 280px;
  width: 100%;
  margin: auto;
  overflow: hidden;
  overflow-y: scroll;
}

#searchInput {
  font-family: 'orbitron';
  font-size: 24px;
  width: 100%;
  padding: 10px 10px 10px 70px;
  border-radius: 10px;
  border: 0.1px solid grey;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgb(0 0 0 / 20%);
  margin-bottom: 1em;
}

.common-list-item {
  list-style: none;
  position: relative;
  height: 40px;
  width: 100%;
  margin: auto;
  margin-bottom: 1em;
  border: 1px solid grey;
  border-radius: 20px;
  box-shadow: inset -4px -2px 2px rgb(0 0 0 / 20%);
}

.common-label {
  font-family: 'orbitron';
  word-break: break-all;
  font-size: 24px;
  font-weight: 400;
  padding-left: 70px;
  display: block;
  line-height: 1.5;
}

.friend-list-wrapper {
  width: 100%;;
}

.common-list-title {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin: 15px;
}

.single-button {
  position: absolute;
  top: 3px;
  right: 15px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  font-size: 20px;
  border: none;
  cursor: pointer;
}

.double-buttons {
  position: absolute;
  top: 3px;
  right: 15px;
}
.double-button-item{
  background-color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* page of Friends TODO */
@keyframes slideLeftFromRight {
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
}

@keyframes slideRightFromLeft {
  0% {
    left: 0%;
  }
  100% {
    left: -100%
  }
}

.friend-todo-page {
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  min-width: 730px;
  background-color: #fff;
}

.show {
  animation: slideLeftFromRight 1.5s;
}

.hide {
  animation: slideRightFromLeft forwards 1.5s;
}

.friend-todo-header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #FFEF6A;
  color: black;
  margin-bottom: 1em;
  font-family: 'orbitron';
  padding-left: 10vw;
  min-width: 700px;
  display: flex;
  height: 82px;
  align-items: center;
}

.friend-todo-back {
  font-size: 1.6rem;
  cursor: pointer;
}

.friend-todo-list {
  pointer-events: none;  
}

.friend-todo-list > li {
  list-style: none;
  position: relative;
  height: 80px;
  width: 60%;
  margin: auto;
  margin-bottom: 1em;
  border: 1px solid grey;
  border-radius: 20px;
  box-shadow: inset -4px -2px 2px rgb(0 0 0 / 20%);  
}

.friend-todo-list > li label {
  word-break: break-all;
  padding: 15px 15px 15px 70px;
  display: block;
  line-height: 1.5;
  font-size: 30px;
}

.friend-todo-list .check-box {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  left: 30px;
  margin: 0;
  cursor: pointer;
}

</style>