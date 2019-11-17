<template>
  <div class="hello">
    <h1>Wyniki</h1>
    <div v-if="classes.length === 0">
      <h1>Brak klas</h1>
    </div>
    <div class="table" v-else>
      <div class="tr">
        <div class="th-bold" @click="prevClass" v-if="!arbitratorMode">&lt;</div>
        <div
          class="th-bold"
        >KLASA {{ currentClassId }} {{currentClass.finished ? " - ZAKOŃCZONA" : ""}}</div>
        <div class="th-bold" @click="nextClass" v-if="!arbitratorMode">&gt;</div>
      </div>
      <div class="tr">
        <div class="td" v-if="currentClass.finished">Miejsce</div>
        <div class="td">Koń</div>
        <div class="td">Typ</div>
        <div class="td">Głowa</div>
        <div class="td">Kloda</div>
        <div class="td">Nogi</div>
        <div class="td">Ruch</div>
        <div class="td">Suma</div>
        <div class="td" v-if="!currentClass.finished"></div>
        <div class="td" v-if="!currentClass.finished && arbitratorMode">Rozjemca</div>
      </div>
      <div class="tr" v-for="(horse) in currentClassSummary" v-bind:key="horse.id">
        <div class="td" v-if="currentClass.finished">{{ horse.place }}</div>
        <div class="td">{{ horse.name }}</div>
        <div class="td">{{ horse.notes.type }}</div>
        <div class="td">{{ horse.notes.head }}</div>
        <div class="td">{{ horse.notes.chest }}</div>
        <div class="td">{{ horse.notes.legs }}</div>
        <div class="td">{{ horse.notes.movement }}</div>
        <div class="td">{{ horse.notes.sum }}</div>

        <div
          class="td hover"
          v-if="!currentClass.finished && !arbitratorMode && isAuth"
          @click="openEditPanel(horse.id)"
        >Edytuj</div>
        <div class="td" v-if="arbitratorMode && horse.arbitratorNeeded != null">
          <input type="number" placeholder="0" v-model="horse.arbitrator" min="1" step="1" />
        </div>
      </div>
      <div class="tr">
        <div
          class="close-button"
          v-if="!currentClass.finished && !arbitratorMode && isAuth"
          @click.prevent="closeClass"
        >Zakończ</div>
        <div
          class="close-button"
          v-if="!currentClass.finished && arbitratorMode"
          @click.prevent="confirmArbitrator"
        >Potwierdź</div>
      </div>
    </div>
    <EditResult :horseId="selectedHorseId" :closeEditPanel="closeEditPanel" v-if="editPanelOpened"></EditResult>
  </div>
</template>

<script>
import EditResult from "./EditResult.vue";

export default {
  name: "Results",
  components: {
    EditResult
  },
  data() {
    return {
      editPanelOpened: false,
      selectedHorseId: {},
      currentClassId: 1,
      arbitratorMode: false
    };
  },

  mounted() {
    if (this.classes.length != 0) {
      this.currentClassId = this.classes[0].id;
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters.LOGGED;
    },
    classes() {
      return this.$store.getters.CLASSES;
    },
    currentClass() {
      console.log(this.classes.length === 0);
      return this.$store.getters.CLASSES.filter(
        item => item.id === this.currentClassId
      )[0];
    },
    currentClassHorses() {
      return this.$store.getters.HORSES.filter(
        horse => horse.classId === this.currentClassId
      );
    },
    currentClassSummary() {
      let summary = this.sortHorses(
        this.currentClassHorses.map(horse => {
          return {
            id: horse.id,
            name: horse.name,
            number: horse.number,
            notes: this.getHorseSummary(horse.score.notes),
            arbitrator: horse.score.arbitrator
          };
        })
      );
      if (this.currentClass.finished) {
        summary.forEach((item, index) => {
          item.place = index + 1;
        });
      }
      return summary;
    }
  },

  methods: {
    prevClass() {
      let currentClassIndex = this.classes.findIndex(
        el => el.id === this.currentClassId
      );
      if (currentClassIndex > 0) {
        this.currentClassId = this.classes[currentClassIndex - 1].id;
      }
    },
    nextClass() {
      let currentClassIndex = this.classes.findIndex(
        el => el.id === this.currentClassId
      );
      if (currentClassIndex < this.classes.length - 1) {
        this.currentClassId = this.classes[currentClassIndex + 1].id;
      }
    },

    getHorseSummary(notes) {
      let summary = {
        type: 0.0,
        head: 0.0,
        chest: 0.0,
        legs: 0.0,
        movement: 0.0,
        sum: 0.0
      };
      notes.forEach(note => {
        summary.type += parseFloat(note.type);
        summary.head += parseFloat(note.head);
        summary.chest += parseFloat(note.chest);
        summary.legs += parseFloat(note.legs);
        summary.movement += parseFloat(note.movement);
        summary.sum += this.getSum(note);
      });
      return summary;
    },

    getSum(note) {
      return (
        parseFloat(note.type) +
        parseFloat(note.head) +
        parseFloat(note.chest) +
        parseFloat(note.legs) +
        parseFloat(note.movement)
      );
    },

    getHorseResult(notes) {
      let sum = 0;
      notes.forEach(note => {
        sum += this.getSum(note);
      });
      return sum;
    },

    setEditMode() {
      this.editMode = !this.editMode;
    },

    sortHorses(array) {
      function compare(a, b) {
        if (a.notes.sum > b.notes.sum) return -1;
        if (a.notes.sum < b.notes.sum) return 1;

        if (a.notes.type > b.notes.type) return -1;
        if (a.notes.type < b.notes.type) return 1;

        if (a.notes.movement > b.notes.movement) return -1;
        if (a.notes.movement < b.notes.movement) return 1;

        if (a.arbitrator < b.arbitrator) return -1;
        if (a.arbitrator > b.arbitrator) return 1;

        return 0;
      }

      return array.sort(compare);
    },

    closeClass(el) {
      this.currentClassSummary.forEach((horse, index) => {
        if (index < this.currentClassSummary.length - 1) {
          let nextHorse = this.currentClassSummary[index + 1];
          if (horse.notes.sum === nextHorse.notes.sum) {
            if (horse.notes.type === nextHorse.notes.type) {
              if (horse.notes.movement === nextHorse.notes.movement) {
                horse.arbitratorNeeded = true;
                nextHorse.arbitratorNeeded = true;
                this.arbitratorMode = true;
              }
            }
          }
        }
      });
      if (!this.arbitratorMode) {
        this.arbitratorMode = false;
        this.currentClass.finished = true;
        this.$store.dispatch("UPDATE_CLASS", this.currentClass);
      }
    },

    confirmArbitrator() {
      this.arbitratorMode = false;
      this.currentClassSummary.forEach(item => {
        if (item.arbitratorNeeded) {
          let horse = this.currentClassHorses.filter(
            el => el.id === item.id
          )[0];
          horse.score.arbitrator = item.arbitrator;
          this.$store.dispatch("UPDATE_HORSE", horse);
        }
      });
      this.currentClass.finished = true;
      this.$store.dispatch("UPDATE_CLASS", this.currentClass);
    },

    openEditPanel(id) {
      this.selectedHorseId = id;
      this.editPanelOpened = true;
    },
    closeEditPanel() {
      this.editPanelOpened = false;
      this.selectedHorseId = 0;
    }
  }
};
</script>
<style scoped>
.table .tr .td {
  min-width: 110px !important;
}
</style>
