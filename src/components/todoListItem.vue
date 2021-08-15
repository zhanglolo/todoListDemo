<template>
  <li
    class="
      flex
      justify-between
      items-center
      text-2xl text-white
      rounded-xl
      h-4rem
      border
    "
  >
    <span class="mr-6 ml-2 w-2rem border rounded-2xl bg-red-300">{{
      index + 1
    }}</span>
    <span class="w-100 text-left">{{ list.todo }}</span>
    <span class="cursor-pointer" @click="$emit('change-status')">{{
      list.done ? "已完成" : "未完成"
    }}</span>
    <span
      class="cursor-pointer ml-2 mr-2 text-white"
      @click="$emit('delet-todo-list')"
      >✖︎</span
    >
  </li>
</template>

<script setup>
defineProps(["list", "index"]);
</script>

<style></style>
