<template>
<div>
  <header-todo></header-todo>
  <router-view />
</div>
</template>

<script>
import 'vue-apollo'
import HeaderTodo from "./components/HeaderTodo.vue";


export default {
  name: "App",
  components: {
    HeaderTodo,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

@font-face {
  font-family: 'orbitron';
  src: url(./fonts/Orbitron-VariableFont_wght.ttf);
}

body {
  margin: 0;
}

header-todo {
  font-family: 'orbitron';
}

ul {
  padding: 0;
}
</style>