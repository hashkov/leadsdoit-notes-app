<template>
  <div class="home">
    <FilterNav />
    <div v-if="notes.length">
      <div v-for="note in notes" :key="note.id">
        <Note :note="note" />
      </div>
    </div>
  </div>
</template>

<script>
import Note from '../components/Note.vue';
import FilterNav from '../components/FilterNav.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { Note, FilterNav },
  computed: {
    ...mapGetters({
      notes: 'filteredNotes',
    }),
  },
  mounted() {
    this.$store.dispatch('fetchNotes');
  },
};
</script>
