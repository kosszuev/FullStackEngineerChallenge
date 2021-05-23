<template>
  <div class="wrapper">
    <h2 class="mb-5 text-3xl uppercase text-gray-600">Create Review Request</h2>
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
                >Title</label
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
                v-model="title"
                required
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
                >Description</label
              >
              <textarea
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
                v-model="description"
                required
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
                >Assign reviewers</label
              >
              <div class="flex flex-col">
                <div class="w-full md:w-1/2 flex flex-col items-center">
                  <div class="w-full">
                    <div class="flex flex-col items-center relative">
                      <div class="w-full">
                        <div
                          class="
                            my-2
                            p-1
                            bg-white
                            flex
                            border border-gray-200
                            rounded
                          "
                        >
                          <div class="flex flex-auto flex-wrap"></div>
                          <input
                            placeholder="Search by position"
                            class="
                              p-1
                              px-2
                              appearance-none
                              outline-none
                              w-full
                              text-gray-800
                            "
                            v-model="filter"
                          />
                          <div
                            class="
                              text-gray-300
                              w-8
                              py-1
                              pl-2
                              pr-1
                              border-l
                              flex
                              items-center
                              border-gray-200
                            "
                          >
                            <button
                              class="
                                cursor-pointer
                                w-6
                                h-6
                                text-gray-600
                                outline-none
                                focus:outline-none
                              "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-up w-4 h-4"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        class="
                          absolute
                          shadow
                          bg-white
                          top-100
                          z-40
                          w-full
                          lef-0
                          rounded
                          max-h-select
                          overflow-y-auto
                          svelte-5uyqqj
                        "
                      >
                        <div
                          class="flex flex-col w-full"
                          v-for="employee in filteredEmployees"
                          :key="employee.id"
                          @click="addReviewer(employee.id)"
                        >
                          <div
                            class="
                              cursor-pointer
                              w-full
                              border-gray-100
                              rounded-t
                              border-b
                              hover:bg-green-100
                            "
                          >
                            <div
                              class="
                                flex
                                w-full
                                items-center
                                p-2
                                pl-2
                                border-transparent border-l-2
                                relative
                                hover:border-green-100
                              "
                            >
                              <div class="w-6 flex flex-col items-center">
                                <div
                                  class="
                                    flex
                                    relative
                                    w-8
                                    h-8
                                    bg-orange-500
                                    justify-center
                                    items-center
                                    m-1
                                    mr-2
                                    mt-1
                                    rounded-full
                                  "
                                >
                                  <img
                                    class="
                                      w-8
                                      h-8
                                      bg-gray-100
                                      object-cover object-center
                                      flex-shrink-0
                                      rounded-full
                                    "
                                    :src="employee.avatarUrl"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div class="w-full items-center flex">
                                <div class="mx-2 -mt-1">
                                  {{ employee.firstName }}
                                  {{ employee.lastName }}
                                  <div
                                    class="
                                      text-xs
                                      truncate
                                      w-full
                                      normal-case
                                      font-normal
                                      -mt-1
                                      text-gray-500
                                    "
                                  >
                                    {{ employee.position }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="justify-left px-8 my-4 select-none flex">
              <p v-if="hasError" class="text-red-500">
                Please, add reviewers to this request
              </p>
              <span
                class="
                  py-2
                  px-4
                  shadow-md
                  no-underline
                  rounded-full
                  bg-green-500
                  text-white
                  font-sans font-semibold
                  text-sm
                  border-blue
                  btn-primary
                  hover:text-white
                  hover:bg-green-400
                  focus:outline-none
                  active:shadow-none
                  mr-2
                  inline-block
                "
                v-for="reviewer in reviewers"
                :key="reviewer.id"
              >
                <img
                  class="
                    w-8
                    h-8
                    bg-gray-100
                    object-cover object-center
                    inline
                    rounded-full
                  "
                  :src="reviewer.avatarUrl"
                  alt=""
                />
                {{ reviewer.firstName }} {{ reviewer.lastName }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 inline ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  @click="removeReviewer(reviewer.id)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
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
import { requests } from "@/api/requests.js";
import { employees } from "@/api/employees.js";
import { alert } from "../../ActionAlertService.js";
export default {
  name: "RequestCreate",
  data() {
    return {
      hasError: false,
      employees: [],
      filter: "",
      title: "",
      description: "",
      reviewers: [],
    };
  },
  computed: {
    filteredEmployees() {
      if (this.filter.length > 2) {
        return this.employees.filter((employee) =>
          employee.firstName.includes(this.filter)
        );
      }
    },
  },
  methods: {
    handleForm() {
      if (!this.reviewers.length) {
        this.hasError = true;
      } else {
        this.hasError = false;
        const request = {
          id: uuid(),
          created_at: Date.now(),
          title: this.title,
          description: this.description,
          reviewersIds: this.getReviewersIds(),
          comments: [],
        };
        requests.addRequest(request).then(() => {
          alert.setMessage("New Request was added!");
          this.$router.push({ name: "RequestsList" });
        });
      }
    },
    addReviewer(id) {
      this.hasError = false;
      this.filter = "";
      const reviewer = this.employees.find((employee) => employee.id === id);
      this.reviewers.push(reviewer);
    },
    removeReviewer(id) {
      this.reviewers = this.reviewers.filter((reviewer) => reviewer.id !== id);
    },
    getReviewersIds() {
      if (this.reviewers.length) {
        const ids = [];
        this.reviewers.forEach((reviewer) => {
          const id = reviewer["id"];
          ids.push(id);
        });
        return ids;
      }
    },
  },
  mounted() {
    employees.all().then((res) => (this.employees = res));
  },
};
</script>

<style lang="scss">
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
