<template>
  <div
    class="
      relative
      flex flex-col
      sm:flex-row
      sm:items-center
      bg-green-100
      shadow
      rounded-md
      py-5
      pl-6
      pr-8
      sm:pr-6
      alert
    "
    v-if="alert.message"
  >
    <div
      class="
        flex flex-row
        items-center
        border-b
        sm:border-b-0
        w-full
        sm:w-auto
        pb-4
        sm:pb-0
      "
    >
      <div class="text-green-500">
        <svg
          class="w-6 sm:w-5 h-6 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div class="text-sm font-medium ml-3">{{ alert.message }}</div>
    </div>
  </div>
</template>

<script>
import { alert } from "@/ActionAlertService.js";
export default {
  name: "ActionAlert",
  data() {
    return {
      alert: alert,
    };
  },
};
</script>

<style lang="scss" scoped>
.alert {
  max-width: 600px;
  position: fixed;
  top: 100px;
  right: 50px;
}
</style>
