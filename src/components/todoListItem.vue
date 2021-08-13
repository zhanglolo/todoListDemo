<template>
  <li>
    <span class="index">{{ index + 1 }}</span>
    <span class="todoText">{{ list.todo }}</span>
    <span class="status" @click="$emit('change-status')">{{
      list.done ? "已完成" : "未完成"
    }}</span>
    <span class="delet" @click="$emit('delet-todo-list')">✖︎</span>
  </li>
</template>

<script setup>
defineProps(["list", "index"]);
</script>

<style>

li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  list-style: none;
  width: 500px;
  font-size: 25px;
  height: 30px;
  margin: 10px 0;
}
.index {
  display: inline-block;
  margin-right: 20px;
}
.todoText {
  display: inline-block;
  text-align: left;
  width: 350px;
}
.status {
  display: inline-block;
  cursor: pointer;
  min-width: 80px;
}
.delet {
  display: inline-block;
  cursor: pointer;
  text-align: center;
}
</style>
