let tasks = [];

document.getElementById("task-form").addEventListener("submit", addTask);
document.getElementById("task-list").addEventListener("click", possibleActions);

function addTask(event) {
    event.preventDefault(); // no refreshing
    const title = document.getElementById("task-title").value;
    const priority = document.getElementById("task-priority").value;
    const status = document.querySelector("input[name='task-status']:checked").value;
    const task = {title, priority, status};

    tasks.push(task);
    updateList(task);
    document.getElementById("task-form").reset();
}

function updateList(task) {
    const taskList = document.getElementById("task-list");

    const li = document.createElement("li");
    li.className = `list-group-item ${task.status === "completed" ? "completed" : ""}`;

    li.innerHTML = 
        `<span>${task.title}</span>
        <span class="badge ${getPriority(task.priority)}">${task.priority}</span>
        <button class="btn btn-sm btn-success complete-btn">Completed</button>
        <button class="btn btn-sm btn-danger remove-btn">Remove</button>`;

    taskList.appendChild(li);
}

function possibleActions(event) {
    const taskItem = event.target.closest("li");
    const taskTitle = taskItem.querySelector("span").textContent;

    if (event.target.classList.contains("remove-btn")) {
        tasks = tasks.filter(function(task) {
            return task.title !== taskTitle;
        });
        taskItem.remove();
    } 
    else if (event.target.classList.contains("complete-btn")) {
        const task = tasks.find(function(task) {
            return task.title === taskTitle;
        });
        if (task) {
            task.status = "completed";
            taskItem.classList.add("completed");
            event.target.disabled = true;
        }
    }
}

function getPriority(priority) {
    if (priority === "high") {
        return "bg-danger";
    } 
    else if (priority === "medium") {
        return "bg-warning";
    } 
    return "bg-secondary";
}
