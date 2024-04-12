import { NOTES_KEY } from '@/constants';

export const localStorageService = {
  getNotes() {
    return JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
  },
  setNotes(notes) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },
};
