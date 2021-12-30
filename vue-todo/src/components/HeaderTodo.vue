<template>
<header class="header">
    <ul class="navigation-list">
        <li @click="movePage('login')" class="link">LogIn</li>
        <li @click="movePage('home')"><h1>TODO APP</h1></li>
        <li @click="movePage('friend')" class="link">Friend</li>
    </ul>
</header>
</template>

<script>
export default {
  methods: {
    movePage(type) {
      this.$router.push({path: type})
    }
  }
}
</script>

<style scoped>

.navigation-list {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    background-color: #FFEF6A;
    color: black;
    text-align: center;
    margin: 0;
    margin-bottom: 1em;
    font-family: 'orbitron';
    min-width: 700px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

.navigation-list > li {
  list-style: none;
}

.navigation-list > li:hover {
  color: grey;
  cursor: pointer;
}

.link {
  font-size: 1.6rem;
}


</style>