import { createSlice } from "@reduxjs/toolkit";

import ptw from "assets/images/ptw.png";

export const formsSlice = createSlice({
  name: "forms",
  initialState: { items: [{ id: 1, name: "Permit To Work", imageUrl: ptw }] },
  reducers: {
    addForm: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;

// selectors
export const selectForms = (state) => state.forms.items;

export default formsSlice.reducer;
