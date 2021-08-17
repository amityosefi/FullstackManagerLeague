<template>
  <div class="overall">
    <br>
    <div v-if="this.coach.fullname!=null">
      <h1 class="title">{{this.coach.fullname}} Page</h1>
      </div>
      <br>

      <div v-if="this.coach.teamName!=null">
      Team Name: {{this.coach.teamName}}
      </div>
      
      <div v-if="this.coach.commonName!=null">
      Common Name: {{this.coach.commonName}}
      </div>

      <div v-if="this.coach.nationality!=null">
      Nationality: {{this.coach.nationality}}
      </div>

      <div v-if="this.coach.birthdate!=null">
      Birth Date: {{this.coach.birthdate}}
      </div>

      <div v-if="this.coach.birthcountry!=null">
      Birth Country: {{this.coach.birthcountry}}
      </div>

      <div v-if="this.coach.image!=null">
      <img :src="this.coach.image" width="10%">
      </div>

  </div>
  
</template>

<script>
export default {
name: "CoachPage",
data() {
  // this.coach = {};
    return {
      coach: "",
        
    };
  },
props: {
    coachId: {
        required: true
    },
},
methods: {
      async redirect(id) {
      try {
  
            const response = await this.axios.get(
            `http://localhost:3000/coaches/coachDetails/${id}`,
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

      } catch (err) {
        this.coach = "";
      }

    }
},
mounted(){
    console.log("coach page mounted");
    // this.coachId=this.$route.params.coachId;
    this.redirect(this.$route.params.coachId);
  },
}


</script>

<style scoped>

#search-input {
  margin: auto;
  width: 300px;
  padding: 10px;
  align-items: center;
}

.overall {
  text-align: center;
}
</style>