import prisma from "$lib/prisma";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    const response = await prisma.todo.findMany();

    return { todos: response };
}) satisfies PageServerLoad;

async function createTask(input: string) {
    return await prisma.todo.create({
        data: {
            task: input,
            done: false,
        },
    });
}

async function toggleDone(id: number, done: boolean) {
    return await prisma.todo.update({
        where: {
            id: id,
        },
        data: {
            done: done,
        },
    });
}

async function deleteTask(id: number) {
    await prisma.todo.delete({
        where: {
            id: id,
        },
    });
}

export const actions = {
    create: async (event) => {
        const data = await event.request.formData();

        const task = data.get("input-task") as string;

        if (task) {
            return createTask(task);
        }

        return fail(400, { message: "Ruh-roh" });
    },

    delete: async (event) => {
        const data = await event.request.formData();

        return deleteTask(parseInt(data.get("id") as string));
    },

    toggle: async (event) => {
        const data = await event.request.formData();
        console.log(data.get("done"));

        const done = data.get("done") === "on";
        const id = parseInt(data.get("id") as string);

        return toggleDone(id, done);
    },
} satisfies Actions;
