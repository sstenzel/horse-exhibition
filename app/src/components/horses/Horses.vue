<template>
  <div class="horses">
    <h1>Lista koni</h1>
    <div class="addButton">
      <button @click="openAddPanel()">Dodaj</button>
    </div>
    <div class="table">
      <div class="tr">
        <div class="td">Nazwa</div>
        <div class="td">Klasa</div>
        <div class="td">Kraj</div>
        <div class="td">Rocznik</div>
        <div class="td">Maść</div>
        <div class="td">Płeć</div>
        <div class="td">Opcje</div>
      </div>
      <div class="tr" v-for="horse in horses" v-bind:key="horse.id">
        <div class="td">{{ horse.name }}</div>
        <div class="td">{{ horse.number }}</div>
        <div class="td">{{ horse.classId }}</div>
        <div class="td">{{ horse.country }}</div>
        <div class="td">{{ horse.vintage }}</div>
        <div class="td">{{ horse.suit }}</div>
        <div class="td">{{ horse.sex }}</div>

        <div class="td">
          <button @click="openEditPanel(horse)">Edytuj</button>
          <button @click="deleteHorse(horse.id)">Usuń</button>
        </div>
      </div>
    </div>
    <EditHorse :horseToEdit="horseToEdit" :closeEditPanel="closeEditPanel" v-if="editPanelOpened"></EditHorse>
    <AddHorse :closeAddPanel="closeAddPanel" v-if="addPanelOpened"></AddHorse>
  </div>
</template>



<script>
import EditHorse from "@/components/horses/EditHorse.vue";
import AddHorse from "@/components/horses/AddHorse.vue";

export default {
  name: "Horses",

  components: {
    EditHorse,
    AddHorse
  },

  computed: {
    horses() {
      return this.$store.getters.HORSES;
    }
  },
  mounted() {
    console.log(this.horses);
  },
  data() {
    return {
      editPanelOpened: false,
      addPanelOpened: false,
      horseToEdit: {}
    };
  },

  methods: {
    async deleteHorse(id) {
      await this.$store.dispatch("DELETE_HORSE", id);
    },
    openEditPanel(horse) {
      this.horseToEdit = horse;
      this.editPanelOpened = true;
    },
    openAddPanel() {
      this.addPanelOpened = true;
    },
    closeEditPanel() {
      this.editPanelOpened = false;
    },
    closeAddPanel() {
      this.addPanelOpened = false;
    }
  }
};
</script>

