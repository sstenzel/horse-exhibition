<template>
  <div class="panel-background">
    <div class="panel">
      <div class="table">
        <div class="tr">
          <div class="th-bold">{{ horse.name }}</div>
        </div>
        <div class="tr">
          <div class="td">Typ</div>
          <div class="td">Głowa</div>
          <div class="td">Kloda</div>
          <div class="td">Nogi</div>
          <div class="td">Ruch</div>
        </div>
        <form action>
          <div class="tr" v-for="note in horse.score.notes" v-bind:key="note.id">
            <input
              type="number"
              name="type"
              placeholder="0"
              v-model="note.type"
              min="0"
              max="20"
              step="0.5"
            />
            <input
              type="number"
              name="head"
              placeholder="0"
              v-model="note.head"
              min="0"
              max="20"
              step="0.5"
            />
            <input
              type="number"
              name="chest"
              placeholder="0"
              v-model="note.chest"
              min="0"
              max="20"
              step="0.5"
            />
            <input
              type="number"
              name="legs"
              placeholder="0"
              v-model="note.legs"
              min="0"
              max="20"
              step="0.5"
            />
            <input
              type="number"
              name="movement"
              placeholder="0"
              v-model="note.movement"
              min="0"
              max="20"
              step="0.5"
            />
          </div>
          <div class="tr">
            <div class="td">
              <button @click.prevent="updateHorse()">Zapisz</button>
              <button @click="closeEditPanel()">Anuluj</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "EditResult",
  props: {
    horseId: {},
    closeEditPanel: { type: Function }
  },
  computed: {
    horse() {
      return this.$store.getters.HORSES.filter(
        horse => horse.id === this.horseId
      )[0];
    }
  },
  methods: {
    updateHorse(e) {
      this.$store.dispatch("UPDATE_HORSE", this.horse);
      this.closeEditPanel();
    }
  }
};
</script>
