<template>
  <div>
    <Header />
    <div v-if="fetched" class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="p-2">
            <div class="image-container">
              <img
                class="blog-img"

                :src="getImg"
                :alt="blog.title"
              />
            </div>
            <div class="mt-5 blog-content">
              <div class="title-section">
                <h1>{{ blog.title }}</h1>
                <div class="share-icons">
                  <p>{{convertDate(blog.created_at)}}</p>
                  <p>{{ blog.views ? blog.views + 1 : 2 }} Görüntülenme</p>
                  <i class="fa fa-twitter" @click="share('twitter')"></i>
                  <i class="fa fa-facebook" @click="share('facebook')"></i>
                  <i class="fa fa-telegram" @click="share('telegram')"></i>
                  <i class="fa fa-whatsapp" @click="share('whatsapp')"></i>
                </div>
              </div>
              <markdown-it-vue
                class="mt-3"
                :content="blog.detail ? blog.detail : ''"
              />
            </div>
          </div>
        </div>
        <div class="col col-posts">
          <div class="p-4">
            <div
              class="card mb-4 box-shadow"
              v-for="(post, index) in otherBlogs"
              :key="`blog-${index}`"
            >
              <nuxt-link class="card-link" :to="`/blog/${post.slug}`">
                <img :src="post.image.url" alt="" />
              </nuxt-link>
              <div class="card-body">
                <p class="card-text">
                  {{ post.title }}
                </p>
                <p class="card-date">
                  {{ $timeCreate(post.created_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const { data } = await this.$axios.get(
      `/blogs?slug=${this.$route.params.slug}`
    );

     await this.$axios.get(
      `/blogs/increment/${data[0].id}`
    );

    this.blog = data[0];

    const { data: blogs } = await this.$axios.get(`/blogs`);

    this.otherBlogs = blogs.filter((blog) => blog.id !== this.blog.id).sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);

    this.fetched = true;
  },

  data() {
    return {
      blog: {},
      otherBlogs: {},
      fetched: false
    };
  },
  computed: {
    getImg() {
      return this.blog?.image?.url;
    },
  },
  methods: {
    convertDate(date) {
      const newDate = new Date(date);
      const monthNames = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];
      const day = newDate.getDate();
      const monthIndex = newDate.getMonth();
      const year = newDate.getFullYear();
      return `${day} ${monthNames[monthIndex]} ${year}`;
    },
    share(site) {

      var pageUrl = window.location.href
      var pageTitle = encodeURIComponent(document.title);

      switch (site) {
        case "telegram":
          window.open("https://telegram.me/share/url?url=" + pageUrl, "_blank");
          break;
        case "whatsapp":
          window.open(
            "https://api.whatsapp.com/send?text=" + pageUrl,
            "_blank",
          );
          break;
        case "facebook":
          window.open(
            "https://www.facebook.com/sharer.php?u=" + pageUrl,
            "_blank",
          );
          break;
        case "twitter":
          window.open(
            "https://twitter.com/intent/tweet?url=" +
              pageUrl +
              "&text=" +
              pageTitle,
            "_blank",
          );
          break;
        case "linkedin":
          window.open(
            "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl,
            "_blank",
          );
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.col-posts {
  flex: 0 0 450px;
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
}
.image-container {
  text-align: center;
}
.fa{
  font-size: 22px;
  cursor: pointer;
}
.share-icons{
  display: flex;
  gap: 20px;
}
.card {
  background: none;
  .card-body {
    padding: 10px 0;
    font-size: 18px;
  }
  .card-link {
    img {
      max-width: 100%;
    }
  }
}
.fa-twitter {
  color: #1da1f2;
}

.fa-facebook {
  color: #4267b2;
}

.fa-telegram {
  color: #229ed9;
}

.fa-whatsapp {
  color: #4fce5d;
}
.blog-img {
    object-fit: cover;
    width: 100%;
    max-height: 400px;
}
@media (max-width: 500px) {
  .blog-img {
    object-fit: contain;
    max-width: 100%;
  }
  .title-section{
    flex-direction: column;
  }
}
</style>
