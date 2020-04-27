<template>
  <div class="home">
    <div class="title">
    <p class="head">GitHub User Search</p>
    </div>
    <form @submit.prevent>
        <input type="text" class="search-box" placeholder="Text" v-model="term" />
     
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
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
}
.head{
  font-size: 5rem;
  color: white;
}
.search-box {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid grey;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.search-box:focus {
  padding-bottom: 6px;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}

.search-btn {
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