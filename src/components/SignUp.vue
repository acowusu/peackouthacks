<template>
  <div>
    <vs-dialog blur v-model="showDialog">
      <template #header>
        <h4 class="not-margin">Welcome to <b>Hand Me Down</b></h4>
      </template>
      <el-tabs v-model="stage" :before-leave="handleClick">
        <el-tab-pane label="Account">
          <div class="con-form">
            <form>
              <vs-input
                v-model="userData.email"
                placeholder="Email"
                autocomplete="email"
              >
                <template #icon> @ </template>
              </vs-input>
              <vs-input
                type="password"
                v-model="userData.password"
                placeholder="Password"
                autocomplete="new-password"
              >
                <template #icon>
                  <Icon :icon="icons.bxsLock" />
                </template>
              </vs-input>
              <vs-input
                type="text"
                v-model="userData.phone"
                placeholder="Phone Number"
                autocomplete="phone"
              >
                <template #icon>
                  <Icon :icon="icons.bxsPhone" />
                </template>
              </vs-input>
            </form>
          </div>
          <vs-button
            class="btn-next"
            :loading="btnLoading"
            gradient
            @click="createUserAccount"
            >Next</vs-button
          >
        </el-tab-pane>
        <el-tab-pane label="Profile">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="uploadProfile"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleAvatarRemoval"
          >
            <i v-if="!imageURL" class="el-icon-plus avatar-uploader-icon"></i>

            <img v-if="imageURL" :src="imageURL" class="avatar" />
          </el-upload>
          <div class="con-form">
            <form>
              <vs-input
                type="text"
                v-model="userData.name"
                placeholder="Your Name"
                autocomplete="given-name"
              >
                <template #icon>
                  <Icon :icon="icons.bxsUser" />
                </template>
              </vs-input>
              <el-input
                type="textarea"
                placeholder="Describe what you would like to request / donate"
                v-model="userData.description"
              ></el-input>
            </form>
            <vs-button
              class="btn-next"
              :loading="btnLoading"
              gradient
              @click="checkUserProfile"
              >Next</vs-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="Photos">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :http-request="upload"
            :on-success="handlePicSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <vs-button class="btn-next" gradient @click="nextPane"
            >Next</vs-button
          >
        </el-tab-pane>
        <el-tab-pane label="Location">
          <vs-button :loading="btnLoading" gradient warning @click="setLocation"
            >Use your current loacation</vs-button
          >
          <el-input
            type="textarea"
            placeholder="Or Enter Your address"
            v-model="userData.location.name"
          ></el-input>
          <vs-button
            class="btn-next"
            :loading="btnLoading"
            success
            gradient
            @click="finish"
            >Finish</vs-button
          >
        </el-tab-pane>
      </el-tabs>
    </vs-dialog>
  </div>
</template>

<script>
import { doc, setDoc, Timestamp } from "firebase/firestore/lite";
import { Icon } from "@iconify/vue2";
import bxsLock from "@iconify-icons/bx/bxs-lock";
import bxsPhone from "@iconify/icons-bx/bxs-phone";
import bxsUser from "@iconify/icons-bx/bxs-user";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import uploadImage from "./uploadImage";
import deleteImage from "./deleteImage";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      imageURL: "",
      btnLoading: false,
      icons: {
        bxsLock,
        bxsPhone,
        bxsUser,
      },
      userData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        location: {
          latitude: 0,
          longitude: 0,
          name: "",
        },
        description: "",
        profile: {
          url: "",
          ref: "",
        },
        photos: [],
      },
      stage: "0",
      validatedStages: ["0"],
      showDialog: false,
    };
  },
  mounted() {
    this.userData.profile.url = this.$store.getters.profileURL;
    this.userData.name = this.$store.getters.name;
  },
  created() {
    this.showDialog = this.active;
  },
  watch: {
    active: function (newval) {
      this.showDialog = newval;
    },
    showDialog: function (newval) {
      this.$emit("change", newval);
    },
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: "donor",
    },
  },
  computed: {
    validPane() {
      return true;
    },
  },
  methods: {
    async finish() {
      this.btnLoading = true;
      //reverse geocode address if location not
      if (!this.userData.location.latitude && !this.location.latitude) {
        //try getting location from address
      }
      let userRecord = {
        ...this.userData,
        userType: this.userType,
        created: Timestamp.fromDate(new Date()),
      };
      delete userRecord.password;

      setDoc(doc(this.$firestore, "users", this.$store.getters.uid), userRecord)
        .then(() => {
          if (this.userType === "donor") {
            this.$router.replace("connections");
          } else {
            this.$router.replace("donors");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$vs.notification({
            title: `Error - ${errorCode}`,
            color: "danger",
            text: errorMessage,
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    createUserAccount() {
      console.log(this.$store.getters.isSignedIn);
      if (this.$store.getters.isSignedIn) {
        return this.nextPane();
      }
      this.btnLoading = true;
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.userData.email,
        this.userData.password
      )
        .then((userCredential) => {
          // Signed in
          this.$store.dispatch("setUser", userCredential.user);
          this.nextPane();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$vs.notification({
            title: `Error - ${errorCode}`,
            color: "danger",
            text: errorMessage,
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.userData.profile = res;
      this.imageURL = URL.createObjectURL(file.raw);

      this.$vs.notification({
        title: "Profile Picture Uploaded",
      });
    },
    handlePicSuccess(res, file) {
      this.userData.photos.push(res);
      file.reference = res.ref;
    },
    handleAvatarRemoval(file, fileList) {
      console.log(file, fileList);
    },
    checkUserProfile() {
      if (
        this.userData.name &&
        this.userData.description &&
        this.userData.profile.url
      ) {
        this.btnLoading = true;
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: this.userData.name,
          photoURL: this.userData.profile.url,
        })
          .then(() => {
            this.nextPane();
          })
          .catch((error) => {
            this.$vs.notification({
              title: "Oops an error occured",
              color: "danger",
              text: error.message,
            });
          })
          .finally(() => {
            this.btnLoading = false;
          });
      } else {
        this.$vs.notification({
          title: "Details Missing",
          color: "danger",
          text: "Please fill in the missing details",
        });
      }
    },
    setLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            console.log(position.coords.longitude);

            this.userData.location.latitude = position.coords.latitude;
            this.userData.location.longitude = position.coords.longitude;
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$vs.notification({
          title: "Unsupported File format",
          color: "danger",
          text: "Avatar picture must be JPG format!",
        });
      }
      if (!isLt2M) {
        this.$vs.notification({
          title: "File size too big",
          color: "danger",
          text: "Avatar picture size can not exceed 5MB!",
        });
      }
      return isJPG && isLt2M;
    },
    upload({ action, data, file, onProgress, onError, onSuccess }) {
      console.log(action, data, file, onProgress, onError, onSuccess);
      uploadImage({ file, isProfile: false, onProgress, onError, onSuccess });
      //   onSuccess("Uploaded Successfully");
    },
    uploadProfile({ action, data, file, onProgress, onError, onSuccess }) {
      console.log(action, data, file, onProgress, onError, onSuccess);
      uploadImage({ file, isProfile: true, onProgress, onError, onSuccess });
    },
    handleRemove(file) {
      console.log(file, file.response.ref, deleteImage);
      deleteImage(file.response.ref);
      for (let i = 0; i < this.userData.photos.length; i++) {
        const { ref } = this.userData.photos[i];
        if (file.reference === ref) {
          this.userData.photos.splice(i, 1);
        }
      }
      //delete file from firebase
    },
    handleClick(activeName) {
      console.log("handeling click");
      return this.validatedStages.includes(activeName);
    },

    nextPane() {
      if (this.validPane) {
        this.validatedStages.push(`${+this.stage + 1}`);
        this.stage = `${+this.stage + 1}`;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.btn-next
    float: right
    // margin-bottom: 2em
</style>
<style>
.el-textarea {
  background: #f4f7f8;
  border-radius: 12px;
}
.el-textarea__inner {
  background: #f4f7f8 !important;
  border-radius: 12px !important;
  border: 0 !important;
}
</style>

<style>
img .avatar {
  border-radius: 12px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload-list__item-thumbnail {
  border-radius: 12px;
}
.el-upload-list--picture-card,
.el-upload-list__item,
.el-upload-list__item-actions {
  border-radius: 12px !important;
}
.el-upload--picture-card {
  border-radius: 12px !important;
}
.el-upload-list--picture-card .el-upload-list__item {
  border: 0 !important;
}
</style>
