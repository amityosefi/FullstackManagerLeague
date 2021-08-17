<template>
   <div class="card" style="width: 15rem; margin:auto;">
  <img :src="image" @click="redirect(coachId)" v-if="image!=null" style="width: 8rem; margin:auto;" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Coach Id: {{coachId}} </h5> 
    <p class="card-text"> <l @click="redirect(coachId)">Fullname: {{ fullname }} </l>
      <br>
    Team Name: {{ teamName }}</p>
  </div>
</div>

</template>

<script>
export default {
  name: "CoachPreview",
  data(){
    this.coach = {};
    return {
    }
  },
  props: {
      coachId: {
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
      teamName: {
        type: String,
        required: true
      },
  }, 
  methods: {
    async redirect() {

      this.$router.push({name: 'CoachPage', params: { coachId: this.coachId} });
    }
  },
    mounted(){
    console.log("coach preview mounted");
  },
};
</script>

<style>
.coach-preview {
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

.coach-preview .coach-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.coach-preview .coach-content {
  width: 100%;
  overflow: hidden;
}

</style>
