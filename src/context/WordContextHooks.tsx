import { useContext } from "react";
import { WordContext, WordDispatchContext } from "./WordContext";

export const useWord = () => {
    return useContext(WordContext);
};

export const useWordDispatch = () => {
    return useContext(WordDispatchContext);
};