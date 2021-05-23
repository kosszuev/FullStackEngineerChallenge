<template>
  <div>
    <div class="wrapper hover" v-if="request && reviewer">
      <h1 class="mb-3 text-2xl font-semibold text-gray-900">
        {{ request.title }}
      </h1>
      <p class="text-left">{{ request.description }}</p>
      <h3 class="mt-8 mb-4 text-lg font-semibold text-gray-900">Comments</h3>
      <template v-if="formattedComments.length">
        <div
          class="flex mb-5"
          v-for="comment in formattedComments"
          :key="comment.id"
        >
          <div class="flex-shrink-0 mr-3">
            <img
              class="
                ml-2
                w-8
                h-8
                bg-gray-100
                object-cover object-center
                inline
                rounded-full
              "
              :src="comment.reviewer.avatarUrl"
              alt=""
            />
          </div>
          <div
            class="
              flex-1
              border
              rounded-lg
              px-4
              py-2
              sm:px-6
              sm:py-4
              leading-relaxed
            "
          >
            <strong>{{ comment.reviewer.firstName }}</strong>
            <p class="text-sm">{{ comment.text }}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <p>No comments yet..</p>
      </template>

      <form @submit.prevent="addNewComment" class="mt-5">
        <div class="shadow overflow-hidden sm:rounded-md">
          <p class="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Add a new comment as <strong>{{ reviewer.firstName }}</strong
            ><img
              class="
                ml-2
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
          </p>
          <div class="grid grid-cols-1 mt-5 mx-7">
            <label
              class="
                uppercase
                md:text-sm
                text-xs text-gray-500 text-light
                font-semibold
              "
              >Your comment</label
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
              v-model="text"
              required
            />
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
              Post a comment
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="wrapper hover" v-else-if="request && !reviewer">
      <h1 class="mb-3 text-2xl font-semibold text-gray-900">
        {{ request.title }}
      </h1>
      <p class="text-left">{{ request.description }}</p>
      <h3 class="mt-8 mb-4 text-lg font-semibold text-gray-900">Comments</h3>
      <template v-if="formattedComments.length">
        <div
          class="flex mb-5"
          v-for="comment in formattedComments"
          :key="comment.id"
        >
          <div class="flex-shrink-0 mr-3">
            <img
              class="
                ml-2
                w-8
                h-8
                bg-gray-100
                object-cover object-center
                inline
                rounded-full
              "
              :src="comment.reviewer.avatarUrl"
              alt=""
            />
          </div>
          <div
            class="
              flex-1
              border
              rounded-lg
              px-4
              py-2
              sm:px-6
              sm:py-4
              leading-relaxed
            "
          >
            <strong>{{ comment.reviewer.firstName }}</strong>
            <p class="text-sm">{{ comment.text }}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <p>No comments yet..</p>
      </template>
    </div>
  </div>
</template>

<script>
import { employees } from "@/api/employees.js";
import { requests } from "@/api/requests.js";
import { uuid } from "uuidv4";
export default {
  name: "RequestPage",
  props: ["requestId", "reviewerId"],
  data() {
    return {
      employees: [],
      request: null,
      comments: [],
      text: "",
    };
  },
  methods: {
    addNewComment() {
      const comment = {
        id: uuid(),
        reviewerId: this.reviewerId,
        text: this.text,
        created_at: Date.now(),
      };
      this.text = "";
      this.comments.push(comment);
      const comments = {
        comments: this.comments,
      };
      requests.updateRequest(this.requestId, comments);
    },
  },
  computed: {
    reviewer() {
      return this.employees.find((employee) => employee.id === this.reviewerId);
    },

    formattedComments() {
      if (this.comments.length) {
        return this.comments.map((comment) => {
          const reviewer = this.employees.find(
            (employee) => employee.id === comment.reviewerId
          );
          return { ...comment, reviewer };
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    employees.all().then((employees) => (this.employees = employees));

    requests.getRequest(this.requestId).then((request) => {
      this.request = request;
      this.comments = request.comments;
    });
  },
};
</script>
