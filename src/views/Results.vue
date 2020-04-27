<template>
  <div class="main">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
export default {
  name: "Results",
  data: () => ({
    result: [],
    count: ""
  }),
  methods: {
    getSearchData() {
      let query = this.$route.params.query;
      this.$axios({
        url: "/search/users",
        method: "GET",
        params: {
          q: query
        }
      })
        .then(res => {
          const data = res.data.items;
          this.count = res.data.total_count;

          // pushing the first fetched data to result array

          data.forEach(element => {
            this.result.push({
              id : element.id,
              name: element.login,
              image: element.avatar_url,
              repo_url : element.repos_url
            })
          });

          console.log(this.result)
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  beforeMount() {
    this.getSearchData();
  }
};
</script>

<style scoped>
.main {
  color: white;
}
</style>