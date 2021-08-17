<template>
<div class="search">
    <h1 class="title">Search Page</h1>
    Please enter the coach id:
    <b-input-group prepend="Id:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="searchCoach">Search</b-button>
      </b-input-group-append>
    </b-input-group>

      <div v-if="this.coach==undefined">
      <br>
        Sorry! There is no coach with this id
      </div>
    </div>
</template>

<script>
export default {
 data() {
   this.coach = {};
   this.searchQuery = "";

    return {
      coach: "",
      searchQuery: "",
    };
  },
  methods: {
    async searchCoach() {
    try {
          const response = await this.axios.get(
            `http://localhost:3000/coaches/coachDetails/${this.searchQuery}`,
            {
    
            }
          );

            this.coach = {
              coachId: response.data.coach_id,
              fullname: response.data.full_name,
              image: response.data.image,
              teamName: response.data.team_name,
              commonName: response.data.common_name,
              nationality: response.data.nationality,
              birthdate: response.data.birthdate,
              birthcountry: response.data.birthcountry,
            };

            this.$router.push({name: 'CoachPage', params: { coach: this.coach} });

        } catch (err) {
          this.coach = undefined;
        }
    },
    mounted(){
    console.log("coach search page mounted")
  },

    }
}
</script>

<style scoped>
.search {
    /* height:100px; */
    /* width:200px; */
    text-align:center;
}

#search-input {
  margin: auto;
  width: 300px;
  padding: 10px;
  align-items: center;
}

</style>