<template>
  <div id="favorites">
    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <!-- scoped slot for select -->
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

      <template v-slot:cell(name)="data">
        <a @click="redirectTeamHandler(data.value)" variant="primary">{{
          data.value
        }}</a>
      </template>

      <template v-slot:cell(full_name)="data">
        <a @click="redirectplayerHandler(data.value)" variant="primary">{{
          data.value
        }}</a>
      </template>

      <template v-slot:cell(logo)="{ item }">
        <img :src="item.logo" fluid />
      </template>
    </b-table>
    <p>
      <b-button size="sm" @click="removeItem"
        >Delete {{ favoriteName }} From Favorites</b-button
      >
    </p>
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
  },
  methods: {
    redirectTeamHandler(data) {
      this.$emit("team", data);
    },
    redirectplayerHandler(data) {
      this.$emit("player", data);
    },

    onRowSelected(rows) {
      this.selected = rows;
    },
    removeItem() {
      if (this.selected == null || this.selected.length == 0) {
        alert(`You need to choose ${this.favoriteName} to delete`);
      }
      console.log(this.selected[0].id);
      this.$emit("remove", this.selected[0].id);
    },
  },
};
</script>

<style></style>
