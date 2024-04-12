<template>
  <nav class="filter-nav">
    <button
      v-for="(value, key) in filters"
      :key="key"
      @click="updateFilter(filters[key])"
      :class="{ active: getCurrentFilter === filters[key] }"
    >
      {{ value }}
    </button>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { FilterEnum } from '../constants/index';

export default {
  data() {
    return {
      filters: FilterEnum,
    };
  },
  computed: {
    ...mapGetters(['getCurrentFilter']),
  },
  methods: {
    updateFilter(filter) {
      this.$store.dispatch('changeFilter', filter);
    },
  },
};
</script>

<style scoped>
@import url('../assets/styles/components/FilterNav.scss');
</style>
