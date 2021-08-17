<template>
  <div id="favorites">
    <h3>Your favorite games are:</h3>
    <br/><br/>
    <div><GameTable @remove="removefromfavorites" @home="redirecthome" @away="redirectaway"
      :items="this.games"
      :fields="fields"
      :favoriteName="game"
      :funcName="'Delete'">
      </GameTable>
    </div>
  </div>
</template>

<script>
import GameTable from '../components/GameTable.vue';
export default {
  components: { GameTable },
  
  data() {
    return {
      fields: ["selected", "date", "hour", "hostTeam", "guestTeam", "field"],
      games: [],
      game: "game"
    };
  },
  created(){
    this.loadFavoriteGames(); 
    },
  methods: {
    async removefromfavorites(item) {
      try {
          const response = await this.axios.delete(
          `http://localhost:3000/users/favorites/Game/${item}`);

          if(response.data == "Succeeded"){
            alert("That game was successfully removed from favorites");
            this.loadFavoriteGames();
          }else{
            alert("There was a problem with removing this game from favorites, please try again");
          }

      } catch (error) {
        console.log("There was a problem with deleting the game from favorites");
      }
    },
    async redirecthome(data){
      let teamId = "";
      for (let i=0; i < this.games.length; i++) {
        if (this.games[i].hostTeam == data) {
          teamId = this.games[i].hometeamID;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },

    async redirectaway(data){
      let teamId = "";
      for (let i=0; i < this.games.length; i++) {
        if (this.games[i].guestTeam == data) {
          teamId = this.games[i].guestTeamID;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },
    async loadFavoriteGames() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames"
        );
        let allgames = [];
        for (let i = 0; i < response.data.length; i++) {
          let homename = await this.axios.get(
            `http://localhost:3000/teams/teamLeague/${response.data[i].gamedetails[0].hometeamID}`
          );
          let awayname = await this.axios.get(
            `http://localhost:3000/teams/teamLeague/${response.data[i].gamedetails[0].awayteamID}`
          );

          // console.log(response.data[i].gamedetails[0].gameid);
          let game = {
            id: response.data[i].gamedetails[0].gameid,
            date: response.data[i].gamedetails[0].gamedate,
            hour: response.data[i].gamedetails[0].gametime.slice(11, 19),
            hostTeam: homename.data.name,
            hometeamID: response.data[i].gamedetails[0].hometeamID,
            guestTeam: awayname.data.name,
            guestTeamID: response.data[i].gamedetails[0].awayteamID,
            field: response.data[i].gamedetails[0].field,
          };
          allgames.push(game);
        }
        this.games = allgames;
      } catch (error) {
        console.log("There are no games in user favorites");
        this.games = [];
        return this.games;
      }
    },
  },
};
</script>

<style>
button {
  margin: 2%;
}

#favorites{
  text-align: center;
  padding: 5%;
}
</style>
