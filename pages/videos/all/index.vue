<template>
  <div>
    <Header />
    <HorizontalVideoCard :url="query"></HorizontalVideoCard>
  </div>
</template>
<script>
export default {
  async fetch() {
    this.query = this.$route.query.q
      ? `query=${this.$route.query.q}`
      : "&per_page=12&page=1";
    await this.$store.dispatch(
      "getVideosForHorizontalVidCard",
      this.query
    );
    const { data: banner } = await this.$axios.get("/videos-banner");

    this.banner = banner.image ? banner.image.url : "";
  },

  data() {
    return {
      query: "",
      banner: "",
    };
  },
};
</script>

