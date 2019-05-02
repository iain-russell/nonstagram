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
            <p>hey</p>
            <p>hey</p>
            
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
                >
                </b-input>
                <button class="button is-medium" type="submit">Post</button>
              </b-field>
            </section>
          </footer>
        </section>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "CloseUp",
  props: ["gallery"],
  data() {
    return {
      comment: ""
    };
  }
};
</script>
<style scoped>
img {
  max-height: 600px;
  height: 100%;
  object-fit: cover;
}
hr {margin:10px;}
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
}
.textarea {
}
#comment-input {
}
.control.is-clearfix{
  width:100vw;
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
