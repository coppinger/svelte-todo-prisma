
<script lang="ts">
    //@ts-nocheck
    import '../app.css'

    import { enhance } from '$app/forms'

    import type { PageData } from './$types'

    export let data: PageData
 
    let inputVal = ""
    let checked = false

    let updateFormRefs = [];


</script>

<div class="flex flex-col gap-8 items-center justify-center h-screen w-screen bg-red-200">
    <form use:enhance action="?/create" method="POST">
        <label for="create-task">
            Task name:
            <input required type="text" name="input-task" id="inputTask">
            <button>Create task</button>
        </label>
    </form>
    <ul>
        {#each data.todos as {task, id, done}, index}
            <li class="flex justify-between">
                <label for="" class="flex gap-2 items-center justify-center">
                    <form use:enhance  action="?/toggle" method="POST">
                        <input
                        type="checkbox" name="done" checked={done} id={id}
                        on:click={() => {
                            updateFormRefs[index].click()
                        }}>
<button type="submit" bind:this={updateFormRefs[index]} class="hidden">Delete</button>
                        <input type="hidden" name="id" value={id}>
                    </form>
                    <input type="text" name="" class="bg-transparent" key={index} value={task}>
                </label>
                <form use:enhance action="?/delete" method="POST" >
                    <input type="hidden" value={id} name="id">
                    <button type="submit">Delete</button>
                </form>
            </li>
        {/each}
    </ul>
</div>