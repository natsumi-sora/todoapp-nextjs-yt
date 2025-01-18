import { Task } from "./src/types/types"

export const getAllTodos = async (): Promise<Task[]> => {
    const res = await fetch(`http://localhost:3001/tasks`, { cache: "no-store" }//SSR or CSR（クライアントサイドレンダリング）
    );
    // foce-cacheについてはnextjsの公式ガイド参照　頻繁に更新する場合はSSGはむかない。ブログとかなら向いている。頻繁に更新するならtodoの場合はSSRがおすすめ
    const todos =res.json();

    return todos;
};

export const addTodo = async (todo: Task): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const newTodos =res.json();

    return newTodos;
};

export const editTodo = async (id: string, newText: string): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
    });
    const updatedTodo =res.json();

    return updatedTodo;
};

export const deleteTodo = async (
    id: string,
): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    });
    const deleteTodo =res.json();

    return deleteTodo;
}