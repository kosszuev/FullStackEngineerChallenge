<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-4 mx-auto">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
        Admin
      </h1>
      <div class="subnav">
        <router-link :to="{ name: 'EmployeesList' }">Employees</router-link> |
        <router-link :to="{ name: 'RequestsList' }"
          >Performance Reviews</router-link
        >
      </div>
      <router-view />
    </div>
  </section>
</template>

<style lang="scss">
.subnav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
h1 {
  text-align: center;
}
</style>
