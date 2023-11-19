import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface BookState {
  enabledBooks: any;
  toggleEnabledBook: (index: number) => void;
}

export const useBookStore = create<BookState, [["zustand/immer", never]]>(
  immer((set,get) => {

    const initialBooks = [
      ["DATP","Dark Alleys & Twisted Paths",true],
      ["DPAS","Dark Pacts & Ancient Secrets",true],
    ];
    // TODO: read flags from local storage, overriding defaults on known books
    // TODO: switch to object literal? maybe
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("books", JSON.stringify(initialBooks));
    }

    return {
      enabledBooks: initialBooks,
      toggleEnabledBook: (indexToChange: number) => {
        set((state) => {
         state.enabledBooks[indexToChange][2] = !state.enabledBooks[indexToChange][2];
          localStorage.setItem("books", JSON.stringify(state.enabledBooks));
        })
      }
    };
  })
);

export const isSourceEnabled = (state:BookState,source:string) => {
  const elem = state.enabledBooks.find((elem) => elem[0]==source)
  if(elem) return elem[2];
  return false;
}
