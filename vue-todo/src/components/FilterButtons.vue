<template>
    <ul>
        <button @click="showTodo('all')">All</button>
        <button @click="showTodo('active')">Active</button>
        <button @click="showTodo('completed')">Completed</button>
        <button @click="showTodo('logout')">logout</button>
    </ul>
</template>

<script>
export default {
    methods: {
        showTodo(type) {
            this.$emit('showTodo', type);
        }
    }
}
</script>

<style scoped>
    ul {
        padding: 0;
        width: 60%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin: 2em auto;
    }

    button {
        font-family: 'orbitron';
        width: 23%;
        background-color: #fff;
        border: 1px solid grey;
        border-radius: 10px;
        background: rgba(52, 51, 51, 0.003);
        box-shadow: inset 0 -2px 1px rgb(0 0 0 / 20%);
        cursor: pointer;
    }
</style>