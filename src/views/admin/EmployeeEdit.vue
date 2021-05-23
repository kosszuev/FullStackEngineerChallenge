<template>
  <div class="wrapper">
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
    <h2 class="mb-5 text-3xl uppercase text-gray-600">Edit Employee</h2>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form @submit.prevent="handleForm">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-1 mt-5 mx-7">
              <label
                class="
                  uppercase
                  md:text-sm
                  text-xs text-gray-500 text-light
                  font-semibold
                "
                >First name</label
              >
              <input
                class="
                  py-2
                  px-3
                  rounded-lg
                  border-2 border-indigo-300
                  mt-1
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-600
                  focus:border-transparent
                "
                type="text"
                v-model="firstName"
              />
            </div>
            <div class="grid grid-cols-1 mt-5 mx-7">
              <label
                class="
                  uppercase
                  md:text-sm
                  text-xs text-gray-500 text-light
                  font-semibold
                "
                >Last name</label
              >
              <input
                class="
                  py-2
                  px-3
                  rounded-lg
                  border-2 border-indigo-300
                  mt-1
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-600
                  focus:border-transparent
                "
                type="text"
                v-model="lastName"
              />
            </div>
            <div class="grid grid-cols-1 mt-5 mx-7">
              <label
                class="
                  uppercase
                  md:text-sm
                  text-xs text-gray-500 text-light
                  font-semibold
                "
                >Position</label
              >
              <input
                class="
                  py-2
                  px-3
                  rounded-lg
                  border-2 border-indigo-300
                  mt-1
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-600
                  focus:border-transparent
                "
                type="text"
                v-model="position"
              />
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-lg
                font-medium
                rounded-md
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { employees } from "@/api/employees.js";
import { alert } from "../../ActionAlertService.js";
export default {
  name: "EmployeeEdit",
  data() {
    return {
      id: this.$route.params.id,
      firstName: "",
      lastName: "",
      position: "",
    };
  },
  methods: {
    handleForm() {
      const employee = {
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
      };
      employees.updateEmployee(this.id, employee).then(() => {
        alert.setMessage("Successfully edited!");
        this.$router.push({ name: "EmployeesList" });
      });
    },
  },
  mounted() {
    employees.getEmployee(this.id).then((employee) => {
      (this.firstName = employee.firstName),
        (this.lastName = employee.lastName),
        (this.position = employee.position);
    });
  },
};
</script>
