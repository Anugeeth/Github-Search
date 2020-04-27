<template>
  <div class="main">
    <v-content>
      <v-container fluid>
        <v-row class="d-flex flex-row">
          <v-col v-for="element in result" :key="element.id" cols="12" md="4" sm="6" lg="4">
            <v-col>
              <v-card lazy class="profile-card">
                <v-img :src="element.image" height="150px"></v-img>
                <v-card-title>{{element.name}}</v-card-title>
              </v-card>
            </v-col>
          </v-col>

          <v-pagination v-model="page" :length="length" circle @input="getSearchData()"></v-pagination>
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
    count: 0,
    page: 1,
    per_page: 9,
  }),
  computed: {
    length() {
      return Math.ceil(this.count / this.per_page);
    }
  },
  methods: {
    getSearchData() {
      this.result = [];
      let query = this.$route.params.query;
      this.$axios({
        url: "/search/users",
        method: "GET",
        params: {
          q: query,
          page: this.page,
          per_page: this.per_page
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