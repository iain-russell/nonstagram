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
          <span><button style="margin-right: 5px;">Browse</button> or drag files here!</span>
        </div>
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
    };
  },
  created: function() {},
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["fetchGallery", "incrementCounter"]),
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
        message: "Image uploaded!",
        type: "is-success",
        position: "is-bottom"
      });
      this.incrementCounter();
    },
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
