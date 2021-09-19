<template>
  <div class="donors">
    <div class="controls">
      <div class="block">
        <span class="demonstration">Distance</span>

        <el-slider
          v-if="this.latitude || this.longitude"
          @change="updateSearch"
          v-model="distance"
          :min="1"
          :max="100000"
          :step="1000"
          :format-tooltip="(x) => `${Math.round(x / 1000)} Km`"
        ></el-slider>
        <vs-button
          v-else
          :loading="btnLoading"
          gradient
          warning
          @click="setLocation"
          >Use your current loacation</vs-button
        >
      </div>
    </div>
    <div class="results">
      <vs-row justify="center">
        <vs-col
          lg="3"
          sm="4"
          xs="12"
          v-for="result in results"
          :key="result.uid"
          class="result-item"
        >
          <vs-card>
            <template #title>
              <h3>{{ result.name }}</h3>
            </template>
            <template #img>
              <img :src="result.profileurl" alt="" />
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
                <span class="span">
                  {{
                    1000 > result.dist_m
                      ? `${result.dist_m} M`
                      : `${Math.round(result.dist_m / 1000)} Km`
                  }}
                </span>
              </vs-button>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
      <span v-if="results.length == 0">No results Found</span>
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
                v-for="img in currentProfile.photos.photos"
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
import axios from "axios";
export default {
  name: "donors",
  components: {
    Icon,
  },
  methods: {
    setLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            console.log(position.coords.longitude);

            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.updateSearch();
            // console.log(position);
          },
          function showError(error) {
            let errorMessage;
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "User denied the request for Geolocation.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
              case error.UNKNOWN_ERROR:
                errorMessage = "An unknown error occurred.";
                break;
            }
            this.$vs.notification({
              title: "An error occured",
              color: "danger",
              text: errorMessage,
            });
          }
        );
      } else {
        this.$vs.notification({
          title: "Oh Dear :(",
          color: "danger",
          text: "Geolocation is not supported by this browser.",
        });
      }
    },
    openProfileDetails(profile) {
      this.showingProfileDetails = true;
      this.currentProfile = profile;
    },
    updateSearch() {
      const host =
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:5001/handmedown-19559/us-central1/getDonors"
          : "https://us-central1-handmedown-19559.cloudfunctions.net/getDonors";
      axios
        .get(`${host}/${this.latitude}/${this.longitude}/${this.distance}`)
        .then((response) => {
          this.results = response.data;
        })
        .catch((error) => {
          this.$vs.notification({
            title: "Network Error",
            color: "danger",
            text: error.message,
          });
        });
    },
  },
  data() {
    return {
      icons: {
        bxLink,
        bxsInfoCircle,
        bxLocationPlus,
      },

      btnLoading: false,
      latitude: 0,
      longitude: 0,
      distance: 10000,
      currentProfile: null,
      showingProfileDetails: false,
      results: [],
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
