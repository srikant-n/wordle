import { createContext } from "react";
import type { Dispatch } from "react";

import type { WordContextType, WordDispatchContextType } from "../types";

export const WordContext = createContext<WordContextType>({} as never);
export const WordDispatchContext = createContext<Dispatch<WordDispatchContextType> | null>(null);
