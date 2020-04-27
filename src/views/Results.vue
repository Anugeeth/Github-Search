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

          <v-pagination
          class="page"
            color="#11998e"
            v-model="page"
            :length="length"
            circle
            @input="getSearchData()"
          ></v-pagination>
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
    per_page: 9
  }),
  computed: {
    length() {
      return Math.ceil(this.count / this.per_page);
    },
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
          let total_count = res.data.total_count;

          // GitHub Search API provides only up to 1,000 results for each search.
          if(total_count > 1000){
            this.count = 1000;
          }
          else{
            this.count = total_count;
          }

          // pushing the first fetched data to result array

          data.forEach(element => {
            this.result.push({
              id: element.id,
              name: element.login,
              image: element.avatar_url,
              repo_url: element.repos_url
            });
          });

        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  mounted() {
    if (this.$route.params.query === null) {
      alert("null");
      this.$router.go(-1);
    } else {
      this.getSearchData();
    }
  }
};
</script>

<style scoped>
.main {
  color: white;
  background-color: #222222;
  min-height: 100vh;
  padding: 1rem;
}
.profile-card {
  color: #222222;
}
.page{
  padding: 1rem;
}
</style>