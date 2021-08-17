<template>
  <div id="favorites">
    <b-table
      id="table"
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>

      <template v-slot:cell(hostTeam)="data">
        <a @click="homeHandler(data.value)" variant="primary">{{
          data.value
        }}</a>
      </template>

      <template v-slot:cell(guestTeam)="data">
        <a @click="awayHandler(data.value)" variant="primary">{{
          data.value
        }}</a>
      </template>
    </b-table>
    <div>
      <b-button size="sm" @click="removeItem"
        >{{funcName}} {{ favoriteName }} From Favotires</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      selectMode: "single",
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    favoriteName: {
      type: String,
      required: true,
    },
    funcName:{
      type: String,
      required: true,
    }
  },
  methods: {
    onRowSelected(item) {
      this.selected = item;
    },
    removeItem(){
      if(this.selected == null || this.selected.length == 0){
        alert(`You need to choose ${this.favoriteName} to delete`);
      }
      this.$emit('remove', this.selected[0].id);  
    },
    homeHandler(data){
      this.$emit('home', data);
    },
    awayHandler(data){
      this.$emit('away', data);
    }
  },
};
</script>

<style>
button {
  margin: 2%;
}

#favorites{
  text-align: center;
}
</style>
