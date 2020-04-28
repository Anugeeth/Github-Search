<template>
  <div class="main">
    <v-content>
      <v-container fluid>
        <input
          type="text"
          class="search-box"
          placeholder="Enter Username...."
          v-model="term"
          @keypress.enter="getSearchData(true)"
        />
        <v-row class="d-flex flex-row">
          <v-col v-for="element in result" :key="element.id" cols="12" md="4" sm="6" lg="4">
            <v-col>
              <v-card lazy class="profile-card" @click="getRepoData(element.repo)">
                <v-img :src="element.image" height="150px"></v-img>
                <v-card-title>{{element.name}}</v-card-title>
                <!-- <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Open Dialog
                </v-btn>-->
              </v-card>
            </v-col>
          </v-col>

          <!-- Repo List Dialog box -->
          <v-dialog v-model="dialog" max-width="500">
            <v-card> 
              <v-card-title class="headline">Repositories</v-card-title>
              <v-col v-for="value in repo" :key="value.id">
                <v-card-text>{{value.name}} : {{value.desc}}</v-card-text>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
    dialog: false,
    term: "",
    result: [],
    count: 0,
    page: 1,
    per_page: 9,
    repo: []
  }),
  computed: {
    length() {
      return Math.ceil(this.count / this.per_page);
    }
  },
  methods: {
    getSearchData(ref = false) {
      // for resetting page number on changing search term
      if (ref) this.page = 1;

      this.result = [];
      let query = this.term;
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
          if (total_count > 1000) {
            this.count = 1000;
          } else {
            this.count = total_count;
          }

          data.forEach(element => {
            this.result.push({
              id: element.id,
              name: element.login,
              image: element.avatar_url,
              repo: element.repos_url
            });
          });
        })
        .catch(err => {
          console.log(err.response.data);
          alert("Oops! Something Went Wrong :(")
        });
    },

    // get repo list of individual users
    getRepoData(url) {
      this.repo = [];
      this.$axios
        .get(url)
        .then(res => {
          let repo_data = res.data;
          repo_data.forEach(val => {
            this.repo.push({
              id : val.id,
              name: val.name,
              desc: val.description || 'No Description',
            });
          });
          // displaying dialog
          this.dialog = true;
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
      this.term = this.$route.params.query;
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
.page {
  padding: 1rem;
}
</style>
