<template>
 <div class="card" style="width: 22em; margin-left:1em; margin-bottom:1em; display: inline-block;">
  <img :src="image" style="width: 7rem; margin:auto;"  class="card-img-top" alt="..." @click="redirect(playerId)">
  <div class="card-body">
    <h5 class="card-title">Player Id: {{playerId}} </h5> 
    <p class="card-text"> <l @click="redirect(playerId)">Fullname: {{ fullname }} </l>
      <br>
      Position: {{ position }}
      <br>
    Team Name: {{ teamName }}</p>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    this.player = {}
      return {

      };
  },
  props: {
      playerId: {
        type: Number,
        required: true
      },
      fullname: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
  }, 
  mounted(){
    console.log("player preview mounted")
  },
  methods: {
      async redirect(id) {
          this.$router.push({name: 'PlayerPage', params: { playerId: id} });
    }
  } 
};
</script>

<style>
.player-preview {
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

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}

/* .player-preview .img{
    max-width: 100%;
    max-height: 100%;
    display: block; 
    position: relative;
} */

.card-columns {
    column-count: 4;
  }


</style>
