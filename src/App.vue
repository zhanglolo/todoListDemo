<template>
  <div>
    <h1>我的待办清单V2</h1>
    <h3>
      当前共有{{ todoLists.length }}个代办事项， 其中{{
        numberOfDone
      }}个已完成， 还剩{{ todoLists.length - numberOfDone }}个未完成
    </h3>
    <div class="select">
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
    <div class="addList">
      <input
        type="text"
        name="addTodoList"
        placeholder="请输入待办事项"
        @keyup.enter="addTodoList"
        v-model.trim="input"
      />
      <input
        type="button"
        name="addTodoListButton"
        value="添加"
        @click="addTodoList"
        :disabled="isDisabled"
      />
    </div>
    <ul>
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

<script>
import todoListItem from "./components/todoListItem.vue";
export default {
  components: {
    todoListItem,
  },
  data() {
    return {
      todoLists: [],
      listsView: [],
      input: "",
      isChecked: "all",
      startId: 0,
    };
  },
  computed: {
    isDisabled() {
      if (this.input.length > 0 && this.isChecked != "done") {
        return null;
      } else {
        return "disabled";
      }
    },
    numberOfDone() {
      return this.todoLists.filter((obj) => obj.done).length;
    },
  },
  watch: {
    isChecked() {
      this.updateView();
    },
    todoLists: {
      handler(val, oldVal) {
        this.listsView = this.todoLists;
      },
      deep: true,
    },
  },
  methods: {
    addTodoList() {
      if (this.isDisabled == "disabled") {
        return;
      }
      this.todoLists.push({
        id: ++this.startId,
        todo: this.input,
        done: false,
      });
      this.input = "";
    },
    deletTodoList(index) {
      this.todoLists.splice(index, 1);
    },
    changeStatus(list) {
      list.done = !list.done;
      this.updateView();
    },
    updateView() {
      switch (this.isChecked) {
        case "all":
          this.listsView = this.todoLists;
          break;
        case "done":
          this.listsView = this.todoLists.filter((obj) => obj.done);
          break;
        case "todo":
          this.listsView = this.todoLists.filter((obj) => !obj.done);
          break;
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
}
html {
  height: 100vh;
  background-image: linear-gradient(0deg, rgb(87, 164, 189), rgb(109, 61, 176));
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  height: 100vh;
  margin: auto;
  color: #fff;
}
h1 {
  margin: 20px 0;
  font-size: 50px;
}
h3 {
  font-size: 20px;
  font-weight: 400;
  margin: 20px 0;
}
.select {
  margin: 20px 0;
}
.select > input {
  margin: 0 5px 0 20px;
}
.addList {
  margin: 20px 0;
  display: flex;
  align-content: center;
  justify-content: center;
}
[name="addTodoList"] {
  width: 500px;
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid #fff;
  text-align: left;
  font-size: 20px;
}
[name="addTodoListButton"] {
  width: 65px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #fff;
  margin-left: 20px;
  font-size: 15px;
}
ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
