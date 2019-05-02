<template>
  <div class="modal-card">
    <section class="section" id="section-body">
      <article class="columns">
        <section class="column is-6 " id="image-column">
          <div id="image-div">
            <figure class="image is-4by5" id="figure-image">
              <img
                :src="
                  'https://s3.eu-west-2.amazonaws.com/django-static-practice1939/' +
                    gallery.images[0].key
                "
              />
            </figure>
          </div>
        </section>
        <section class="column is-6 " id="media-column">
          <hr />
          <div class="content" id="content-column">
            <p class="comments" v-for="comment in gallery.comments">
              {{ comment.content }}
            </p>
            <p class="comments" v-for="comment in newComments">
              {{ comment.content }}
            </p>
          </div>
          <hr />
          <footer class="">
            <section>
              <b-field id="comment-field" class="center">
                <b-input
                  type="textarea"
                  :value="comment"
                  v-model="comment"
                  id="comment-input"
                  rows="1"
                  placholder="Add a comment"
                  @keyup.enter.native="shiftForNewLine()"
                >
                </b-input>
                <button
                  class="button is-medium"
                  type="submit"
                  @click="addComment()"
                >
                  Post
                </button>
              </b-field>
            </section>
          </footer>
        </section>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "CloseUp",
  props: ["gallery"],
  data() {
    return {
      comment: "",
      newComments: []
    };
  },
  watch: {
    gallery() {
      setTimeout(() => {
        this.fetchGalleries();
      }, 1000);
    }
  },
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["incrementCounter"]),
    shiftForNewLine() {
      if (!event.shiftKey) {
          this.addComment();
        }
    },
    async addComment() {
      const token = this.getToken;
      const { data } = await axios
        .post(
          `http://localhost:3001/${this.gallery._id}`,
          { content: this.comment },
          {
            headers: { Authorization: `${token}` }
          }
        )
        .then(response => {
          console.log(response.data);
          return response;
        });
      this.newComments.push(data.newComment);
      this.comment = "";
      this.incrementCounter();
    }
  }
};
</script>
<style scoped>
img {
  max-height: 600px;
  height: 100%;
  object-fit: cover;
}
hr {
  margin: 10px;
}
section {
}
#section-body {
  height: 80vh;
}

.modal-card {
  width: auto;
}
#image-column {
  display: flex;
  flex-direction: column;
  padding: 0px;
}
#figure-image {
}
.content {
  height: 50%;
}
.content {
  margin-bottom: 500px !important!;
}
#media-column {
  height: 75vh;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* flex: 2 1 auto; */
}
#content-column {
  overflow-y: auto;
  flex-direction: column;
  display: flex;
  height: 80vh;
  margin-bottom: 0px;
  font-family: "Roboto";
  font-size: 14px;
}
.comment {
  line-height: 1em;
}
.textarea {
}
#comment-input {
}
.control.is-clearfix {
  width: 100vw;
}
#comment-field {
}
.footer {
  background: #999999;
}
::-webkit-scrollbar {
  display: none;
}
</style>
