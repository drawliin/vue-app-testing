<template>
  <div id="app">
    <h1>Task Manager</h1>

    <!-- Task Form -->
    <input v-model="newTask" placeholder="New task" @keyup.enter="addTask" />
    <button @click="addTask">Add Task</button>

    <!-- Task List -->
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      newTask: '',
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask() {
      if (!this.newTask.trim()) return;
      try {
        const response = await axios.post('http://localhost:5000/tasks', { title: this.newTask });
        this.tasks.push(response.data);
        this.newTask = ''; // Clear input field
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async updateTask(task) {
      try {
        await axios.put(`http://localhost:5000/tasks/${task.id}`, { completed: task.completed });
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
