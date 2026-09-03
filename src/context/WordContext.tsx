import { createContext } from "react";
import type * as React from "react";
import type { WordContextType, WordDispatchContextType } from "../types";

export const WordContext = createContext<WordContextType>({} as WordContextType);
export const WordDispatchContext = createContext<React.Dispatch<WordDispatchContextType> | null>(null);