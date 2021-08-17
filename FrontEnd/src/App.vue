<template>
  <div id="app" > 
    <div class="app" v-if="!$root.store.username" >
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{ name: 'main' }">Superliga</b-navbar-brand>
        <!-- left side -->
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
          <b-nav-item :to="{ name: 'Search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'CurrentStageGames' }">Current Stage Games</b-nav-item>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
          </b-navbar-nav>
          <!-- right side -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>hello guest</b-nav-item>
            <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
            <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view />
    </div>
    <div class="app" v-else>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{ name: 'main' }">Superliga</b-navbar-brand>
          <!-- left side -->
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'Search' }">Search</b-nav-item>
              <b-nav-item :to="{ name: 'CurrentStageGames' }">Current Stage Games</b-nav-item>
              <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
              <b-nav-item-dropdown right>
                <template #button-content>Personal</template>
                <b-dropdown-item :to="{ name: 'FavoriteGames' }">Favorite games</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'FavoriteTeams' }">Favorite teams</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'FavoritePlayers' }">Favorite players</b-dropdown-item>
                <b-dropdown-item v-if="$root.store.username == 'amit'" :to="{ name: 'Manager' }">Manager options</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
            <!-- right side -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item>
                <h5>{{$root.store.username}}</h5>
              </b-nav-item>
                <b-nav-item :to="{ name: 'main' }" v-on:click="Logout">Log Out</b-nav-item>
                <!-- <b-dropdown-item v-on:click="Logout" href="#">Log Out</b-dropdown-item> -->
              </b-navbar-nav>
          </b-collapse>
      </b-navbar>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/Logout",

        );
      } catch(error){
        console.log("there was a problem in the logout from server");
      }
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.axios.defaults.withCredentials = false;
      this.$router.push("/").catch(() => {
      // this.$forceUpdate();
      });

    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

.app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
router-view{
  background: url('assets/download.jpg');
}
</style>
