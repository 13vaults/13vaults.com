import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


// NOTE: VV = versions & variants
// sources affect visibility of versions, versions affect visibility of variants

interface BookState {
  enabledBooks: any;
  toggleEnabledBook: (index: number) => void;
  selectedDocumentVVs: any; 
  setDocumentVV: (docName:string, type:string, vv:string) => void;
  currentDocument: string;
  setCurrentDocument: (docName:string) => void;
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
      },
      selectedDocumentVVs: [],
      setDocumentVV: (docName:string, type:string, vv:string)  => {
        set((state) => {
          let found = false;
          state.selectedDocumentVVs = state.selectedDocumentVVs.map((elem) => {
            if(elem[0] == docName && elem[1] == type) {
              found = true;
              return [elem[0],elem[1],vv];
            }
            return elem;
          })
          if(!found)
          { 
            state.selectedDocumentVVs = [
              ...state.selectedDocumentVVs,
              [docName,type,vv]
            ]
          }
        })
        },
        currentDocument: null,
        setCurrentDocument: (docName) => set((state) => {state.currentDocument = docName;}),
        // TODO: update localstorage
    };
  })
);

export const isSourceEnabled = (state:BookState,source:string) => {
  const elem = state.enabledBooks.find((elem) => elem[0]==source)
  if(elem) return elem[2];
  return false;
}

export const isVVEnabled = (state:BookState, type:string, vv:string, doc?:string) => {
  if(doc === undefined)
  {
    doc = state.currentDocument;
  }
  if(vv.includes("|"))
  {
    const alternatives = vv.split("|")
    const elem = state.selectedDocumentVVs.find(
      (elem) => elem[0]==doc && elem[1]==type && alternatives.indexOf(elem[2]) >= 0
    )
    if(elem) return true;
  }
  else
  {
    const elem = state.selectedDocumentVVs.find(
      (elem) => elem[0]==doc && elem[1]==type && elem[2]==vv
    )
    if(elem) return true;
  }
  return false;
}
export const getVV = (state:BookState, type:string, doc?:string) => {
  if(doc === undefined)
  {
    doc = state.currentDocument;
  }
  console.log(state.selectedDocumentVVs)
  const elem = state.selectedDocumentVVs.find((elem) => elem[0]==doc && elem[1]==type);
  return elem ? elem[2] : null;
}