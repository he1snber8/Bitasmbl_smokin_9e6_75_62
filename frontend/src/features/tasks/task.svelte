<script lang="ts">
 export type TaskStatus = 'todo' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}
  let tasks: Task[] = [
    { id: '1', title: 'Design user interface', status: "todo" },
    { id: '2', title: 'Implement backend API Yo', status: "todo" },
  ];


  let newTaskTitle = '';
  let editingId: string | null = null;
  let editedTitle = '';

  function addTask() {
    if (!newTaskTitle.trim()) return;
    tasks = [
      ...tasks,
      { id: crypto.randomUUID(), title: newTaskTitle.trim(), completed: false }
    ];
    newTaskTitle = '';
  }

  function deleteTask(id: string) {
    tasks = tasks.filter((t) => t.id !== id);
  }

  function startEditing(task: Task) {
    editingId = task.id;
    editedTitle = task.title;
  }

  function saveEdit(id: string) {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, title: editedTitle.trim() } : t
    );
    editingId = null;
  }
</script>

<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
  <h2 class="text-xl font-bold mb-4 text-gray-800">Task Manager</h2>

  <!-- Create Task Form -->
  <form on:submit|preventDefault={addTask} class="flex gap-2 mb-6">
    <input
      type="text"
      bind:value={newTaskTitle}
      placeholder="Add a new task..."
      class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-[#9151FF] text-white rounded-md hover:opacity-90 transition font-medium"
    >
      Add
    </button>
  </form>

  <!-- Task Listing -->
  <ul class="space-y-3">
    {#each tasks as task (task.id)}
      <li class="flex items-center justify-between p-3 border rounded-md bg-gray-50">
        <div class="flex items-center gap-3 flex-1 mr-2">
          <input
            type="checkbox"
            bind:checked={task.completed}
            class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
          />

          {#if editingId === task.id}
            <input
              type="text"
              bind:value={editedTitle}
              class="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          {:else}
            <span
              class={`text-sm ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {task.title}
            </span>
          {/if}
        </div>

        <div class="flex gap-2">
          {#if editingId === task.id}
            <button
              on:click={() => saveEdit(task.id)}
              class="px-2.5 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          {:else}
            <button
              on:click={() => startEditing(task)}
              class="px-2.5 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              on:click={() => deleteTask(task.id)}
              class="px-2.5 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          {/if}
        </div>
      </li>
    {:else}
      <p class="text-gray-500 text-sm text-center py-4">No tasks found.</p>
    {/each}
  </ul>
</div>