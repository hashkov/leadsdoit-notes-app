<template>
  <form class="note-form" @submit.prevent="handleSubmit">
    <label class="note-form__label" for="title">Title</label>
    <input
      class="note-form__input"
      id="title"
      type="text"
      v-model="title"
      required
    />

    <label class="note-form__label" for="details">Details</label>
    <textarea
      class="note-form__textarea"
      id="details"
      v-model="details"
      required
    ></textarea>

    <label class="note-form__label" for="category">Category</label>
    <select class="note-form__select" id="category" v-model="category" required>
      <option disabled value="">Please select one</option>
      <option value="personal">personal</option>
      <option value="work">work</option>
      <option value="other">other</option>
    </select>

    <div class="note-form__favorite">
      <label class="note-form__label" for="favorite">Add to Favorites</label>
      <input
        class="note-form__checkbox"
        id="favorite"
        type="checkbox"
        v-model="favorite"
      />
    </div>

    <button class="note-form__button">Add Note</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
      details: '',
      category: '',
      favorite: false,
      createdAt: '',
      updatedAt: '',
    };
  },
  methods: {
    ...mapActions(['addNote']),

    handleSubmit() {
      const date = new Date().toLocaleString();
      const note = {
        title: this.title,
        details: this.details,
        category: this.category,
        favorite: this.favorite,
        createdAt: date,
        updatedAt: date,
        id: Math.floor(Math.random() * 10000),
      };

      this.addNote(note)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
@import url('../assets/styles/components/AddNote.scss');
</style>
