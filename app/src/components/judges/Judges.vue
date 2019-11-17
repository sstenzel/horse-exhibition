<template>
  <div class="judges">
    <h1>Lista sędziów</h1>
    <div v-if="judges.length > 0" class="table">
      <div class="tr">
        <div class="td">Imie</div>
        <div class="td">Kraj</div>
      </div>
      <div class="tr" v-for="judge in judges" v-bind:key="judge.id">
        <div class="td">{{ judge.judge }}</div>
        <div class="td">{{ judge.country }}</div>
      </div>
    </div>
    <div v-else>---</div>
  </div>
</template>



<script>
export default {
  name: "Judges",
  props: {
    title: String
  },
  computed: {
    judges() {
      return this.$store.getters.JUDGES;
    }
  }
};
</script>


<style scoped lang="less">
.table .tr .td {
  min-width: 160px;
}
</style>