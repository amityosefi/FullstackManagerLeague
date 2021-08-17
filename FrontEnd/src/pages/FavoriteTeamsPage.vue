<template>
  <div id="favorites">
    <h3>Your favorite teams are:</h3>
    <br/><br/>
    <div><FavoriteTable @remove="removefromfavorites" @team="redirect"
      :items="this.teams"
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
        { key: "name", label: "Name" },
        { key: "logo", label: "Logo", image: true },
      ],
      teams: [],
      name: "team"
    };
  },
    created(){
    this.loadFavoriteTeams(); 
    },
  methods: {
    async redirect(data){
      let teamId = "";
      for (let i=0; i < this.teams.length; i++) {
        if (this.teams[i].name == data) {
          teamId = this.teams[i].id;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },
    async removefromfavorites(item) {
      // Rows are indexed from 0, so the third row is index 2
      try {
        let response = await this.axios.delete(
          `http://localhost:3000/users/favorites/Team/${item}`
        );

        if (response.data == "Succeeded") {
          alert("This team was successfully removed from favorites");
          this.loadFavoriteTeams();
        } else {
          alert(
            "There was a problem with removing this team from favorites, please try again"
          );
        }
      } catch (error) {
        console.log(
          "There was a problem with deleting the team from favorites"
        );
      }
    },
    async loadFavoriteTeams() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams"
        );
        // if (typeof response.data == "string"){
        //   this.teams = [];
        //   return;
        // }
        let allTeams = [];
        for (let i = 0; i < response.data.length; i++) {
          let team = {
            id: response.data[i].team_id,
            name: response.data[i].team_name,
            logo: response.data[i].team_logo,
          };
          allTeams.push(team);
        }
        this.teams = allTeams;
      } catch (error) {
        console.log("There are no teams in user favorites");
        this.teams = [];
        return this.teams;
      }
    },
  },
};
</script>

<style>
button {
  margin: 2%;
}
#favorites {
  text-align: center;
  padding: 5%;
}
</style>
