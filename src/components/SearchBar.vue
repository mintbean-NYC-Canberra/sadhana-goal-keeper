<template>
  <div class="search-bar">
    <span @click="focusSearchInput" class="icon"><search></search></span>
    <input @input="onUpdate" v-model="inputText" ref="searchInput" class="search-text" placeholder="Search" />
  </div>
</template>

<script>
import { Magnify } from "mdue";
export default {
  data() {
    return {
      inputText: ""
    }
  },
  components: {
    search: Magnify
  },
  methods: {
    focusSearchInput() {
      this.$refs.searchInput.focus();
    },
    onUpdate() {
      const goals = this.$store.getters["goals/goals"];
      if (this.inputText === "") {
        this.$emit('searchChange', goals)
      } else {
        this.$emit('searchChange', goals.filter((goal) => 
          goal.title.toLowerCase().includes(this.inputText.toLowerCase()) ||
          goal.description.toLowerCase().includes(this.inputText.toLowerCase())
        ))
      }
    },
  },
};
</script>

<style scoped>
.search-bar {
  padding-top: 4px;
}

.icon {
  position: relative;
  left: 28px;
  top: 4px;
  color: var(--text-light);
}

.icon > svg {
  transform: scale(1.25);
}

input {
  width: 100%;
  font-size: 16px;
  display: inline-block;
  background-color: white;
  padding: 3px 15px 3px 28px;
  border-radius: 30px;
  font-size: 16px;
  margin: 2px 10px 5px 2px;
  border-color: white;
  border-style: solid;
  border-width: 1px;
  color: var(--text-light);
  width: 222px;
  box-shadow: 4px 4px 4px rgba(151, 151, 151, 0.25);
}
input:focus {
  outline: none;
}

@media screen and (min-width: 767px) {
  .search-bar {
    width: 260px;
  }
}
</style>
