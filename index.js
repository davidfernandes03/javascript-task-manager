// Libraries and list
const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
let tasks = [];

// Function to display the main menu
function showMenu() {
  console.log(chalk.blue("\n=== Task Manager Menu ==="));
  console.log("1. Add Task");
  console.log("2. List Tasks");
  console.log("3. Complete Task");
  console.log("4. Remove Task");
  console.log("5. Exit");
}

// Function to add a new task
function addTask() {
  try {
    const description = prompt("Enter task description: ");

    if (!description) {
      throw new Error("Task description cannot be empty.");
    }

    tasks.push({
      id: tasks.length + 1,
      description,
      completed: false,
    });

    console.log(chalk.green("Task added successfully!"));
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

// Function to list all tasks
function listTasks() {
  if (tasks.length === 0) {
    console.log(chalk.yellow("No tasks available."));
    return;
  }

  tasks.forEach((task) => {
    const status = task.completed
      ? chalk.green("✔ Completed")
      : chalk.red("✘ Pending");

    console.log(`${task.id}. ${task.description} - ${status}`);
  });
}

// Function to mark a task as completed
function completeTask() {
  try {
    const id = parseInt(prompt("Enter task ID to complete: "));

    const task = tasks.find((t) => t.id === id);

    if (!task) {
      throw new Error("Task not found.");
    }

    task.completed = true;
    console.log(chalk.green("Task marked as completed."));
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

// Function to remove a task
function removeTask() {
  try {
    const id = parseInt(prompt("Enter task ID to remove: "));

    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);

    if (tasks.length === initialLength) {
      throw new Error("Task not found.");
    }

    console.log(chalk.green("Task removed successfully."));
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

// Recursive function to keep the program running
function startApp() {
  showMenu();

  const choice = prompt("Choose an option: ");
  switch (choice) {
    case "1":
      addTask();
      break;
    case "2":
      listTasks();
      break;
    case "3":
      completeTask();
      break;
    case "4":
      removeTask();
      break;
    case "5":
      console.log(chalk.blue("Goodbye!"));
      return;
    default:
      console.log(chalk.red("Invalid option."));
  }
  // Recursive call
  startApp();
}

// Start application
startApp();
