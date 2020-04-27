<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
export default {
  name : 'Results',
  data : ()=>({
    result : ""
  }),
  methods: {
    getSearchData(){
      let query = this.$route.params.query;
      this.$axios({
        method: "GET",
        params : query
      })
      .then(res=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  beforeMount(){
    this.getSearchData();
  }
}
</script>