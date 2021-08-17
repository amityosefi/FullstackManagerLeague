<template>
  <div class="overall">
      <div v-if="this.player.fullname!=null">
        <h1 class="title">{{this.player.fullname }} Page</h1>
      </div>
      <br>
      <div v-if="this.player.teamName!=null">
      Team Name: {{this.player.teamName}}
      </div>

      <div v-if="this.player.position!=null">
      Position: {{ this.player.position }}
      </div>

      <div v-if="this.player.commonName!=null">
      Common Name: {{this.player.commonName}}
      </div>

      <div v-if="this.player.nationality!=null">
      Nationality: {{this.player.nationality}}
      </div>

      <div v-if="this.player.birthdate!=null">
      Birth Date: {{this.player.birthdate}}
      </div>

      <div v-if="this.player.birthcountry!=null">
      Birth Country: {{this.player.birthcountry}}
      </div>

      <div v-if="this.player.height!=null">
      Height: {{this.player.height}}
      </div>

      <div v-if="this.player.weight!=null">
      Weight: {{this.player.weight}}
      </div>

      <div v-if="this.player.image!=null">
      <br>
      <img :src="this.player.image" width="10%">
      </div>
      <br>
      <b-button v-if="this.player.length!=0" variant="outline-info" @click="addToFavorite">Add to favorite players</b-button>
  </div>
  
</template>

<script>
export default {
name: "PlayerPage",
data() {
  // this.player = {};
    return {
      player: "",

    };
  },
props: {
    playerId: {
        required: true
    },
},
  methods: {
    async addToFavorite() {
      try {
          const response = await this.axios.post(
          "http://localhost:3000/users/favoritePlayers",
          {
            playerId: this.player.playerId
          }
           );

          alert("Player added succesfully to your favorites");

      } catch(err) {
        alert(err.request.response);

      }

    },
    async redirect(id) {
        this.wantsPersonal = true;
      try {
  
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetails/${id}`,
          {
  
          }
        );

          this.player = {
            playerId: response.data.player_id,
            fullname: response.data.full_name,
            image: response.data.image,
            position: response.data.position,
            teamName: response.data.team_name,
            commonName: response.data.common_name,
            nationality: response.data.nationality,
            birthdate: response.data.birthdate,
            birthcountry: response.data.birthcountry,
            height: response.data.height,
            weight: response.data.weight
          };

          // this.$router.push({name: 'PlayerPage', params: { player: this.player} });


      } catch (err) {
        this.player = "";
      }
    }


  },
mounted(){
  console.log("player page mounted");
  this.redirect(this.$route.params.playerId);
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