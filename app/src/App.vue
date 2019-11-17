<template>
  <div v-if="!isLoading" id="app">
    <Header title="Wystawa koni" />
    <router-view />
  </div>
  <div v-else>Ładowanie...</div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await this.$store.dispatch("GET_JUDGES");
      await this.$store.dispatch("GET_CLASSES");
      await this.$store.dispatch("GET_HORSES");
      await this.$store.dispatch("LOGIN");
      this.isLoading = false;
    }
  },
  sockets: {
    async addHorse(data) {
      await this.$store.dispatch("SOCKET_ADD_HORSE", data);
    },
    async updateHorse(data) {
      await this.$store.dispatch("SOCKET_UPDATE_HORSE", data);
    },
    async deleteHorse(data) {
      await this.$store.dispatch("SOCKET_DELETE_HORSE", data);
    }
  }
};
</script>

<style lang="less">
@blue: #33cccc;

* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background-color: #666666;
  padding-bottom: 60px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #248f8f;
}

.panel-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  .panel {
    position: fixed;
    width: 80vw;
    padding: 20px;
    top: 20vh;
    left: 10vw;
    background-color: #666666;
    color: white;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 10px 1px #666666;
    -moz-box-shadow: 0px 0px 10px 1px #666666;
    box-shadow: 0px 0px 10px 1px #666666;

    table {
      margin: auto;
      td {
        padding: 5px;
      }
    }
  }
}

button {
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
  padding: 2px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: #e7e7e7;
  }
}

.editButton {
  position: absolute;
  right: 5%;
}
.table {
  width: 90%;
  margin: 0 auto;
  display: inline-block;
  .tr {
    width: 100%;
    display: block;
    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .td {
      display: inline-block;
      width: auto;
      min-width: 100px;
      padding: 14px;
      color: white;
      input {
        width: 50px;
      }
    }

    .hover {
      &:hover {
        color: #33cccc;
      }
    }

    .th-bold {
      display: inline-block;
      width: 30%;
      padding: 20px;
      color: white;
      font-weight: bold;
      &:first-child,
      &:last-child {
        font-size: 24px;
        cursor: pointer;
        &:hover {
          color: #33cccc;
        }
      }
    }
    .close-button {
      display: inline-block;
      width: 30%;
      padding: 20px;
      color: white;
      font-weight: bold;
      &:hover {
        color: #33cccc;
      }
    }
    .hidden {
      visibility: hidden;
      width: 10%;
      margin: 20px;
      margin-left: 10%;
    }
    input {
      width: 9%;
      margin: 10px;
      margin-right: 20px;
    }
  }
  .klasa {
    width: 100%;
    height: 30px;
    border: 3px solid #248f8f;
    padding: 5px;
    margin-top: 10px;
    color: white;
  }
}
</style>
