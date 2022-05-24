<template>
  <div>
    <Header />
    <PhotoGallery :gallery="gallery" />
  </div>
</template>

<script>
export default {
  async fetch() {
    const query = this.$route.query.q
      ? `/galleries?_where[_or][0][description_contains]=${this.$route.query.q}&_where[_or][1][tags_contains]=${this.$route.query.q}`
      : "/galleries?_limit=-1";
    const { data: banner } = await this.$axios.get("/gallery-banner");
    const { data } = await this.$axios.get(query);

    this.gallery = data.sort((a, b) =>
      a.media.created_at < b.media.created_at ? 1 : -1
    );
    this.banner = banner.image ? banner.image.url : "";
  },

  data() {
    return {
      banner: "",
      gallery: [],
    };
  },
};
</script>
