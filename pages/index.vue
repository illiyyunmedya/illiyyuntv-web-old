<template>
  <div>
    <Header :banner-image-url="homeBanner" />
    <Posts v-for="(post, index) in posts" :key="index" :post="post"></Posts>
  </div>
</template>

<script>
export default {
  // middleware: "auth"
  async fetch() {
    const { data } = await this.$axios.get("/blogs");
    const { data: homeBanner } = await this.$axios.get("/banner");

    data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

    this.posts = data;
    this.homeBanner = homeBanner.Image ? homeBanner.Image.url : "";
  },
  data() {
    return {
      say: 10,
      // changeCollapseStatus: false
      posts: [],
      homeBanner: "",
    };
  },
  methods: {
    moveTo() {
      let to = this.moveToDown ? this.$refs.description.offsetTop - 60 : 0;

      window.scroll({
        top: to,
        left: 0,
        behavior: "smooth",
      });

      this.moveToDown = !this.moveToDown;
    },
  },
  mounted() {
    this.$refs["app-modal"].show();

    setInterval(() => {
      this.say--;

      if (this.say == 0) {
        this.$refs["app-modal"].hide();
      }
    }, 1000);
  },
};
</script>

<style scoped>
 ::v-deep #cover {
  height: 550px;
}

::v-deep .modal-header {
  background-color: #fff;
}
</style>
