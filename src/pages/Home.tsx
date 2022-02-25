import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function generateRandomId() {
    return Math.floor(Math.random() * 100);
  }

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim() === "") return;

    const task: Task = {
      done: false,
      id: generateRandomId(),
      title: newTaskTitle,
    };

    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.filter((task) => task.id === id)[0];

    if (!task) {
      return;
    }

    task.done = !task.done;

    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
