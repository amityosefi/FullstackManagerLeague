<template>
   <div class="card" style="width: 22em; margin-left:1em; margin-bottom:1em; display: inline-block;">
  <img :src="team_logo" style="width: 7rem; margin:auto;"  class="card-img-top" alt="..." @click="redirect(playerId)">
  <div class="card-body">
    <h5 class="card-title">Team Id: {{team_id}} </h5> 
    <p class="card-text"> <l @click="redirect(team_id)">Team Name: {{ team_name }} </l> </p>
</div>
   </div>
  
</template>

<script>
export default {
name: "TeamPreview",
  data() {
    this.team = {}
      return {

      };
  },
  props: {
      team_id: {
        type: Number,
        required: true
      },
      team_name: {
        type: String,
        required: true
      },
      team_logo: {
        type: String,
        required: true
      },
  }, 
  methods: {
      async redirect() {
        this.$router.push({name: 'TeamHomePage', params: {teamId: this.team_id} });
    }
  },
  mounted(){
    console.log("team preview mounted")
  }, 
};
</script>

<style>
.team-preview {
  display: inline-block;
  width: 500;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}

/* .player-preview .img{
    max-width: 100%;
    max-height: 100%;
    display: block; 
    position: relative;
} */

</style>
