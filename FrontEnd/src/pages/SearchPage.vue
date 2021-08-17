<template>
  <div class="search">
    <h1 class="title">Search Page</h1>
    <br />
    <nav class="navbar navbar-expand-lg">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <a class="nav-link disabled" href="#">Name:</a>
          <input
            class="form-control"
            v-model="searchQuery"
            type="search"
            placeholder="Enter Name"
            aria-label="Search"
          />
        </ul>
        <div class="form-inline">
          <a class="nav-link disabled" href="#">Filter:</a>
          <b-form-select
            v-model="searchSelected"
            :options="searchOptions"
          ></b-form-select>
          <a
            v-if="searchSelected == 'Position Id'"
            class="nav-link disabled"
            href="#"
            >Position Id:</a
          >
          <input
            class="form-control"
            v-model="msgI"
            v-if="searchSelected == 'Position Id'"
            type="search"
            id="input-1"
            placeholder="Enter Position Id"
            aria-label="Search"
          />
          <a
            v-if="searchSelected == 'Team Name'"
            class="nav-link disabled"
            href="#"
            >Team Name:</a
          >
          <input
            class="form-control"
            v-if="searchSelected == 'Team Name'"
            v-model="msgT"
            type="search"
            id="input-1"
            placeholder="Enter Team Name"
            aria-label="Search"
          />
        </div>
        <!-- <button class="btn btn-outline-success ml-3"  id="n1" type="submit" v-on:click="search">Search</button> -->
        <button
          class="btn btn-outline-success mr-3 ml-3"
          type="submit"
          v-on:click="search()"
        >
          New Search
        </button>
        <button
          class="btn btn-outline-success ml-0"
          id="n1"
          type="submit"
          v-on:click="resetSearch()"
        >
          Reset search
        </button>
      </div>
    </nav>
    <br />
    <div></div>

    <div
      v-if="
        found == false &&
        players != 'notFound' &&
        coaches != 'notFound' &&
        teams != 'notFound'
      "
    >
      <br />
      Searching .....
    </div>

    <div v-if="showLastSearch == true">
        query: {{ this.query }}
        <br />
        <br />
    </div>

    <div v-if="filterId == true">
      <div v-if="players == 'notFound'">
        No results matched your search query
        <br />
        <br />
      </div>
      <div v-else-if="players != 'notFound' && found == true">
        Player results:
        <br />
        <PlayerPreview
          v-for="p in players"
          :playerId="p.player_id"
          :fullname="p.full_name"
          :image="p.image"
          :position="p.position"
          :teamName="p.team_name"
          :key="p.player_id"
        ></PlayerPreview>
      </div>
    </div>

    <div v-if="filternName == true">
      <div v-if="players == 'notFound' && coaches == 'notFound'">
        <br />
        No results matched your search query
      </div>
      <div v-if="players != 'notFound' && found == true">
        Players results:
        <b-dropdown variant="Default" text="Sort">
          <b-dropdown-item @click="sortPlayers(1)">Player Name</b-dropdown-item>
          <b-dropdown-item @click="sortPlayers(2)">Team Name</b-dropdown-item>
        </b-dropdown>
        <br />
        <PlayerPreview
          v-for="p in players"
          :playerId="p.player_id"
          :fullname="p.full_name"
          :image="p.image"
          :position="p.position"
          :teamName="p.team_name"
          :key="p.player_id"
        ></PlayerPreview>
        <br />
      </div>
      <br />
      <div v-if="coaches != 'notFound' && found == true">
        Coaches results:
        <b-dropdown variant="Default" text="Sort">
          <b-dropdown-item @click="sortCoaches()">Team Name</b-dropdown-item>
        </b-dropdown>
        <br />
        <CoachPreview
          v-for="c in coaches"
          :coachId="c.coach_id"
          :fullname="c.full_name"
          :image="c.image"
          :teamName="c.team_name"
          :key="c.coach_id"
        ></CoachPreview>
      </div>
    </div>

    <div v-if="none == true">
      <div
        v-if="
          players == 'notFound' && coaches == 'notFound' && teams == 'notFound'
        "
      >
        No results matched your search query
      </div>
      <div v-if="players != 'notFound' && found == true">
        Players results:
        <b-dropdown variant="Default" text="Sort">
          <b-dropdown-item @click="sortPlayers(1)">Player Name</b-dropdown-item>
          <b-dropdown-item @click="sortPlayers(2)">Team Name</b-dropdown-item>
        </b-dropdown>
        <br />
        <PlayerPreview
          v-for="p in players"
          :playerId="p.player_id"
          :fullname="p.full_name"
          :image="p.image"
          :position="p.position"
          :teamName="p.team_name"
          :key="p.player_id"
        ></PlayerPreview>
        <br />
        <br />
      </div>

      <div v-if="coaches != 'notFound' && found == true">
        Coaches results:
        <b-dropdown variant="Default" text="Sort">
          <b-dropdown-item @click="sortCoaches()">Team Name</b-dropdown-item>
        </b-dropdown>
        <br />
        <CoachPreview
          v-for="c in coaches"
          :coachId="c.coach_id"
          :fullname="c.full_name"
          :image="c.image"
          :teamName="c.team_name"
          :key="c.coach_id"
        ></CoachPreview>
        <br />
      </div>

      <div v-if="teams != 'notFound' && found == true">
        Teams results:
        <b-dropdown variant="Default" text="Sort">
          <b-dropdown-item @click="sortTeams()">Team Name</b-dropdown-item>
        </b-dropdown>
        <br />
        <TeamPreview
          v-for="t in teams"
          :team_id="t.team_id"
          :team_name="t.team_name"
          :team_logo="t.team_logo"
          :key="t.team_id"
        ></TeamPreview>
      </div>
    </div>
  </div>
</template>


<script>
import PlayerPreview from "../components/PlayerPreview";
import CoachPreview from "../components/CoachPreview";
import TeamPreview from "../components/TeamPreview";
export default {
  components: {
    PlayerPreview,
    CoachPreview,
    TeamPreview,
  },

  data() {
    return {
      searchQuery: "",
      filterId: "",
      filternName: "",
      none: "",
      msgI: "",
      msgT: "",
      players: "",
      coaches: "",
      teams: "",
      found: "",
      lastSearch: "",
      showLastSearch: "",
      view: "",
      query: "",
      searchSelected: null,
      searchOptions: [
        { value: null, text: "None" },
        { value: "Position Id", text: "Position Id" },
        { value: "Team Name", text: "Team Name" },
      ],
    };
  },

  methods: {
    sortPlayers(x) {
      if (x == 1) {
        //sort by player name
        this.players.sort(function (a, b) {
          let nameA = a.full_name.toUpperCase(); // ignore upper and lowercase
          let nameB = b.full_name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }
      if (x == 2) {
        //sort by team name
        this.players.sort(function (a, b) {
          let nameA = a.team_name.toUpperCase(); // ignore upper and lowercase
          let nameB = b.team_name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }
    },
    sortCoaches() {
      this.coaches.sort(function (a, b) {
        let nameA = a.team_name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.team_name.toUpperCase(); // ignore upper and lowercase
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
    sortTeams() {
      this.teams.sort(function (a, b) {
        let nameA = a.team_name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.team_name.toUpperCase(); // ignore upper and lowercase
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
    async search() {
      this.found = undefined;
      this.players = [];
      this.coaches = [];
      this.teams = [];
      this.showLastSearch = false;
      this.filterId = false;
      this.filternName = false;
      this.none = false;

      if (this.searchSelected == "Position Id") {
        if (this.msgI.length == 0 || this.searchQuery.length == 0) {
          alert("Please fill all the filelds");
        } else if (/[^a-z]/i.test(this.searchQuery)) {
          alert("Name should contains only letters");
        } else if (!(Number(this.msgI) >= 0)) {
          alert("Position id must be a valid number");
        } else {
          this.filterId = true;
          this.filternName = false;
          this.none = false;
          this.found = false;
          try {
            const response = await this.axios.get(`http://localhost:3000/users/searchByNameFilterWithPositionId/${this.searchQuery}/${this.msgI}`, {});

            if (response.data.length == 0) {
              this.players = "notFound";
            } else {
              this.players = response.data;
              this.found = true;
            }

            this.query = `${this.searchQuery}/${this.msgI}`;

            this.lastSearch = {
              selected: "Position Id",
              query: this.query,
              players: this.players,
            };

            this.$root.store.setLastSearch(this.lastSearch);
          } catch (err) {
            this.players = "notFound";
          }
        }
      } else if (this.searchSelected == "Team Name") {
        if (this.msgT.length == 0 || this.searchQuery.length == 0) {
          alert("Please fill all the filelds");
        } else if (/[^a-z]/i.test(this.searchQuery)) {
          alert("Name should contains only letters");
          // alert(this.found);
        } else if (/[^a-z]/i.test(this.msgT)) {
          alert("Team name should contains only letters");
        } else {
          this.filterId = false;
          this.filternName = true;
          this.none = false;
          this.found = false;
          try {
            const response = await this.axios.get(`http://localhost:3000/users/searchByNameFilterWithTeamName/${this.searchQuery}/${this.msgT}`, {});
            // console.log(response);

            if (response.data.players.length == 0) {
              this.players = "notFound";
            } else {
              this.players = response.data.players;
              this.found = true;
            }
            if (response.data.coaches.length == 0) {
              this.coaches = "notFound";
            } else {
              this.coaches = response.data.coaches;
              this.found = true;
            }

            this.query = `${this.searchQuery}/${this.msgT}`;

            this.lastSearch = {
              selected: "Team Name",
              query: this.query,
              players: this.players,
              coaches: this.coaches,
            };

            this.$root.store.setLastSearch(this.lastSearch);
          } catch (err) {
            this.players = "notFound";
            this.coaches = "notFound";
          }
        }
      } else {
        this.filterId = false;
        this.filternName = false;
        this.none = true;
        this.found = undefined;
        if (this.searchQuery.length == 0) {
          alert("Please fill all the filelds");
        } else if (/[^a-z]/i.test(this.searchQuery)) {
          alert("Name should contains only letters");
          // alert(this.found);
        } else {
          this.found = false;
          try {
            const response = await this.axios.get(`http://localhost:3000/users/searchByName/${this.searchQuery}`, {});

            if (response.data.players.length == 0) {
              this.players = "notFound";
            } else {
              this.players = response.data.players;
              this.found = true;
            }
            if (response.data.coaches.length == 0) {
              this.coaches = "notFound";
            } else {
              this.coaches = response.data.coaches;
              this.found = true;
            }
            if (response.data.teams.length == 0) {
              this.teams = "notFound";
            } else {
              this.teams = response.data.teams;
              this.found = true;
            }

            this.query = this.searchQuery;

            this.lastSearch = {
              selected: "None",
              query: this.query,
              players: this.players,
              coaches: this.coaches,
              teams: this.teams,
            };

            this.$root.store.setLastSearch(this.lastSearch);

            // console.log(this.lastSearch);
            // console.log(this.$root.store.lastSearch);

          } catch (err) {
            this.players = "notFound";
            this.coaches = "notFound";
            this.teams = "notFound";
          }
        }
      }
    },
    resetSearch() {
      this.searchQuery = "";
      this.searchSelected = null;
  
    },
  },
  mounted() {
    this.found = undefined;
    this.showLastSearch = false;
  },
};
</script>

<style scoped>
.search {
  text-align: center;
}

#search-input {
  margin: auto;
  width: 400px;
  padding: 10px;
  align-items: center;
}

.mt-2 {
  width: 400px;
  margin: auto;
}

#mt-3 {
  width: 200px;
  margin-top: 5px;
  /* margin-bottom: auto;
  margin-right: auto;
  margin-left: auto; */
}

.center {
  margin: auto;
}

#in {
  margin: auto;
  width: 150px;
}

#input-1 {
  width: 170px;
}

.navbar-nav {
  margin-left: auto;
}

.navbar-nav2 {
  display: inline;
}

#n1 {
  margin: auto;
}
</style>