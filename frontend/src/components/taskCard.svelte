<script lang="ts">
  import type { Task, TaskStatus } from '../types/task';
  import { createEventDispatcher } from 'svelte';

  export let task: Task;

  const dispatch = createEventDispatcher<{
    delete: string;
    update: Task;
  }>();


  let isEditing = false;
  let editedTitle = task.title;

  function handleSave() {
    if (!editedTitle.trim()) return;
    dispatch('update', { ...task, title: editedTitle.trim() });
    isEditing = false;
  }

  function handleStatusChange(e: Event) {
    const newStatus = (e.target as HTMLSelectElement).value as TaskStatus;
    dispatch('update', { ...task, status: newStatus });
  }

  const statusColors: Record<TaskStatus, string> = {
    todo: 'bg-gray-100 text-gray-700 border-gray-300',
    active: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200'
  };
</script>

<li class="flex items-center justify-between p-3 border rounded-md bg-white shadow-sm gap-3">
  <div class="flex items-center gap-3 flex-1">
    <!-- Status Selector -->
    <select
      value={task.status}
      on:change={handleStatusChange}
      class={`text-xs px-2 py-1 rounded border font-medium focus:outline-none ${statusColors[task.status]}`}
    >
      <option value="todo">Todo</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>

    {#if isEditing}
      <input
        type="text"
        bind:value={editedTitle}
        class="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
    {:else}
      <span class={`text-sm ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {task.title}
      </span>
    {/if}
  </div>

  <div class="flex gap-2">
    {#if isEditing}
      <button
        on:click={handleSave}
        class="px-2.5 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Save
      </button>
      <button
        on:click={() => { isEditing = false; editedTitle = task.title; }}
        class="px-2.5 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
      >
        Cancel
      </button>
    {:else}
      <button
        on:click={() => isEditing = true}
        class="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 border rounded hover:bg-gray-200 transition"
      >
        Edit
      </button>
      <button
        on:click={() => dispatch('delete', task.id)}
        class="px-2.5 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition"
      >
        Delete
      </button>
    {/if}
  </div>
</li>