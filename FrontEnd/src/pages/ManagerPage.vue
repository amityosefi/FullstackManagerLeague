<template>
  <div id="manager">
    <div>
      <br /><br />
      <h3>Welcome to Manager page</h3>
      <br />
      <h5>
        Here you can choose some options to update the games in the league
      </h5>
      <br /><br />
      <b-button v-b-toggle.collapse-3 variant="primary"
        >Add Game To League</b-button
      >

      <b-collapse id="collapse-3" class="mt-2">
        <b-card>
          <div>
            <b-form
              @submit="onSubmitaddgame"
              @reset="onResetaddgame"
              v-if="show"
            >
              <b-form-group
                id="input-group-8"
                label="choose date for the game:"
                label-for="input-8"
              >
                <b-col md="auto">
                  <b-form-datepicker
                    v-model="gamedate"
                    :min="mindate"
                    required
                    calendar-width="5"
                    locale="en-us"
                  ></b-form-datepicker>
                </b-col>
              </b-form-group>

              <b-form-group
                id="input-group-9"
                label="Choose time of the game"
                label-for="input-9"
              >
                <b-form-timepicker
                  id="input-9"
                  v-model="gametime"
                  required
                  locale="en"
                ></b-form-timepicker>
              </b-form-group>
              
              <b-form-group
                id="input-group-10"
                label="Please enter home team id:"
                label-for="input-10"
              >
                <b-form-input
                  id="input-10"
                  v-model="gamehome"
                  type="number"
                  placeholder="Enter home team id"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-11"
                label="Please enter away team id:"
                label-for="input-11"
              >
                <b-form-input
                  id="input-11"
                  type="number"
                  v-model="gameaway"
                  placeholder="Enter away team id"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-12"
                label="Please enter stadium name:"
                label-for="input-12"
              >
                <b-form-select
                  id="input-12"
                  v-model="gamefield"
                  :options="stadiums"
                  required
                ></b-form-select>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <br /><br /><br />
          </div>
        </b-card>
      </b-collapse>
      <br /><br />

      <b-button v-b-toggle.collapse-1 variant="primary"
        >Update Past Game Score</b-button
      >
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <div>
            <b-form
              @submit="onSubmitaddscore"
              @reset="onResetaddscore"
              v-if="show"
            >
              <b-form-group
                id="input-group-3"
                label="choose game:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="form.game"
                  :options="gamesToAddScore"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Home score: (numbers only)"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  type="number"
                  v-model="form.home"
                  placeholder="Enter score"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Away score: (numbers only)"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.away"
                  placeholder="Enter score"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <br /><br /><br />
          </div>
        </b-card>
      </b-collapse>

      <br /><br />
      <b-button v-b-toggle.collapse-2 variant="primary"
        >Add Game Event</b-button
      >
      <b-collapse id="collapse-2" class="mt-2">
        <b-card>
          <div>
            <b-form
              @submit="onSubmitaddevent"
              @reset="onResetaddevent"
              v-if="show"
            >
              <b-form-group
                id="input-group-4"
                label="choose game:"
                label-for="input-4"
              >
                <b-form-select
                  id="input-4"
                  v-model="formeventgame"
                  :options="gamesToAddEvent"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Choose minute of the event: (numbers only)"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  type="number"
                  v-model="formeventminute"
                  placeholder="Enter minute"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="choose the event type:"
                label-for="input-6"
              >
                <b-form-select
                  id="input-6"
                  v-model="formeventtype"
                  :options="eventTypes"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-7"
                label="Please enter the player ID: (numbers only)"
                label-for="input-7"
              >
                <b-form-input
                  id="input-7"
                  type="number"
                  v-model="formeventplayerid"
                  placeholder="Enter player id"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <br /><br /><br />
          </div>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.getfutureGames();
    this.getpastGames();
    
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      form: {
        game: null,
        away: "",
        home: "",
      },
      formeventgame: null,
      formeventminute: "",
      formeventtype: null,
      formeventplayerid: "",
      gamesToAddScore: [{ text: "Select One", value: null }],
      gamesToAddEvent: [{ text: "Select One", value: null }],
      fields: [{text: "Select one", value: null}],
      teams: [{text: "Select one", value: null}],
      eventTypes: ["Goal", "Offside", "Foul", "Yello-card", "Red-card", "Injury", "Subtitution"],
      show: true,
      gamedate: "",
      gametime: "",
      gamehome: "",
      gameaway: "",
      gamefield: "",
      stadiums: [],
      mindate: minDate,
    };
  },
  methods: {
    async onSubmitaddscore(event) {
      if (isNaN(this.form.home) || isNaN(this.form.away)) {
        alert("Please insert numbers only");
        this.onResetaddscore(event);
      }
      if (!this.form.game) {
        alert("Please select a game");
      } else {
        await this.addscore();
        this.onResetaddscore(event);
        // alert("the score was added successfully");
      }
    },
    onResetaddscore(event) {
      event.preventDefault();
      // Reset our form values
      this.form.home = "";
      this.form.away = "";
      this.form.game = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async onSubmitaddevent(event) {
      await this.submit_event();
      this.onResetaddevent(event);
    },
    onResetaddevent(event) {
      event.preventDefault();
      this.formeventgame = null;
      this.formeventminute = "";
      this.formeventtype = null;
      this.formeventplayerid = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async onSubmitaddgame(event) {
      if (!this.gamedate || !this.gametime || !this.gamehome || !this.gameaway || !this.gamefield) {
        alert("You need to fill all fields");
        return;
      } else {
        if(this.gamehome == this.gameaway){
          alert("Please choose a different teams");
          return;
        }
        else{
          const date = this.gamedate.split('-');
          this.gamedate = date[2] + ":" + date[1] + ":" + date[0];

          await this.submitGame();
          this.onResetaddgame(event);
        }
      }
    },
    onResetaddgame(event) {
      event.preventDefault();
      this.gamedate = "";
      this.gametime = "";
      this.gamehome = "";
      this.gameaway = "";
      this.gamefield = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async getpastGames() {
      this.gamesToAddEvent = [];
      try {
        let response = await this.axios.get(
          "http://localhost:3000/league/pastgames"
        );
        response = response.data.past_games;
        for (let i = 0; i < response.length; i++) {
          let game = {
            id: response[i].gameID,
            date: response[i].gamedate,
            hostTeam: response[i].hometeamID,
            guestTeam: response[i].awayteamID,
          };

          this.gamesToAddEvent.push(
            "game id: " +
              game.id +
              ", date: " +
              game.date +
              ", home team: " +
              game.hostTeam +
              ", away team: " +
              game.guestTeam
          );
        }
      } catch (error) {
        console.log("There are no games in the past");
        this.games = [];
        return this.games;
      }
    },

    async getfutureGames() {
      this.gamesToAddScore = [];
      try {
        let response = await this.axios.get(
          "http://localhost:3000/league/futuregames"
        );
        const fields = await this.axios.get(
          "http://localhost:3000/league/getStadiums"
        );
        for (const item of fields.data) {
          this.stadiums.push(item.name);
        }

        // this.futuregames = [];
        for (let i = 0; i < response.data.length; i++) {
          let game = {
            id: response.data[i].gameID,
            date: response.data[i].gamedate,
            hostTeam: response.data[i].hometeamID,
            guestTeam: response.data[i].awayteamID,
          };
          this.gamesToAddScore.push(
            "game id: " +
              game.id +
              ", date: " +
              game.date +
              ", home team: " +
              game.hostTeam +
              ", away team: " +
              game.guestTeam
          );
        }
      } catch (error) {
        console.log("There are no games in the future");
        this.games = [];
        return this.games;
      }
    },
    async addscore() {
      try {
        const response = await this.axios.put(
          "http://localhost:3000/manager/addScore",
          {
            gameId: this.form.game.slice(9, 14),
            homegoal: this.form.home,
            awaygoal: this.form.away,
          }
        );
        alert(response.data);
        this.getfutureGames();
        this.getpastGames();
      } catch (error) {
        console.log("There was a problem with adding score to that game");
      }
    },
    async submit_event() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/manager/addEvent",
          {
            gameID: this.formeventgame.slice(9, 14),
            eventminute: this.formeventminute,
            dataevent: this.formeventtype,
            playerID: this.formeventplayerid,
          }
        );
        alert(response.data);
      } catch (error) {
        console.log("There problem with adding event to game");
      }
    },
    async submitGame(){
      try {
        const response1 = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${this.gamehome}`
        );

        if(!response1.data.league){
          alert("Home team id is not defined");
          return;
        }
        const response2 = await this.axios.get(
          `http://localhost:3000/teams/teamLeague/${this.gameaway}`
        );

        if(!response2.data.league){
          alert("Away team id is not defined");
          return;
        }

        const response = await this.axios.post(
          "http://localhost:3000/manager/addGame",
          {
            gamedate: this.gamedate,
            gametime: this.gametime,
            hometeamID: this.gamehome,
            awayteamID: this.gameaway,
            field: this.gamefield,
            referee: "Andrew Dallas"
          }
        );
        alert(response.data);
        this.getfutureGames();
      } catch (error) {
        console.log("There problem with adding this game");
      }
    },
  },
};
</script>

<style>
#manager {
  text-align: center;
}
</style>
