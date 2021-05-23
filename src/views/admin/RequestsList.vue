<template>
  <div class="flex flex-col employeesList">
    <button
      class="
        bg-green-200
        text-green-900
        mb-3
        group
        flex
        items-center
        rounded-md
        bg-light-green-100
        text-light-green-600 text-sm
        font-medium
        px-4
        py-2
        addBtn
      "
      @click="goToReviewCreatePage()"
    >
      <svg
        class="group-hover:text-light-green-600 text-light-green-500 mr-2"
        width="12"
        height="20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
        />
      </svg>
      New request
    </button>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Number of reviewers
                </th>
                <th
                  scope="col"
                  class="
                    px-3
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Comments
                </th>

                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="request in reversedRequests" :key="request.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ request.title }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="flex px-6 py-4 whitespace-nowrap">
                  <span
                    class="
                      px-2
                      inline-flex
                      text-xs
                      leading-5
                      font-semibold
                      rounded-full
                    "
                  >
                    {{ request.reviewers.length }} reviewer<span
                      v-if="request.reviewers.length > 1"
                      >s</span
                    >
                  </span>
                  <div class="flex items-center justify-center">
                    <img
                      class="
                        w-6
                        h-6
                        rounded-full
                        object-cover object-center
                        border-gray-200 border
                        transform
                        hover:scale-125
                      "
                      :class="request.reviewers.length === 1 ? '' : '-m-1'"
                      v-for="reviewer in request.reviewers"
                      :key="reviewer.id"
                      :src="reviewer.avatarUrl"
                    />
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <template v-if="request.comments.length">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    <span class="ml-1 inline text-xs leading-5 font-semibold"
                      >{{ request.comments.length }} comment<span
                        v-if="request.comments.length > 1"
                        >s</span
                      ></span
                    >
                  </template>
                  <template v-else>
                    <span class="text-xs leading-5 font-semibold"
                      >No comments yet</span
                    >
                  </template>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div
                      class="
                        w-4
                        mr-2
                        transform
                        hover:text-purple-500
                        hover:scale-110
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        @click="goToRequestPage(request.id)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div
                      class="
                        w-4
                        mr-2
                        transform
                        hover:text-purple-500
                        hover:scale-110
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        @click="goToRequestEditPage(request.id)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requests } from "@/api/requests.js";
export default {
  name: "RequestsList",
  data() {
    return {
      requests: [],
    };
  },
  computed: {
    reversedRequests() {
      return this.requests.reverse();
    },
  },
  methods: {
    goToReviewCreatePage() {
      this.$router.push({ name: "RequestCreate" });
    },
    goToRequestPage(requestId) {
      this.$router.push({
        name: "RequestPage",
        params: { requestId: requestId, reviewerId: "ADMIN" },
      });
    },
    goToRequestEditPage(requestId) {
      this.$router.push({ name: "RequestEdit", params: { id: requestId } });
    },
  },
  mounted() {
    requests.getAllRequestsWithEmployees().then((res) => (this.requests = res));
  },
};
</script>

<style lang="scss" scoped>
.addBtn {
  width: 140px;
}
.employeesList {
  max-width: 800px;
  margin: 0 auto;
}
</style>
