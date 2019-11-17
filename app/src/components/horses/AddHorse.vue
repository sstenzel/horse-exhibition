<template>
  <div class="panel-background">
    <div class="panel">
      <h1>Dane konia</h1>
      <form action>
        <table>
          <tr>
            <td>
              <label for="name">Nazwa</label>
            </td>
            <td>
              <input type="string" name="name" placeholder="Imie konia" v-model="horse.name" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="klasa">Klasa</label>
            </td>
            <td>
              <input type="number" name="klasa" placeholder="Numer klasy" v-model="horse.classId" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="country">Kraj</label>
            </td>
            <td>
              <input type="string" name="country" placeholder="Kraj" v-model="horse.country" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="vintage">Rocznik</label>
            </td>
            <td>
              <input type="number" name="vintage" placeholder="Rocznik" v-model="horse.vintage" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="suit">Maść</label>
            </td>
            <td>
              <input type="string" name="suit" placeholder="Maść" v-model="horse.suit" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="sex">Płeć</label>
            </td>
            <td>
              <input type="string" name="sex" placeholder="Płeć" v-model="horse.sex" required/>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button @click.prevent="addHorse">Dodaj</button>
              <button @click="closeAddPanel()">Anuluj</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>



<script>
export default {
  name: "AddHorse",

  props: {
    closeAddPanel: { type: Function }
  },

  data() {
    return {
      horse: {}
    };
  },
  methods: {
    async addHorse(e) {
      await this.$store.dispatch("ADD_HORSE", this.horse);
      this.closeAddPanel();
    }
  }
};
</script>

