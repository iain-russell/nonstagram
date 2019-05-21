<template>
  <div class="section center">
    <div class="modal-card">
      <section class="modal-card-body">

        <div class="dropper">
          <input
            type="file"
            @change="uploadImages($event.target.files)"
            multiple
            accept="image/*"
          />
          <i class="fas fa-cloud-upload-alt fa-5x"></i>
          <br />
          <span
            ><button style="margin-right: 5px;">Browse</button> or drag files
            here!</span
          >
        </div>
        <p v-if="uploadingImages" class="progress-bar">
          <progress class="progress is-primary" :value="progress" max="100">
            {{ progress }} %
          </progress>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "UploadImages",

  data() {
    return {
      uploadingImages: false,
      progress: 0
    };
  },
  created: function() {},
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["incrementCounter"]),
    async createGallery() {
      this.uploadingImages = true;
      const { data } = await axios.post(
        "http://35.178.179.163:3001",
        { name: this.galleryName },
        {
          headers: {
            Authorization: `${window.localStorage.getItem("access_token")}`
          }
        }
      );
      return data;
    },
    async uploadImages(images) {
      const gallery = await this.createGallery();
      const token = this.getToken;
      Array.from(images).map(async image => {
        const formData = new FormData();
        formData.append("image", image);
        await axios
          .post(
            `http://35.178.179.163:3001/gallery/${gallery._id}/upload-images`,
            formData,
            {
              onUploadProgress: e =>
                (this.progress = Math.round((e.loaded * 100) / e.total)),
              headers: { Authorization: `${token}` }
            }
          )
          .then(response => {
            this.incrementCounter();
            this.uploadingImages = false;
            this.$parent.close();
            this.$toast.open({
              duration: 3000,
              message: "Image uploaded!",
              type: "is-success",
              position: "is-bottom"
            });
          });
      });
    }
  }
};
</script>

<style scoped>
.dropper {
  height: 50vh;
  border: 1px dashed black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: white;
}
.dropper:hover {
  background-color: #f7f7f7;
}
input {
  width: 100%;
  height: 50vh;
  position: absolute;
  opacity: 0;
}
.progress-bar {
  text-align: center;
  padding: 70px 10px;
}
.modal-card-body {
  border-radius: 10px;
}
</style>
