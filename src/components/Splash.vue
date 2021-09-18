<template>
  <div class="grid">
    <sign-up
      :active="showingDialog"
      :userType="userType"
      @change="
        (x) => {
          showingDialog = x;
        }
      "
    />
    <vs-row justify="space-around" align="center">
      <vs-col w="4" align="center" justify="space-around">
        <vs-card>
          <template #title>
            <h3>I have Stuff</h3>
          </template>
          <template #img>
            <img src="../assets/stuff.jpg" alt="" />
          </template>
          <template #text>
            <p>Sign up to send your unused clothes to a good home</p>
            <vs-button gradient @click="showSignUpDialog('donor')"
              >Get Started</vs-button
            >
          </template>
        </vs-card>
      </vs-col>

      <vs-col w="4" align="center" justify="space-around">
        <vs-card>
          <template #title>
            <h3>I need Stuff</h3>
          </template>
          <template #img>
            <img src="../assets/no-stuff.jpg" alt="" />
          </template>
          <template #text>
            <p>Sign up to recieve high quality clothes and more!</p>
            <vs-button gradient primary @click="showSignUpDialog('receiver')"
              >Get Started</vs-button
            >
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import SignUp from "./SignUp.vue";
export default {
  name: "Splash",
  components: {
    SignUp,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      userType: "donor",
      showingDialog: false,
    };
  },
  methods: {
    showSignUpDialog(userType) {
      this.userType = userType;
      this.showingDialog = false;
      this.showingDialog = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.grid {
  // margin-top: 50px;
  min-height: calc(100vh);
  display: flex;
  justify-content: center;
  background: linear-gradient(
    30deg,
    rgb(255, 186, 0),
    33%,
    rgb(255, 186, 0) 100%
  );
}
</style>
