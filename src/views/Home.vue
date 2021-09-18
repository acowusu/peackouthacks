<template>
  <div class="home">
    <Splash :msg="env.VUE_APP_TITLE" />
  </div>
</template>

<script>
// @ is an alias to /src
import Splash from "@/components/Splash.vue";

export default {
  name: "Home",
  components: {
    Splash,
  },
  computed: {
    env() {
      return process.env;
    },
  },
};
</script>
