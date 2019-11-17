<template>
  <div class="login-panel">
    <form action @submit.prevent="log()">
      <table>
        <tr>
          <td colspan="2">
            <h1>Logowanie</h1>
          </td>
        </tr>
        <tr>
          <td>
            <label for="login">Login:</label>
          </td>
          <td>
            <input type="string" name="login" placeholder="Wprowadź login" v-model="login" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="password">Hasło:</label>
          </td>
          <td>
            <input type="password" name="password" placeholder="Wprowadź hasło" v-model="password" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button>Zaloguj</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>



<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    log() {
      this.$store
        .dispatch("LOGIN", { login: this.login, password: this.password })
        .then(() => this.$router.push("/"))
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped lang="less">
table {
  top: 100px;
  margin: auto;
  position: relative;
  color: white;
  label {
    font-weight: bold;
    font-size: 16px;
    margin: 10px 5px;
    display: block;
  }
  input {
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid #e7e7e7;
    font-size: 16px;
    padding: 5px;
    color: rgba(255, 255, 255, 1);
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  button {
  }
}
</style>