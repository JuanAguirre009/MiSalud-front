import {create} from "zustand";
import { createCardTitleSlice } from "./slices/cardTitleSlice.js";
export const useMiSaludStore = create((...a) => ({
    ...createCardTitleSlice(...a)
}));