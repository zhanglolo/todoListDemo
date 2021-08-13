<template>
  <div class="bg-blue-300 h-full flex flex-col space-y-8 text-center">
    <h1 class="text-6xl text-warm-gray-100">我的待办清单V2</h1>
    <h3 class="text-4xl text-warm-gray-50">
      当前共有{{ todoLists.length }}个代办事项， 其中{{
        numberOfDone
      }}个已完成， 还剩{{ todoLists.length - numberOfDone }}个未完成
    </h3>
    <div class="space-x-4 text-white">
      <input
        name="todoSelect"
        type="radio"
        value="all"
        v-model="isChecked"
      />所有
      <input
        name="todoSelect"
        type="radio"
        value="done"
        v-model="isChecked"
      />已完成
      <input
        name="todoSelect"
        type="radio"
        value="todo"
        v-model="isChecked"
      />未完成
    </div>
    <div class="flex justify-center space-x-3">
      <input
        type="text"
        class="w-100 h-10 rounded-1xl text-left text-xl px-4 shadow-md"
        placeholder="请输入待办事项"
        @keyup.enter="addTodoList"
        v-model.trim="input"
      />
      <input
        type="button"
        class="
          w-20
          h-10
          rounded-1xl
          bg-red-500
          text-warm-gray-100
          hover:bg-red-600
          shadow-md
          disabled:(bg-red-200
          text-warm-gray-400)
        "
        value="添加"
        @click="addTodoList"
        :disabled="isDisabled"
      />
    </div>
    <ul class="flex flex-col justify-center items-center">
      <todo-list-item
        v-for="(list, index) in listsView"
        :list="list"
        :index="index"
        :key="list.id"
        @change-status="changeStatus(list)"
        @delet-todo-list="deletTodoList(index)"
      ></todo-list-item>
    </ul>
  </div>
</template>

<script setup>
import todoListItem from "./components/todoListItem.vue";
import { ref, reactive, computed, watch, watchEffect } from "vue";

const input = ref("");
const isChecked = ref("all");
const startId = ref("0");
let todoLists = reactive([]);
let listsView = reactive([]);

const isDisabled = computed(() => {
  if (input.value.length > 0 && isChecked.value != "done") {
    return null;
  } else {
    return "disabled";
  }
});

const numberOfDone = computed(() => {
  return todoLists.filter((obj) => obj.done).length;
});

const addTodoList = () => {
  if (isDisabled == "disabled") {
    return;
  }
  todoLists.push({
    id: ++startId.value,
    todo: input.value,
    done: false,
  });
  input.value = "";
};

const deletTodoList = (index) => {
  todoLists.splice(index, 1);
};

const changeStatus = (list) => {
  list.done = !list.done;
};

const updateView = () => {
  switch (isChecked.value) {
    case "all":
      listsView.length = 0;
      listsView.push(...todoLists);
      break;
    case "done":
      listsView.length = 0;
      listsView.push(...todoLists.filter((obj) => obj.done));
      break;
    case "todo":
      listsView.length = 0;
      listsView.push(...todoLists.filter((obj) => !obj.done));
      break;
  }
};

watchEffect(() => {
  updateView();
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  height: 100vh;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
