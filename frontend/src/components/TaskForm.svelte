<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ add: string }>();

  let title = '';

  function handleSubmit() {
    if (!title.trim()) return;
    dispatch('add', title.trim());
    title = '';

  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex gap-2 mb-6">
  <input
    type="text"
    bind:value={title}
    placeholder="Add a new task..."
    class="flex-1 px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
  />
  <button
    type="submit"
    class="px-4 py-2 bg-[#9151FF] text-white rounded-md hover:opacity-95 transition font-medium text-sm"
  >
    Add Task
  </button>
</form>