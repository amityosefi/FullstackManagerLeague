<template>
  <div id="favorites">
    <h3>Your favorite players are:</h3>
    <br/><br/>
    <div><FavoriteTable @remove="removefromfavorites" @team="redirect" @player="redirectplayer"
      :items="this.players"
      :fields="fields"
      :favoriteName="name">
      </FavoriteTable>
    </div>
  </div>
</template>

<script>
import FavoriteTable from '../components/FavoriteTable.vue';
export default {
    components: { FavoriteTable },

  data() {
    return {
      fields: [
      { key: "selected", label: "Selected" },
        { key: "full_name", label: "full name" },
        { key: "name", label: "team name" },
        { key: "logo", label: "Logo", image: true },
        { key: "position", label: "position" },
        ],
      players: [],
      name: "player"
    };
  },
    created(){
      this.loadFavoritePlayers(); 
    },
  methods: {
    async redirect(data){
      let teamId = "";
      for (let i=0; i < this.players.length; i++) {
        if (this.players[i].team_name == data) {
          teamId = this.players[i].id;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {team_id: teamId} });
    },
    async redirectplayer(data){
      let playerId = "";
      for (let i=0; i < this.players.length; i++) {
        if (this.players[i].full_name == data) {
          playerId = this.players[i].id;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {team_id: playerId} });
    },
    async removefromfavorites(item) {
      // Rows are indexed from 0, so the third row is index 2
      try {

          let response = await this.axios.delete(
            `http://localhost:3000/users/favorites/player/${item}`
          );
          if(response.data == "Succeeded"){
            alert("The player was successfully removed from favorites");
            this.loadFavoritePlayers();
          }else{
            alert("There was a problem with removing this player from favorites, please try again");
          }

      } catch (error) {
        console.log("There was a problem with deleting the player from favorites");
      }
    },
    async loadFavoritePlayers() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers"
        );
        let allPlayers = [];
        for (let i = 0; i < response.data.length; i++) {
          let player = {
            id: response.data[i].player_id,
            name: response.data[i].team_name,
            full_name: response.data[i].full_name,
            logo: response.data[i].image,
            position: response.data[i].position
          };
          allPlayers.push(player);
        }
        this.players = allPlayers;
      } catch (error) {
        console.log("There are no players in user favorites");
        this.players = [];
        return this.players;
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
