import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

const todoListItem = {
  props: ["list", "index"],
  methods: {},
  template: `
  <li>
    <span class="index">{{index+1}}</span>
    <span class="todoText">{{list.todo}}</span>
    <span class="status" @click="changeStatus(list)">{{list.done ? "已完成" : "未完成"}}</span>
    <span class="delet" @click="deletTodoList(index)">✖︎</span>
  </li>
  `,
};

const vm = new Vue({
  el: "#app",
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
    todoLists() {
      this.listsView = this.todoLists;
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
});
