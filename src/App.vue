<template>
  <div id="app">
<<<<<<< Updated upstream
    <img src="./assets/logo.png">
=======
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
>>>>>>> Stashed changes
    <router-view/>
  </div>
</template>

<<<<<<< Updated upstream
<script>
export default {
  name: 'App'
}
</script>

<style>
=======
<style lang="scss">
>>>>>>> Stashed changes
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
<<<<<<< Updated upstream
  margin-top: 60px;
=======
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
>>>>>>> Stashed changes
}
</style>
