<template>
  <div class="home">
    <div class="title">
      <p class="head">GitHub User Search</p>
    </div>
    <form @submit.prevent>
      <input type="text" class="search-box" placeholder="Enter Username...." v-model="term" />
      <button class="search-btn" @click="navigate">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    term: ""
  }),
  methods: {
    navigate() {
      let query = this.term;
      this.$router.push({ name: "Results", params: { query } });
    }
  }
};
</script>

<style scoped>

.home {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color: #222222;
}
.head {
  font-size: 5rem;
  color: white;
  line-height: 4rem;
}

.search-btn {
  margin-top: 0.5rem;
  text-decoration: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(to right, #11998e, #38ef7d);
  padding: 15px 40px;
  border-radius: 2rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

.search-btn:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px #11998e;
}

</style>