<template>
    <div class="search">
    <h1 class="title">Search Page</h1>
    Please enter the player id:
    <b-input-group prepend="Id:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="searchPlayer">Search</b-button>
      </b-input-group-append>
    </b-input-group>


      <div v-if="this.player==undefined">
      <br>
        Sorry! There is no player with this id
      </div>

    </div>
    

</template>

<script>
export default {
 data() {
   this.player = {};

    return {
      player: "",
      searchQuery:"",
    };
  },
  methods: {
    async searchPlayer() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetails/${this.searchQuery}`,
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

          this.$router.push({name: 'PlayerPage', params: { player: this.player} });

        }

      catch (err) {
        this.player = undefined;
      }
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