<template>
  <form class="note-form" @submit.prevent="handleSubmit">
    <div class="note-form__field">
      <label class="note-form__label" for="title">Title</label>
      <input
        class="note-form__input"
        id="title"
        type="text"
        v-model="title"
        required
      />
    </div>

    <div class="note-form__field">
      <label class="note-form__label" for="details">Details</label>
      <textarea
        class="note-form__textarea"
        id="details"
        v-model="details"
        required
      ></textarea>
    </div>

    <div class="note-form__field">
      <label class="note-form__label" for="category">Category</label>
      <select
        class="note-form__select"
        id="category"
        v-model="category"
        required
      >
        <option disabled value="">Please select one</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="note-form__field note-form__favorite">
      <label class="note-form__label" for="favorite">Add to Favorites</label>
      <input
        class="note-form__checkbox"
        id="favorite"
        type="checkbox"
        v-model="favorite"
      />
    </div>

    <div class="note-form__timestamps">
      <div class="note-form__timestamp">
        <label class="note-form__label">Created</label>
        <p class="note-form__date">{{ createdAt }}</p>
      </div>
      <div class="note-form__timestamp">
        <label class="note-form__label">Last Edited</label>
        <p class="note-form__date">{{ updatedAt }}</p>
      </div>
    </div>

    <button class="note-form__button" type="submit">Update Note</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      noteId: null,
      title: '',
      details: '',
      category: '',
      favorite: false,
      createdAt: '',
      updatedAt: '',
    };
  },
  methods: {
    ...mapActions(['fetchNoteById', 'updateNote']),
    async loadNote() {
      try {
        this.noteId = parseInt(this.$route.params.id, 10);
        if (!this.noteId) throw new Error('Note ID is not specified.');

        const note = await this.fetchNoteById(this.noteId);
        if (note) {
          this.title = note.title ?? '';
          this.details = note.details ?? '';
          this.category = note.category ?? '';
          this.favorite = note.favorite ?? false;
          this.createdAt = note.createdAt ?? '';
          this.updatedAt = note.updatedAt ?? '';
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleSubmit() {
      if (this.title.trim() && this.details.trim()) {
        const updatedNote = {
          id: this.noteId,
          title: this.title,
          details: this.details,
          category: this.category,
          favorite: this.favorite,
          updatedAt: new Date().toLocaleString(),
        };

        this.updateNote(updatedNote)
          .then(() => {
            this.$router.push('/');
          })
          .catch((err) => console.error(err));
      }
    },
  },
  created() {
    this.loadNote();
  },
  watch: {
    $route: 'loadNote',
  },
};
</script>

<style scoped>
@import url('../assets/styles/components/EditNote.scss');
</style>
