<template>
<div>
 <div class="welcome-title">Welcome {{ name }}!</div>
 <div class="userSearch">
    <label for="searchInput"></label>
    <input v-model="searchInput" placeholder="Search User By Nickname!" autocomplete="off" @keyup="getMatchedNicknames"  id="searchInput" type="text">
  </div>
  <ul class="searchedUsers">
    <li :key="id" v-for="(nickname, id) in matchedNicknames">
      <label for="">{{nickname}}</label>
    </li>
  </ul>
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
      name: "",
    //   header: '',
    //   token: '',
    };
  },
  async created() {    
    this.endpoint = `http://localhost:3000/todo`;
    this.name = localStorage.getItem('name');
    // this.token = localStorage.getItem('token');
    // this.header = {headers: {"Authorization": localStorage.getItem('token')}}
  },
    methods: {
        async getMatchedNicknames() {
            if (this.searchInput === '') {
            this.matchedNicknames = []
            return
            }
            const graphQLClient = new GraphQLClient(this.endpoint);
            this.matchedNicknames = await graphQLClient.request(
            gql`query {
                getUsersNickname(input: "${this.searchInput}")
                }`
            ).then(res => res.getUsersNickname)
        }
    }
}
</script>

<style scoped>
.welcome-title {
  width: 60%;
  font-size: 30px;
  text-align: center;
  margin: auto;
  margin-bottom: 1em;
}

.userSearch {
    width: 60%;
    margin: 10px auto;
}

#searchInput {
  font-family: 'orbitron';
  font-size: 24px;
  width: 100%;
  padding: 16px 16px 16px 60px;
  border-radius: 10px;
  border: 0.1px solid grey;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgb(0 0 0 / 20%);
  margin-bottom: 1.5em;
}

li {
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

li label {
  font-family: 'orbitron';
  word-break: break-all;
  padding: 15px 15px 15px 70px;
  display: block;
  line-height: 1.5;
  font-size: 30px;
}

</style>