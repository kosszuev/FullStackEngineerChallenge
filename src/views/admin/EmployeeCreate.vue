<template>
  <div class="wrapper">
    <h2 class="mb-5 text-3xl uppercase text-gray-600">Create Employee</h2>
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
            <div class="grid grid-cols-1 mt-5 mx-7">
              <label
                class="
                  uppercase
                  md:text-sm
                  text-xs text-gray-500 text-light
                  font-semibold
                  mb-1
                "
                >Upload Photo</label
              >
              <div>
                <div class="mt-1 flex items-center">
                  <span
                    class="
                      inline-block
                      h-12
                      w-12
                      rounded-full
                      overflow-hidden
                      bg-gray-100
                    "
                  >
                    <template v-if="previewImage">
                      <img
                        class="
                          w-12
                          h-12
                          bg-gray-100
                          object-cover object-center
                          inline
                          rounded-full
                        "
                        :src="previewImage"
                        alt=""
                      />
                    </template>
                    <template v-else>
                      <svg
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </template>
                  </span>
                  <input type="file" class="ml-3" @change="handleFileInput" />
                </div>
              </div>
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
import { uuid } from "uuidv4";
import { employees } from "@/api/employees.js";
import storage from "@/firebase/storage";
import { alert } from "../../ActionAlertService.js";
export default {
  name: "EmployeeCreate",
  data() {
    return {
      firstName: "",
      lastName: "",
      position: "",
      types: ["image/png", "image/jpeg"],
      avatar: null,
      previewImage: null,
      fileError: null,
    };
  },
  methods: {
    handleForm() {
      if (this.avatar) {
        const employeeId = uuid();
        const endPoint = `images/employees/avatar/${employeeId}`;
        let employee = {};
        storage.uploadImage(endPoint, this.avatar).then(() => {
          employee = {
            id: employeeId,
            firstName: this.firstName,
            lastName: this.lastName,
            position: this.position,
            currentRequests: [],
            finishedRequests: [],
            filePath: endPoint,
            avatarUrl: storage.url,
          };
          employees.addEmployee(employee).then(() => {
            alert.setMessage("New Employees was added!");
            this.$router.push({ name: "EmployeesList" });
          });
        });
      }
    },

    handleFileInput(e) {
      const selected = e.target.files[0];
      if (selected && this.types.includes(selected.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selected);
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        this.avatar = selected
        this.fileError = null;
      } else {
        this.avatar = null;
        this.fileError = "Please, select an image file (png or jpg)";
      }
    },
  },
};
</script>
