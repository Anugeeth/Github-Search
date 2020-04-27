<template>
  <div class="main">
    <v-content>
      <v-container fluid>
        <v-row class="d-flex flex-row">
          <v-col v-for="element in result" :key="element.id" cols="12" md="4" sm="6" lg="4">
            <v-col>
              <v-card lazy class="profile-card">
                <v-img :src="element.image" height="200px"></v-img>
                <v-card-title>{{element.name}}</v-card-title>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
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
              id: element.id,
              name: element.login,
              image: element.avatar_url,
              repo_url: element.repos_url
            });
          });

          console.log(this.result);
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
  background-color: #222222;
  min-height: 100vh;
}
.profile-card {
  color: #222222;
}
</style>