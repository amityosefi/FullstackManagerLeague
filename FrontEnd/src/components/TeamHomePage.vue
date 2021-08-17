<template>
  <div class="overall">
  <div v-if="this.team.team_name!=null">
   <h1 class="title">{{this.team.team_name}} Page</h1>
  </div>
   <b-button v-if="this.team.length!=0" variant="outline-info" @click="addToFavorite">Add to favorite teams</b-button>
   <br>
  <div v-if="this.team.coach.length!=0">
    <br>
    The coach of the team:
    <br>
    <br>
  <CoachPreview
    :coachId="this.team.coach.coach_id"
    :fullname="this.team.coach.full_name"
    :image="this.team.coach.image"
    :teamName="this.team.coach.team_name" 
    ></CoachPreview>
    <br>
  </div>

  <div v-if="this.team.players.length!=0">
    <br>
    The players that play in the team:
      <b-dropdown variant="Default" text="Sort">
      <b-dropdown-item @click="sortPlayers()">Player Name</b-dropdown-item>
      </b-dropdown>
    <br>
    <br>
  <PlayerPreview
    v-for="p in this.team.players"
    :playerId="p.player_id"
    :fullname="p.fullname"
    :image="p.image"
    :position="p.position" 
    :teamName="p.team_name"
    :key="p.player_id"></PlayerPreview>
    <br>
  </div>

  <div v-if="this.team.pastGames.length!=0">
    <br>
      Team past games:
      <br>
    <GamePreview
      v-for="g in this.team.pastGames"
      :id="g.gameID"
      :date="g.gamedate"
      :hour="g.gametime.slice(11,19)"
      :hostTeam="g.hometeamID" 
      :guestTeam="g.awayteamID"
      :field="g.field"
      :key="g.gameID"></GamePreview>
      <br>
  </div>

   <div v-if="this.team.futureGames.length!=0">
     <br>
     Team future games:
      <br>
    <GamePreview
      v-for="g in this.team.futureGames"
      :id="g.gameID"
      :date="g.gamedate"
      :hour="g.gametime.slice(11,19)"
      :hostTeam="g.hometeamID" 
      :guestTeam="g.awayteamID"
      :field="g.field"
      :key="g.gameID"></GamePreview>
      <br>
  </div> 
   <br>
   <br>

        
  </div>
  
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
import CoachPreview from "./CoachPreview.vue";
import GamePreview from "./GamePreview.vue";
export default {
  name: "TeamHomePage",
    components: {
        PlayerPreview,
        CoachPreview,
        GamePreview
    },
 data() {
  //  this.team = {};
    return {  
      team: "",

    };
  },
props: {
    teamId: {
        required: true
    },
},
methods: {
    sortPlayers()
    {
      this.team.players.sort(function(a, b) {
        var nameA = a.fullname.toUpperCase(); // ignore upper and lowercase
        var nameB = b.fullname.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    },
      async addToFavorite() {
      try {
          const response = await this.axios.post(
          "http://localhost:3000/users/favoriteTeams",
          {
            teamId: this.team_id
          }
           );

          alert("Team added succesfully to your favorites");

      } catch(err) {
        alert(err.request.response);

      }

    },
        async redirect(id) {
        try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamDetails/${id}`,
          {
  
          }
        );

          this.team = {
        team_name: response.data.players[0].team_name,
        players: response.data.players,
        coach: response.data.coach,
        pastGames: response.data.games.past_team_games,
        futureGames: response.data.games.future_team_games
        }

      } catch (err) {
        this.team = "";
      }
    }
},

mounted(){
    console.log("team page mounted");
  //   this.teamId=this.$route.params.teamId;
  //   this.redirect(this.teamId);
    
    this.redirect(this.$route.params.teamId);
   
  }
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