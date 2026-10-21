import { useContext } from "react";
import { WordContext, WordDispatchContext } from "./WordContext";

export const useWordContext = () => {
  return useContext(WordContext);
};

export const useWordDispatch = () => {
  return useContext(WordDispatchContext);
};
