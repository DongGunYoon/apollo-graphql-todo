<template>
<div class="home-wrapper">
  <div class="welcome-title">Welcome!</div>
  <add-todo @add-todo="addTodo"></add-todo>
  <ul>
    <li :key="id" v-for="(todo, id) in filteredTodos">
    <input @click="toggleCompleted(todo)" :checked="todo.completed" class="check-box" type="checkbox"/>
    <label @dblclick="updateTodo(todo)">
      {{ todo.comment }}
    </label>
    <input class="deco"/>
    <input :class="todo._id === edit._id ? 'edit' : 'hide'" type="text" v-model="edit.newComment" @keypress.enter="changeComment(todo)" />
    <button @click="deleteTodo(todo._id)" class="delete-button">X</button>
  </li>
  </ul>
  <filter-buttons @showTodo="showTodo"></filter-buttons>
</div>
</template>

<script>
import 'vue-apollo'
import AddTodo from "../components/AddTodo.vue";
import FilterButtons from "../components/FilterButtons.vue"
import { GraphQLClient, gql } from "graphql-request";


export default {
  name: "Home",
  components: {
    "add-todo": AddTodo,
    "filter-buttons": FilterButtons
  },
  data() {
    return {
      showType: 'all',
      edit:  {
        _id: '',
        newComment: '',
      },
      token: '',
      todos: [],
      endpoint: '',
      header: ''
    };
  },
  async created() {
    this.endpoint = `http://localhost:3000/graphql`;
    this.token = localStorage.getItem('token');
    this.header = {headers: {"Authorization": localStorage.getItem('token')}}

    const graphQLClient = new GraphQLClient(this.endpoint, this.header);

    const todos = await graphQLClient.request(
      gql`query {
          getTodos{
            name
            _id
            comment
            completed
          }
        }`
    )
    this.todos = todos.getTodos
  },

  computed: {
    filteredTodos() {
      if (this.showType === 'all') return this.todos
      else if (this.showType === 'completed') return this.todos.filter(todo => todo.completed)
      else return this.todos.filter(todo => !todo.completed)
    }
  },
  
  methods: {
    async showTodo(type) {
      if (type === 'logout') {
        localStorage.clear();
        this.$router.push({path: 'login'})
      }
      this.showType = type;
    },
    
    async addTodo(comment) {
      const graphQLClient = new GraphQLClient(this.endpoint, this.header);
      const {addTodo} = await graphQLClient.request(
        gql`mutation {
          addTodo(input: {
            name: "${this.name}"
            comment: "${comment}"
          }) {
            _id
            name
            completed
            comment
          }
        }`
      )
      this.todos.push(addTodo)
    },

    async deleteTodo(_id) {
      const graphQLClient = new GraphQLClient(this.endpoint, this.header);
      await graphQLClient.request(
        gql`mutation {deleteTodo(input: "${_id}")}`
      )
      this.todos = this.todos.filter(todo => todo._id !==  _id);
    },

    async toggleCompleted(todo) {
      const graphQLClient = new GraphQLClient(this.endpoint, this.header);
      await graphQLClient.request(
        gql`mutation {
          toggleTodo(input: "${todo._id}")
        }`
      )
      todo.completed = !todo.completed;
    },

    async changeComment(todo) {
      const graphQLClient = new GraphQLClient(this.endpoint, this.header);
      await graphQLClient.request(
        gql`mutation {
          updateTodo(input: {
            _id: "${todo._id}"
            newComment: "${this.edit.newComment}"
          })
        }`
      )
      this.edit._id = '';
      todo.comment = this.edit.newComment
    },

    updateTodo(todo) {
      this.edit._id = todo._id;
      this.edit.newComment = todo.comment;
    }
  }
};
</script>

<style>

body {
  font-family: 'orbitron';
}
.home-wrapper {
  min-width: 700px;
}

.welcome-title {
  width: 60%;
  font-size: 30px;
  text-align: center;
  margin: auto;
  margin-bottom: 1em;
}

.delete-button {
    position: absolute;
    top: 20px;
    right: 10px;
    font-size: 30px;
    color: #cc9a9a;
    background-color: #fff;
    border: none;
    cursor: pointer;
}

.check-box {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  left: 30px;
  margin: 0;
  cursor: pointer;
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
  word-break: break-all;
  padding: 15px 15px 15px 70px;
  display: block;
  line-height: 1.5;
  font-size: 30px;
}

.deco {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -10;
  border: none;
}

.edit {
  word-break: break-all;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  font-size: 27px;
  padding: 15px 15px 15px 70px;
  line-height: 1.5;
}

.hide {
  display: none;
}

</style>
