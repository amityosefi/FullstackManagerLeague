<template>
<div>
  <div v-if="games != []">
    <GamePreview
      v-for="g in this.games"
      :id="g.id"
      :date="g.date"
      :hour="g.hour"
      :hostTeam="g.hostTeam" 
      :guestTeam="g.guestTeam"
      :field="g.field"
      :key="g.id"></GamePreview>
    </div>
  <div class="game-preview" v-else>
      There are no favorite games in your profile
    </div>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    // this.updateGames();
    return {
      games: this.games
    };
  },
  created(){
    this.updateGames();
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        this.games = [];
        for(let i=0; i < response.data.length; i++){
          
          let homename = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${response.data[i].gamedetails[0].hometeamID}`,
          );
          let awayname = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${response.data[i].gamedetails[0].awayteamID}`,
          );

          let game = {
          id: response.data[i].gamedetails[0].gameid,
          date: response.data[i].gamedetails[0].gamedate,
          hour: response.data[i].gamedetails[0].gametime.slice(11,19),
          hostTeam: homename.data.name,
          guestTeam: awayname.data.name,
          field: response.data[i].gamedetails[0].field
          }
          // console.log(game);
          this.games.push(game);
        }
      } catch (error) {
        console.log("There are no games in user favorites")
        this.games =  []
        return this.games
      }
    }, 
  },
};
</script>

<style></style>
