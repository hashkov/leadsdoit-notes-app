<template>
  <div class="note" :class="{ 'note--favorite': note.favorite }">
    <div class="note__actions" @click="showDetails = !showDetails">
      <h3 class="note__title">{{ note.title }}</h3>
      <div class="note__icons">
        <span @click.stop="deleteNote" class="material-icons note__icon"
          >delete</span
        >
        <router-link
          :to="{ name: 'EditNote', params: { id: note.id } }"
          class="note__icon"
        >
          <span class="material-icons">edit</span>
        </router-link>
        <span
          @click.stop="toggleFavorite"
          class="material-icons note__icon note__icon--favorite"
        >
          favorite
        </span>
      </div>
    </div>
    <div v-if="showDetails" class="note__details">
      <p class="note__text">{{ note.details }}</p>
      <p class="note__text">
        <span class="note__label">Category:</span>{{ note.category }}
      </p>
      <p class="note__text">
        <span class="note__label">Created:</span>{{ note.createdAt }}
      </p>
      <p class="note__text">
        <span class="note__label">Last updated:</span>{{ note.updatedAt }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['note'],
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    deleteNote() {
      this.$store
        .dispatch('deleteNote', this.note.id)
        .catch((err) => console.log(err));
    },
    toggleFavorite() {
      this.$store
        .dispatch('toggleNoteFavorite', this.note.id)
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
@import url('../assets/styles/components/Note.scss');
</style>
