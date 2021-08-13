<template>
  <li class="flex justify-between items-baseline text-2xl text-white space-y-4">
    <span class="inline-block mr-6">{{ index + 1 }}</span>
    <span class="inline-block w-100 text-left">{{ list.todo }}</span>
    <span class="inline-block cursor-pointer" @click="$emit('change-status')">{{
      list.done ? "已完成" : "未完成"
    }}</span>
    <span
      class="inline-block cursor-pointer ml-2"
      @click="$emit('delet-todo-list')"
      >✖︎</span
    >
  </li>
</template>

<script setup>
defineProps(["list", "index"]);
</script>

<style></style>
