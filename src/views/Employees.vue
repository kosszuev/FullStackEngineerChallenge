<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-4 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Employees
        </h1>
      </div>
      <div class="flex flex-wrap -m-2">
        <div
          class="p-2 lg:w-1/3 md:w-1/2 w-full"
          v-for="employee in employees"
          :key="employee.id"
        >
          <router-link
            :to="{ name: 'EmployeePage', params: { id: employee.id } }"
          >
            <div
              class="
                h-full
                flex
                items-center
                border-gray-200 border
                p-4
                rounded-lg
                hover:shadow-lg
                group-hover:text-light-blue-200
              "
            >
              <img
                alt="team"
                class="
                  w-16
                  h-16
                  bg-gray-100
                  object-cover object-center
                  flex-shrink-0
                  rounded-full
                  mr-4
                "
                :src="employee.avatarUrl"
              />
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">
                  {{ employee.firstName }} {{ employee.lastName }}
                </h2>
                <p class="text-gray-500">{{ employee.position }}</p>
              </div>
              <span
                class="
                  bg-purple-200
                  text-purple-600
                  py-1
                  px-3
                  rounded-full
                  text-xs
                "
                v-if="employee.requests.length"
                >{{ employee.requests.length }} request<span
                  v-if="employee.requests.length > 1"
                  >s</span
                ></span
              >
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { employees } from "@/api/employees.js";

export default {
  name: "Employees",
  data() {
    return {
      employees: [],
    };
  },
  mounted() {
    employees
      .getAllEmployeesWithRequests()
      .then((res) => (this.employees = res));
  },
};
</script>
