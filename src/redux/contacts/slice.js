const { createSlice } = require("@reduxjs/toolkit");

const contactsSlice = createSlice({
  name: "storage",
  initialState: {contacts: []},
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },

    deleteContact(state, action) {
      console.log(action.payload.id);
      state.contacts = state.contacts.filter(({ id }) => id !== action.payload.id)
    }
  }
})

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;