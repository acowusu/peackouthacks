<template>
  <div class="donors">
    <div class="controls">
      <div class="block">
        <span class="demonstration">Distance</span>

        <el-slider
          v-model="distance"
          :format-tooltip="(x) => `${x} Mins`"
        ></el-slider>
      </div>
    </div>
    <div class="results">
      <vs-row justify="center">
        <vs-col
          lg="3"
          sm="4"
          xs="12"
          v-for="result in results"
          :key="result.id"
          class="result-item"
        >
          <vs-card>
            <template #title>
              <h3>{{ result.name }}</h3>
            </template>
            <template #img>
              <img :src="result.profileURL" alt="" />
            </template>
            <template #text>
              <p>{{ result.description }}</p>
              <vs-button
                class="btn-more-info"
                gradient
                primary
                @click="openProfileDetails(result)"
              >
                <Icon :icon="icons.bxsInfoCircle" />
                <span class="span"> More Info </span>
              </vs-button>
            </template>
            <template #interactions>
              <vs-button danger icon>
                <Icon :icon="icons.bxLink" />
              </vs-button>

              <vs-button class="btn-chat" shadow primary>
                <Icon :icon="icons.bxLocationPlus" />
                <span class="span"> {{ result.location.name }} </span>
              </vs-button>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-dialog
        width="550px"
        not-center
        v-model="showingProfileDetails"
        v-if="currentProfile"
      >
        <template #header>
          <h4 class="not-margin">
            <b>{{ currentProfile.name }}</b>
          </h4>
        </template>

        <div class="con-content">
          <p>
            {{ currentProfile.description }}
          </p>
          <div class="d-grid">
            <vs-row justify="center">
              <vs-col
                lg="3"
                sm="4"
                xs="12"
                v-for="img in currentProfile.itemImages"
                :key="img"
                class="result-item"
              >
                <div class="vs-card__img">
                  <img :src="img" alt="" />
                </div>
              </vs-col>
            </vs-row>
          </div>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="showingProfileDetails = false">
              Connect
            </vs-button>
            <vs-button @click="showingProfileDetails = false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue2";
import bxLink from "@iconify/icons-bx/bx-link";
import bxsInfoCircle from "@iconify/icons-bx/bxs-info-circle";
import bxLocationPlus from "@iconify/icons-bx/bx-location-plus";

export default {
  name: "donors",
  components: {
    Icon,
  },
  methods: {
    openProfileDetails(profile) {
      this.showingProfileDetails = true;
      this.currentProfile = profile;
    },
  },
  data() {
    return {
      icons: {
        bxLink,
        bxsInfoCircle,
        bxLocationPlus,
      },
      distance: 10,
      currentProfile: null,
      showingProfileDetails: false,
      results: [
        {
          id: 1,
          name: "Frank Smith",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://vuesax.com/foto5.png",
          itemImages: ["https://picsum.photos/id/1010/500"],
          location: {
            name: "London",
          },
        },
        {
          id: 2,
          name: "Gen Baker",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://vuesax.com/foto1.png",
          itemImages: [
            "https://picsum.photos/id/1010/500",
            "https://picsum.photos/id/1011/500",
            "https://picsum.photos/id/1015/500",
            "https://picsum.photos/id/111/500",
            "https://picsum.photos/id/10/500",
            "https://placeimg.com/500/500/people",
          ],
          location: {
            name: "Bristol",
          },
        },

        {
          id: 3,
          name: "Flora Price",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://vuesax.com/foto6.png",
          itemImages: ["https://picsum.photos/id/1010/500"],
          location: {
            name: "Cardiff",
          },
        },
        {
          id: 4,
          name: "Laura Baker",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://picsum.photos/id/1027/500",
          itemImages: ["https://picsum.photos/id/1010/500"],
          location: {
            name: "Cardiff",
          },
        },
        {
          id: 13,
          name: "Bill Smith",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://placeimg.com/504/504/people",
          itemImages: ["https://picsum.photos/id/1010/500"],
          location: {
            name: "London",
          },
        },
        {
          id: 32,
          name: "George Baker",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://placeimg.com/506/506/people",
          itemImages: [
            "https://picsum.photos/id/1010/500",
            "https://picsum.photos/id/1011/500",
            "https://picsum.photos/id/1015/500",
            "https://picsum.photos/id/111/500",
            "https://picsum.photos/id/10/500",
            "https://placeimg.com/500/500/people",
          ],
          location: {
            name: "Bristol",
          },
        },

        {
          id: 33,
          name: "Hannah Price",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://placeimg.com/502/502/people",
          itemImages: ["https://picsum.photos/id/1010/500"],
          location: {
            name: "Cardiff",
          },
        },
        {
          id: 34,
          name: "Laura Collins",
          description:
            "I have a colection of Clothes and toys that my five year old son has grown out of.",
          profileURL: "https://placeimg.com/501/501/people",
          itemImages: ["https://picsum.photos/id/1010/500"],
          location: {
            name: "Cardiff",
          },
        },
      ],
    };
  },
};
</script>
<style scoped>
.donors {
  margin-top: 60px;
}
.results {
  padding: 0 4em;
}
.result-item {
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-more-info {
  margin: auto;
  margin-top: 0.5em;
}
.btn-more-info .span {
  padding-left: 5px;
  font-weight: 700;
}
.btn-chat i {
  font-size: 1.2rem;
}

.btn-chat .span {
  padding-left: 5px;
  font-weight: 700;
}
.vs-card-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-slider__bar {
  background-color: rgb(var(--vs-primary));
}
</style>
<style lang="scss">
.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .vs-button {
    margin: 0px;
    .vs-button__content {
      padding: 10px 30px;
    }
    & ~ .vs-button {
      margin-left: 10px;
    }
  }
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}
.con-content {
  width: 100%;
  p {
    font-size: 0.8rem;
    padding: 0px 10px;
  }
  .vs-checkbox-label {
    font-size: 0.8rem;
  }
  .vs-input-parent {
    width: 100%;
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
.controls {
  background: #fff;
  margin: 6em 4em 2em 4em;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, var(--vs-shadow-opacity));
  border-radius: 20px;
  padding: 1em;
}
:root {
  --vs-shadow-opacity: 0.1;
  --vs-radius: 20px;
  --vs-zindex-1: 100000;
  --vs-zindex-2: 99000;
  --vs-zindex-3: 98000;
  --vs-zindex-4: 97000;
  --vs-background-opacity: 0.2;
}
</style>
<style>
.el-slider__bar {
  background-color: rgb(var(--vs-primary));
}
.el-slider__button {
  border-color: rgb(var(--vs-primary));
}
</style>
