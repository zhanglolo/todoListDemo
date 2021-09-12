<template>
  <div class="bg-blue-300 h-full flex flex-col space-y-8 text-center">
    <h1 class="text-6xl text-warm-gray-100">我的待办清单V3</h1>
    <h3 class="text-4xl text-warm-gray-50">
      当前共有{{ todo.list.length }}个代办事项， 其中{{
        numberOfDone
      }}个已完成， 还剩{{ todo.list.length - numberOfDone }}个未完成
    </h3>
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
    <div class="flex items-start justify-between">
      <ul class="flex flex-col w-1/3 justify-center items-center space-y-2">
        <todo-list-item
          v-for="(list, index) in todo.list"
          :list="list"
          :index="index"
          :key="list.id"
          @change-status="changeStatus(list)"
          @delet-todo-list="deletTodoList(index)"
        ></todo-list-item>
      </ul>

      <ul class="flex flex-col w-1/3 justify-center items-center space-y-2">
        <todo-list-item
          v-for="(list, index) in finish.list"
          :list="list"
          :index="index"
          :key="list.id"
          @change-status="changeStatus(list)"
          @delet-todo-list="deletTodoList(index)"
        ></todo-list-item>
      </ul>

      <ul class="flex flex-col w-1/3 justify-center items-center space-y-2">
        <todo-list-item
          v-for="(list, index) in undo.list"
          :list="list"
          :index="index"
          :key="list.id"
          @change-status="changeStatus(list)"
          @delet-todo-list="deletTodoList(index)"
        ></todo-list-item>
      </ul>
    </div>
  </div>
</template>

<script setup>
import todoListItem from "./components/todoListItem.vue";
import { ref, reactive, computed, watchEffect } from "vue";

const input = ref("");
const isChecked = ref("all");
const startId = ref("0");
const todo = reactive({ list: [] });
const finish = reactive({ list: [] });
const undo = reactive({ list: [] });

const isDisabled = computed(() => {
  if (input.value.length > 0 && isChecked.value != "done") {
    return null;
  } else {
    return "disabled";
  }
});

const numberOfDone = computed(() => {
  return todo.list.filter((obj) => obj.done).length;
});

const addTodoList = () => {
  if (isDisabled == "disabled") {
    return;
  }
  todo.list.push({
    id: ++startId.value,
    todo: input.value,
    done: false,
  });
  input.value = "";
};

const deletTodoList = (index) => {
  todo.list.splice(index, 1);
};

const changeStatus = (list) => {
  list.done = !list.done;
};

watchEffect(() => {
  finish.list = todo.list.filter((obj) => obj.done);
  undo.list = todo.list.filter((obj) => !obj.done);
});
</script>

<style>
* {
  box-sizing: content-box;
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
