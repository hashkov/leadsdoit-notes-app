import { createStore } from 'vuex';
import { FilterEnum, NOTES_KEY } from '@/constants';

export default createStore({
  state: {
    notes: [],
    currentFilter: 'all',
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, newNote) {
      state.notes.push(newNote);
    },
    deleteNote(state, id) {
      state.notes = state.notes.filter((note) => note.id !== id);
    },
    toggleComplete(state, id) {
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.favorite = !note.favorite;
      }
    },
    updateCurrentFilter(state, filter) {
      state.currentFilter = filter;
    },
    updateNote(state, updatedNote) {
      const index = state.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...updatedNote };
      }
    },
  },
  actions: {
    fetchNotes({ commit }) {
      const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
      commit('setNotes', notes);
    },
    addNote({ commit, state }, noteData) {
      const newNote = {
        id: Date.now(),
        ...noteData,
      };
      const updatedNotes = [...state.notes, newNote];
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
      commit('addNote', newNote);
    },
    updateNote({ commit, state }, updated) {
      const updatedNotes = state.notes.map((note) =>
        note.id === updated.id ? { ...note, ...updated } : note
      );
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
      commit('updateNote', updated);
    },
    deleteNote({ commit, state }, id) {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
      commit('deleteNote', id);
    },
    toggleNoteFavorite({ commit, state }, id) {
      const updatedNotes = state.notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      );
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
      commit('toggleComplete', id);
    },
    fetchNoteById({ commit, state }, id) {
      return state.notes.find((note) => note.id === id);
    },
    changeFilter({ commit }, filter) {
      commit('updateCurrentFilter', filter);
    },
  },
  getters: {
    filteredNotes: (state) => {
      switch (state.currentFilter) {
        case FilterEnum.PERSONAL:
          return state.notes.filter(
            (note) => note.category === FilterEnum.PERSONAL
          );
        case FilterEnum.WORK:
          return state.notes.filter(
            (note) => note.category === FilterEnum.WORK
          );
        case FilterEnum.OTHER:
          return state.notes.filter(
            (note) => note.category === FilterEnum.OTHER
          );
        case FilterEnum.FAVORITE:
          return state.notes.filter((note) => note.favorite);
        default:
          return state.notes;
      }
    },
    getCurrentFilter: (state) => state.currentFilter,
  },
});
