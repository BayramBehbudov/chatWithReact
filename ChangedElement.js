import { create } from "zustand";

const UseChangedElement = create((set) => ({
  myData: [
    "",
    {
      Mail: ""
    }
  ],

  entry: false,

  setEntry: () => set((state) => ({ entry: !state.entry })),
  setMyData: (item) => set((state) => ({ myData: (state.myData = item) })),
}));

export default UseChangedElement;
