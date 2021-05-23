<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Employee Role</router-link> |
      <router-link to="/admin">Admin Role</router-link>
    </div>
    <router-view />
    <ActionAlert></ActionAlert>
  </div>
</template>

<script>
import ActionAlert from "@/components/ActionAlert.vue";
export default {
  components: { ActionAlert },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;
  text-align: right;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}
</style>
