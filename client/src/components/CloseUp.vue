<template>
  <div class="modal-card">
    <section class="section" id="section-body">
      <article class="columns">
        <section class="column is-7 " id="image-column">
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
        <section class="column is-5 " id="media-column">
          <hr />
          <div class="content" id="content-column">
            <!-- .text-content -->
            <article class="media">
              <figure class="media-left ">
                <div v-html="identicon(gallery.user.email)"></div>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ gallery.user.email }}</strong>
                    <small>@johnsmith</small>
                    <br />
                    {{ gallery.comments[0].content }}
                    <br />
                    <small>31m</small>
                  </p>
                </div>
              </div>
            </article>
            <!-- /.text-content -->

            <!-- .comment-content -->
            <article v-for="comment in gallery.comments" class="media">
              <figure class="media-left ">
                <div v-html="identicon(comment.user.email)"></div>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ comment.user.email }}</strong>
                    <small>@johnsmith</small>
                    <br />
                    {{ comment.content }}
                    <br />
                    <small>{{ comment.created_at }}</small>
                  </p>
                </div>
              </div>
            </article>
            <!-- /.comment-content -->

            <!-- .newComment-content -->
            <article v-for="comment in newComments" class="media">
              <figure class="media-left ">
                <div v-html="identicon(comment.user.email)"></div>

              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ comment.user.email }}</strong>
                    <small>@johnsmith</small>
                    <br />
                    {{ comment.content }}
                    <br />
                    <small>{{ comment.created_at }}</small>
                  </p>
                </div>
              </div>
            </article>
            <!-- /.newComment-content -->

            <!-- <p class="comments" v-for="comment in newComments">
              {{ comment}}
            </p> -->
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
import jdenticon from "jdenticon";

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
      this.newComments.push(data.commentFullData);
      this.comment = "";
      this.incrementCounter();
    },
    identicon(username) {
      return jdenticon.toSvg(username, 32);
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
.content figure:not(:last-child) {
  margin-bottom: 0px;
}
.media-left {
  margin:10px;
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
