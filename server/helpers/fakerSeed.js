const faker = require("faker");
const User = require("../models/user");
const Gallery = require("../models/gallery");
const Image = require("../models/image");
const Comment = require("../models/comment");

module.exports = {
  getRandomInt() {
    return Math.floor(Math.random() * 5 + 2);
  },
  seedUser() {
    const user = new User({
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: Date.now()
    });
    return user;
  },
  seedComment() {
    const comment = new Comment({
      content: faker.lorem.sentence(),
      created_at: Date.now()
    });
    return comment;
  },
  async seedGallery() {
    const user = await this.seedUser();
    const comment = await this.seedComment();
    const gallery = new Gallery({
      created_at: Date.now()
    });
    const images = await this.seedImages();
    images.forEach(item => {
      gallery.images.push(item);
      item.save();
    });

    user.galleries.push(gallery);
    gallery.comments.push(comment);
    gallery.user = user;
    comment.user = user;

    await user.save();
    await comment.save();
    await gallery.save();

    // console.log(images);

    // console.log("-----------user----------");
    // console.log(user);
    // console.log("-----------comment-------");
    // console.log(comment);
    console.log("-----------gallery-------");
    console.log(gallery);
  },
  async seedUserGalleries(req) {
    const user = await User.findById(req);
    console.log(user);

    const images = await this.seedImages();
    images.forEach(item => {
      const gallery = new Gallery({
        created_at: Date.now(),
        user: user
      });

      const comments = this.seedComments();
      comments.forEach(comment => {
        gallery.comments.push(comment);
      });
      gallery.images.push(item);
      user.galleries.push(gallery);
      item.save();
      gallery.save();
    });
    await user.save();
  },
  seedComments() {
    const comments = [];
    for (var i = 0; i < this.getRandomInt(); i++){
      const user = this.seedUser();
      const comment = this.seedComment();
      comment.user = user;
      user.save();
      comment.save();
      comments.push(comment);
    };
    return comments;
  },
  seedImages() {
    const imageData = [
      {
        key: "image-gallery-site/1557001684191",
        name: "david-schultz-1475807-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001683923",
        name: "mohammad-aqhib-1480511-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001683924",
        name: "tamas-debreczeni-1226946-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001685052",
        name: "samuel-zeller-103103-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001684950",
        name: "haiqal-osman-1394800-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001683914",
        name: "ioana-farcas-33320-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001685787",
        name: "missmushroom-1201587-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001685597",
        name: "loreta-pavoliene-2173-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001684190",
        name: "ganapathy-kumar-1137539-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001686578",
        name: "zhu-hongzhi-1249096-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001685147",
        name: "leonard-von-bibra-1506324-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001683922",
        name: "raul-taciu-203116-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001686747",
        name: "michael-kooiman-1134654-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001687066",
        name: "matthias-jordan-367209-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001686625",
        name: "annie-spratt-1288465-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001687009",
        name: "greg-rosenke-1406864-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001688299",
        name: "bruce-warrington-1431472-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001689260",
        name: "mickey-o-neil-36549-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001689051",
        name: "guillaume-baudusseau-433743-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001688351",
        name: "ellena-mcguinness-1455796-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001690200",
        name: "andrew-montgomery-40603-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001690365",
        name: "wes-grant-312612-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001689440",
        name: "dmitry-sovyak-454058-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001688595",
        name: "raining-huang-31297-unsplash.jpg"
      },
      {
        key: "image-gallery-site/1557001688544",
        name: "osama-saeed-1334736-unsplash.jpg"
      }
    ];
    const imageArray = [];
    imageData.forEach(item => {
      const image = new Image({
        key: item.key,
        name: item.name,
        created_at: Date.now()
      });
      imageArray.push(image);
    });
    return imageArray;
  }
};
