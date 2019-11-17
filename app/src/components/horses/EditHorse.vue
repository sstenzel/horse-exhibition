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
              <input type="string" name="name" placeholder="Imie konia" v-model="horse.name" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="klasa">Klasa</label>
            </td>
            <td>
              <input type="number" name="klasa" placeholder="Numer klasy" v-model="horse.number" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="country">Kraj</label>
            </td>
            <td>
              <input type="string" name="country" placeholder="Kraj" v-model="horse.country" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="vintage">Rocznik</label>
            </td>
            <td>
              <input type="number" name="vintage" placeholder="Rocznik" v-model="horse.vintage" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="suit">Maść</label>
            </td>
            <td>
              <input type="string" name="suit" placeholder="Maść" v-model="horse.suit" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="sex">Płeć</label>
            </td>
            <td>
              <input type="string" name="sex" placeholder="Płeć" v-model="horse.sex" />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button @click.prevent="updateHorse">Zapisz</button>
              <button @click="closeEditPanel()">Anuluj</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>



<script>
export default {
  name: "EditHorse",

  props: {
    horseToEdit: {},
    closeEditPanel: { type: Function }
  },

  data() {
    return {
      horse: JSON.parse(JSON.stringify(this.horseToEdit))
    };
  },

  methods: {
    async updateHorse(e) {
      await this.$store.dispatch("UPDATE_HORSE", this.horse);
      this.closeEditPanel();
    }
  }
};
</script>

