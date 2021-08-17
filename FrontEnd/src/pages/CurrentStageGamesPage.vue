<template>
  <div id="body">
    <h3>
      Future Games
    </h3>
    <br /><br />
    <div><GameTable @remove="addtofavorites" @home="redirecthome" @away="redirectaway"
      :items="this.futuregames"
      :fields="fields"
      :favoriteName="game"
      :funcName="'Add'">
      </GameTable>
    </div>

    <br /><br /><br />
    <h3>
      Past Games
    </h3>
    <br /><br />

    <b-table :items="this.pastgames" :fields="pastfields" striped responsive="sm">
      <template v-slot:cell(hostTeam)="data">
        <a @click="redirecthomepast(data.value)" variant="primary">{{data.value}}</a>
      </template>

      <template v-slot:cell(guestTeam)="data">
        <a @click="redirectawaypast(data.value)" variant="primary">{{data.value}}</a>
      </template>

      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item.events" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <br /><br />
  </div>
</template>

<script>
import GameTable from '../components/GameTable.vue';
export default {
  components: { GameTable },
  data() {
    return {
      fields: [
        "selected",
        "date",
        "hour",
        "hostTeam",
        "guestTeam",
        "homeGoal",
        "awayGoal",
        "field",
        "stage",
      ],
      pastfields: [
        "date",
        "hour",
        "hostTeam",
        "guestTeam",
        "homeGoal",
        "awayGoal",
        "field",
        "stage",
        "show_details"
      ],
      futuregames: this.futuregames,
      pastgames: this.pastgames,
      selected: [],
      selectMode: "single",
      itemss: [1,2,3],
      game: "game"
    };
  },

  created(){
    this.getfutureGames();
    this.getpastGames();  
    },

  methods: {
    async addtofavorites(item) {
      try {
        console.log(item);
        const response = await this.axios.post(
          "http://localhost:3000/users/favoriteGames",
          {
            gameId: item
          }
        );
        const answer = response.data;
        alert(answer);
      } catch (error) {
        console.log("There was a problem with the games to add to favorites");
      }
    },
    async redirecthome(data){
      let teamId = "";
      for (let i=0; i < this.futuregames.length; i++) {
        if (this.futuregames[i].hostTeam == data) {
          teamId = this.futuregames[i].hometeamID;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },

    async redirectaway(data){
      let teamId = "";
      for (let i=0; i < this.futuregames.length; i++) {
        if (this.futuregames[i].guestTeam == data) {
          teamId = this.futuregames[i].guestTeamID;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },
        async redirecthomepast(data){
      let teamId = "";
      for (let i=0; i < this.pastgames.length; i++) {
        if (this.pastgames[i].hostTeam == data) {
          teamId = this.pastgames[i].hostTeamID;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },

    async redirectawaypast(data){
      let teamId = "";
      for (let i=0; i < this.pastgames.length; i++) {
        if (this.pastgames[i].guestTeam == data) {
          teamId = this.pastgames[i].guestTeamID;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },
    async getfutureGames() {
      try {
        let futGames = [];
        let response = await this.axios.get(
          "http://localhost:3000/league/futuregames"
        );
      
        
        this.futuregames = [];
        for (let i = 0; i < response.data.length; i++) {
        let homename = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${response.data[i].hometeamID}`
        );
        let awayname = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${response.data[i].awayteamID}`
        );
          let game = {
            id: response.data[i].gameID,
            date: response.data[i].gamedate,
            hour: response.data[i].gametime.slice(11, 19),
            hostTeam: homename.data.name,
            hometeamID: response.data[i].hometeamID,
            guestTeam: awayname.data.name,
            guestTeamID: response.data[i].awayteamID,
            homeGoal: "Not played",
            awayGoal: "Not played",
            field: response.data[i].field,
            stage: response.data[i].stage,
          };
          // console.log(game);
          futGames.push(game);
        }
        this.futuregames = futGames;
      } catch (error) {
        console.log("There are no games in the future");
        this.games = [];
        // return this.games;
      }
    },

    async getpastGames() {
      try {
        let pasGames = [];
        let response = await this.axios.get(
          "http://localhost:3000/league/pastgames"
        );
        this.pastgames = [];
        for (let i = 0; i < response.data.past_games.length; i++) {
           let gameevents = await this.axios.get(
            `http://localhost:3000/league/getEvents/${response.data.past_games[i].gameID}`
          );
          let homename = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${response.data.past_games[i].hometeamID}`
        );
        let awayname = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${response.data.past_games[i].awayteamID}`
        );
          if (gameevents == []){
            alert("there is a problem with the events");
          }

          for(let item = 0; item < gameevents.data.length; item ++){
            try{
            let playername = await this.axios.get(
              `http://localhost:3000/players/playerDetails/${gameevents.data[item].playerID}`);
              
            gameevents.data[item].playerID = playername.data.full_name;
            gameevents.data[item] = "minute: " + gameevents.data[item].eventminute + ", event: " + gameevents.data[item].dataevent + ", player name: " + gameevents.data[item].playerID;
            
            } catch(error){
              gameevents.data[item] = "minute: " + gameevents.data[item].eventminute + ", event: " + gameevents.data[item].dataevent + ", player name: No name";
            }
          }
          let game = {
            id: response.data.past_games[i].gameID,
            date: response.data.past_games[i].gamedate,
            hour: response.data.past_games[i].gametime.slice(11, 19),
            hostTeam: homename.data.name,
            hostTeamID: response.data.past_games[i].hometeamID,
            guestTeam: awayname.data.name,
            guestTeamID :response.data.past_games[i].awayteamID,
            homeGoal: response.data.past_games[i].homeGoal,
            awayGoal: response.data.past_games[i].awayGoal,
            field: response.data.past_games[i].field,
            stage: response.data.past_games[i].stage,
            _showDetails: false,
            events: gameevents.data
          };
          pasGames.push(game);
        }
        this.pastgames = pasGames;
      } catch (error) {
        console.log("There are no games in the past");
        this.pastgames = [];
        return this.pastgames;
      }
    },
  },
};
</script>

<style>
button {
  margin: 2%;
  text-align: center;
}
p {
  text-align: center;
}
template {
  margin: 4%;
}
h3 {
  text-align: center;
}
#body{
  padding: 5%;
}
</style>
