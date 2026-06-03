import { useContext } from "react";
import { blogContext } from "../context/blog.context";

export function useBlog(){
    const context = useContext(blogContext)
    return context
}