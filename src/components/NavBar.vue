<template>
  <vs-navbar center-collapsed shadow class="nav">
    <template #left>
      <img src="../assets/handmedown.svg" class="nav-img" alt="" />
    </template>

    <template #right>
      <vs-button
        v-if="!$store.getters.isSignedIn"
        flat
        gradient
        success
        n
        @click="modalActive = !modalActive"
        >Login</vs-button
      >

      <vs-tooltip shadow interactivity bottom not-hover v-model="showSignOut">
        <vs-avatar
          @click="showSignOut = !showSignOut"
          v-if="$store.getters.isSignedIn"
          class="nav-avartar"
        >
          <img :src="$store.getters.profileURL" :alt="$store.getters.name" />
        </vs-avatar>
        <template #tooltip>
          <div class="content-tooltip">
            <vs-button
              v-if="$store.getters.isSignedIn"
              flat
              danger
              @click="signOut"
              >Sign Out</vs-button
            >
          </div>
        </template>
      </vs-tooltip>
    </template>
    <vs-dialog v-model="modalActive">
      <template #header>
        <h4 class="not-margin">Welcome to <b>HandMeDown</b></h4>
      </template>

      <div class="con-form">
        <form>
          <vs-input v-model="email" placeholder="Email" autocomplete="email">
            <template #icon> @ </template>
          </vs-input>
          <vs-input
            type="password"
            v-model="password"
            placeholder="Password"
            autocomplete="current-password"
          >
            <template #icon>
              <Icon :icon="icons.bxsLock" />
            </template>
          </vs-input>
          <div class="flex">
            <vs-checkbox v-model="remember">Remember me</vs-checkbox>
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block> Sign In </vs-button>

          <div class="new">New Here? <a href="#">Create New Account</a></div>
        </div>
      </template>
    </vs-dialog>
  </vs-navbar>
</template>
<script>
import { Icon } from "@iconify/vue2";
import bxsLock from "@iconify-icons/bx/bxs-lock";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      icons: {
        bxsLock,
      },
      showSignOut: false,
      modalActive: false,
      email: "",
      password: "",
      remember: false,
    };
  },
  methods: {
    signOut() {
      this.showSignOut = false;
    },
  },
};
</script>
<style>
.nav-img {
  height: 40px;
}
/* .vs-navbar-content {
  position: sticky !important; */
/* } */
</style>
<style lang="scss">
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: 0.8rem;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
  .vs-checkbox-label {
    font-size: 0.8rem;
  }
  .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);
    .vs-input {
      width: 100%;
    }
  }
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;
    a {
      color: rgba(var(--vs-primary), 1) !important;
      margin-left: 6px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .vs-button {
    margin: 0px;
  }
}
.nav-avartar {
  margin: 00.5em;
}
</style>
