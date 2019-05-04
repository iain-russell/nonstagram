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
            <!-- .comment-content -->
            <article
              v-for="comment in gallery.comments"
              class="media"
              v-if="comment.visible"
            >
              <figure class="media-left ">
                <div v-html="identicon(comment.user.email)"></div>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ formatEmail(comment.user.email) }}</strong>
                    <small>@{{ formatEmail(comment.user.email) }}</small>
                    <br />
                    {{ comment.content }}
                    <br />
                    <small>{{ formatDate(comment.created_at) }}</small>
                  </p>
                </div>
              </div>

              <!-- .delete -->
              <div
                class="media-right"
                id="comment-delete-div"
                v-if="compareUsers(comment.user._id)"
              >
                <button class="delete" @click="deleteComment(comment)"></button>
              </div>
              <!-- /.delete -->
            </article>
            <!-- /.comment-content -->

            <!-- .newComment-content -->
            <article
              v-for="comment in newComments"
              class="media"
              v-if="comment.visible"
            >
              <figure class="media-left ">
                <div v-html="identicon(comment.user.email)"></div>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ formatEmail(comment.user.email) }}</strong>
                    <small>@{{ formatEmail(comment.user.email) }}</small>
                    <br />
                    {{ comment.content }}
                    <br />
                    <small>{{ formatDate(comment.created_at) }}</small>
                  </p>
                </div>
              </div>
              <!-- .edit -->

              <!-- .delete -->
              <div
                class="media-right"
                id="comment-delete-div"
                v-if="compareUsers(comment.user._id)"
              >
                <button class="delete" @click="deleteComment(comment)"></button>
              </div>
              <!-- /.delete -->
            </article>
            <!-- /.newComment-content -->
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
                  placeholder="Add a comment"
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
      newComments: [],
      selected: ""
    };
  },
  watch: {
    gallery() {
      setTimeout(() => {
        this.fetchGalleries();
      }, 1000);
    },
    newComments() {
      setTimeout(() => {
        this.scrollToEnd();
      }, 0);
    }
  },
  created: function() {
    this.compareUsers();
  },
  computed: mapGetters(["getToken", "getUser"]),
  methods: {
    ...mapActions(["incrementCounter", "fetchGalleries"]),
    hey() {
      console.log("hey");
    },
    shiftForNewLine() {
      if (!event.shiftKey) {
        this.addComment();
      }
    },
    async addComment() {
      const token = this.getToken;
      const { data } = await axios.post(
        `http://localhost:3001/${this.gallery._id}/comments`,
        { content: this.comment },
        {
          headers: { Authorization: `${token}` }
        }
      );
      this.newComments.push(data.commentFullData);
      this.comment = "";
      this.incrementCounter();
    },
    identicon(username) {
      return jdenticon.toSvg(username, 32);
    },
    formatDate(date) {
      const newDate = new Date(date);
      return newDate
        .toISOString()
        .substr(0, 19)
        .replace("T", " ");
    },
    formatEmail(email) {
      return email.substring(0, email.lastIndexOf("@"));
    },
    scrollToEnd() {
      const container = this.$el.querySelector("#content-column");
      container.scrollTop = container.scrollHeight;
    },
    async compareUsers(user) {
      const currentUser = await this.getUser;
      if (user === currentUser._id) {
        return true;
      } else {
        return false;
      }
    },
    async deleteComment(comment) {
      const token = this.getToken;
      comment.visible = false;
      this.incrementCounter();
      const { data } = await axios.delete(
        `http://localhost:3001/${this.gallery._id}/comments`,
        { data: { comment } }
      );
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
  margin: 10px;
}
.media + .media {
  border-top: none;
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
#comment-delete-div {
  margin-right: 10px;
}
</style>
