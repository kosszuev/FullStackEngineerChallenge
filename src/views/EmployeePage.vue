<template>
  <div class="wrapper text-center hover">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      @click="$router.go(-1)"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
    <template v-if="employee">
      <div class="h-20 w-20 mb-3 mx-auto">
        <img
          class="w-20 h-20 bg-gray-100 object-cover object-center rounded-full"
          :src="employee.avatarUrl"
          alt=""
        />
      </div>
      <h2 class="text-gray-900 title-font font-medium">
        {{ employee.firstName }} {{ employee.lastName }}
      </h2>
      <p class="text-gray-500">{{ employee.position }}</p>
      <template v-if="employee.requests.length">
        <h3 class="text-lg font-bold mt-5">Review requests</h3>
        <ul class="requestsList">
          <router-link
            :to="{
              name: 'RequestPage',
              params: { requestId: request.id, reviewerId: employee.id },
            }"
            v-for="request in employee.requests"
            :key="request.id"
          >
            <li class="p-3 hover:bg-gray-100 rounded-sm">
              {{ request.title }}
            </li>
          </router-link>
        </ul>
      </template>
    </template>
  </div>
</template>
<script>
import { employees } from "@/api/employees.js";
export default {
  name: "EmployeePage",
  data() {
    return {
      employee: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    employees
      .getAllEmployeesWithRequests()
      .then(
        (res) => (this.employee = res.find((employee) => employee.id === id))
      );
  },
};
</script>
<style lang="scss" scoped>
.requestsList {
  width: 400px;
  margin: 0 auto;
  text-align: left;
}
</style>
