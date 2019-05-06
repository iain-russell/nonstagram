<template>
  <div class="center">
    <section class="section">
      <div class="content">
        <h3>About Nonstagram</h3>
        <p>
          Nonstagram is a single page application for uploading images, viewing
          images, and commenting on images. This website is just practice
          project, so it is missing some features.
        </p>
        <p>
          The front end of the site uses Vue.Js for the heavy lifting, some
          Buefy components, and Bulma for the css styling.
        </p>
        <p>
          The backend is written with Node / Express, using MongoDB as the
          database. The MongoDB database is hosted on a MongoDB Atlas Cluster.
          Images are uploaded to an AWS S3 bucket via Multer after being resized
          with Sharp.
        </p>
        <p>
          User passwords are hashed with Bcrypt. Authentication is handled by
          Passport and PassportJWT. User profile images are generated using
          jdenticon.
        </p>
        <p>
          Database info is seeded with Faker after sign up. The database is seeded with generated galleries, images, and comments.
          This website is just an example project, so user data is deleted on sign out.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>
<style scoped>
@media (min-width: 768px) {
  .section {
    max-width: 60vw;
  }
}
</style>
