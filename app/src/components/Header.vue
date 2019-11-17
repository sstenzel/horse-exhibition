<template>
  <div class="navigation">
    <div class="navigation__content">
      <div class="title">
        <h1>{{title}}</h1>
      </div>
      <div class="navigation__menu">
        <ul>
          <li class="navigation__item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'results' }"
            >Wyniki</router-link>
          </li>
          <li class="navigation__item" v-if="isAuth">
            <router-link class="nav-link" active-class="active" exact :to="{ name: 'horses' }">Konie</router-link>
          </li>
          <!-- <li class="navigation__item" v-if="isAuth">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'judges' }"
            >Sędziowie</router-link>
          </li> -->
          <li class="navigation__item" v-if="!isAuth">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'login' }"
            >Zaloguj</router-link>
          </li>
          <li class="navigation__item logout-button" v-if="isAuth" @click="logout">Wyloguj</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Header",
  props: {
    title: String
  },
  computed: {
    isAuth() {
      return this.$store.getters.LOGGED;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    }
  }
};
</script>


<style scoped lang="less">
@blue: #33cccc;

.logout-button {
  color: white !important;
  &:hover {
    color: #33cccc !important;
  }
}

.navigation {
  width: 100%;
  .navigation__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: row;
    background-color: #666666;
    -webkit-box-shadow: 0px 0px 10px 1px #666666;
    -moz-box-shadow: 0px 0px 10px 1px #666666;
    box-shadow: 0px 0px 10px 1px #666666;

    .title {
      background-color: @blue;
      flex: 0 0 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-box-shadow: 0px 0px 10px 1px #666666;
      -moz-box-shadow: 0px 0px 10px 1px #666666;
      box-shadow: 0px 0px 10px 1px #666666;
      h1 {
        color: white;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 2px;
      }
    }
    .navigation__menu {
      flex: 0 0 calc(100% - 200px);
      ul {
        text-align: right;
        li {
          display: inline-block;
          padding: 5px 20px;
          position: relative;
          margin: 15px 0;
          opacity: 0.8;
          transition: 0.9s;
          overflow: hidden;
          font-weight: 500;

          a {
            text-decoration: none;
            color: white;
          }
          &:last-child {
            margin-right: 10%;
          }

          .nav-link {
            text-decoration: none;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
