import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id?: string;
  title: string;
  date: Date;
  body: string;
}

interface NotesState {
  notes: Note[];
  isModalOpen: boolean;
  loading: boolean;
}

const initialState: NotesState = {
  notes: [],
  isModalOpen: false,
  loading: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (
      state,
      action: PayloadAction<{ id: string; title: string; body: string }>
    ) => {
      const { id, title, body } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.body = body;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    deleteAllNotes: (state) => {
      state.notes = [];
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addNote,
  editNote,
  deleteNote,
  deleteAllNotes,
  toggleModal,
  setLoading,
} = notesSlice.actions;

export default notesSlice.reducer;
