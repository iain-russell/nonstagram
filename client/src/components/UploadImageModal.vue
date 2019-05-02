<template>
  <div class="section">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload Images</p>
      </header>
      <section class="modal-card-body">
        <div class="dropper">
          <input
            type="file"
            @change="uploadImages($event.target.files)"
            multiple
            accept="image/*"
          />
          <span>Drag files here!</span>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "UploadImages",

  data() {
    return {};
  },
  created: function() {},
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["incrementCounter"]),
    async createGallery() {
      const { data } = await axios.post(
        "http://localhost:3001",
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
      Array.from(images).map(image => {
        const formData = new FormData();
        formData.append("image", image);
        axios.post(
          `http://localhost:3001/gallery/${gallery._id}/upload-images`,
          formData,
          {
            headers: { Authorization: `${token}` }
          }
        );
      });
      this.$parent.close();
      this.$toast.open({
        duration: 3000,
        message: "Images uploaded!",
        type: "is-success",
        position: "is-bottom"
      });
      this.incrementCounter();
    }
  }
};
</script>

<style scoped>
.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: white;
}
.dropper:hover {
  background-color: #eee;
}
input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
.progress-bar {
  text-align: center;
  padding: 70px 10px;
}
</style>
