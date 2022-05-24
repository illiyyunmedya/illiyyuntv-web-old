<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-md-3"
        v-for="(post, index) in posts"
        :key="`horizontal-post-${index}`"
      >
        <div class="">
          <nuxt-link class="card-link" :to="`/blog/${post.slug}`">
            <img :src="post.image.url" alt="" />
          </nuxt-link>
          <div class="card-body">
            <p class="card-text">
              {{ post.title }}
            </p>
            <p class="card-date text-muted">
              {{ getPhotoDate(post) }}
            </p>
            <p class="card-date text-muted">
              {{ post.views ? post.views : 1 }} Görüntülenme
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getPhotoDate(post) {
      const d = new Date(post?.created_at);
      const yyyy = d.getFullYear();
      let mm = d.getMonth() + 1; // Months start at 0!
      let dd = d.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const returnDate = dd + "/" + mm + "/" + yyyy;
      return returnDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: none;
}
.card-body {
  padding: 1.25rem 0;
}
.card-text {
  font-size: 1.2rem;
  margin: 0;
}
.card-date {
  margin: 0;
}
.card-link {
  height: 250px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>