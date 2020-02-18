new Vue({
	el: "#app",
	data() {
		return {
			todoLists: [],
			listsView: [],
			input: "",
			isChecked: "all",
			startId: 0
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
			return this.todoLists.filter(obj => obj.done).length;
		}
	},
	watch: {
		isChecked() {
			this.updateView();
		},
		todoLists() {
			this.listsView = this.todoLists;
		}
	},
	methods: {
		addTodoList() {
			if (this.isDisabled == "disabled") {
				return;
			}
			this.todoLists.push({
				id: ++this.startId,
				todo: this.input,
				done: false
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
					this.listsView = this.todoLists.filter(obj => obj.done);
					break;
				case "todo":
					this.listsView = this.todoLists.filter(obj => !obj.done);
					break;
			}
		}
	}
});
