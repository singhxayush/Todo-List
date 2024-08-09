// useTodos.ts
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";

export type Todo = {
  _id: number;
  heading: string;
  body: string;
  completed: boolean;
};

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch(BASE_URL + "/todos");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });
};
