<template>
  <form @submit.prevent="submitTodo">
    <div class="add-todo">
      <input class="add-todo-input" placeholder="What needs to be done?" v-model="enteredTodo" type="text" />
    </div>
  </form>
</template>


<script>
export default {
    data() {
    return {
        enteredTodo: ''
    };
  },
  methods: {
      submitTodo() {
          this.$emit('add-todo', this.enteredTodo);
          this.enteredTodo = '';
      }
  }
};
</script>

<style scoped>
  .add-todo {
    width: 60%;
    margin: 10px auto;
  }

  .add-todo-input {
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
</style>