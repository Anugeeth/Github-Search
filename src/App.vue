<template>
  <!-- Index -->
  <v-app>
  <router-view />
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
  padding: 0%;
  margin: 0%;
  font-family: "Poppins", sans-serif;
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

</style>