#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let conditions = true;

console.log(chalk.magenta.bold("\n \t welcome to GMMusani - Todo List Application\n"));


let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "update Task", "View Todo list","Exit"]
            }
        ]);
        if(option.choices === "Add Task"){
            await addTask()
        }
        else if(option.choices === "Delete Task"){
            await deleteTask()
        }
        else if(option.choices === "View Todo list"){
            await viewTask()
        }
        else if(option.choices === "update Task"){
            await updateTask()
        }
        else if(option.choices === "Exit"){
            conditions = false;
        }
    }
}

// Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "Input",
            message: "Enter your new task :"
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in Todo-List`);
}

// Function to view all todo list tasks
let viewTask = async () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`)
    })
    console.log("\n");
    
}

// Fuction to delete a task from the list
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to delete :",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} this task has been deleted successfully from your Todo-List`);
    
}

// Function to update a task
let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to update :"
        },
        {
            name: "new_task",
            type: "input",
            message: "Now enter your new task :",
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task
    console.log(`\n Task at index no. ${update_task_index.index - 1} updated successfully [For updated list check option: "view Todo-List"]`);
    
}

main();