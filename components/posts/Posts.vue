<template>
  <div>
    <div class="p-4 mt-5 postCard">
      <div>
        <div class="custom-grid">
          <div class="">
            <nuxt-link :to="`/blog/${post.slug}`">
              <img
                v-if="post.image && post.image.url"
                :src="`${post.image.url}`"
                class=""
                style="width: 450px; max-width: 100%; border: 1px solid #4e4e4e"
              />
            </nuxt-link>
          </div>
          <div>
            <nuxt-link class="post-title" :to="`/blog/${post.slug}`">
              <h2>
                {{ post.title }}
              </h2>
            </nuxt-link>
            <p class="text-muted">
              <small
                ><i class="fa fa-clock-o" aria-hidden="true"></i>
                {{ convertDate(post.created_at) }}
                {{ post.views ? post.views : 1 }} Görüntülenme
              </small>
            </p>
            <div class="markdown-custom">
              <div>
                <markdown-it-vue
                v-if="showPosts"
                class="mt-3"
                :content="post.detail ? post.detail : ''"
                :class="{
                  postContentClosed: !collapseStatus,
                  postContentOpened: collapseStatus,
                }"
              />
              <nuxt-link :to="`/blog/${post.slug}`">
                <a style="float: right" v-if="collapseStatus" href=""
                  >Devamını oku</a
                >
              </nuxt-link>
              </div>
              <div :class="{ readMoreShadow: !collapseStatus }"></div>
            </div>
          </div>
          <!-- <div
            v-html="post.detail"
            :class="{
              postContentClosed: !collapseStatus,
              postContentOpened: collapseStatus,
            }"
          ></div> -->
        </div>

        <div id="plusIconDiv">
          <i
            @click="collapseStatus = !collapseStatus"
            :class="{
              'fa fa-times-circle': collapseStatus,
              'fa fa-plus-circle': !collapseStatus,
            }"
            id="plusIcon"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from "~/mixins/url.js";

export default {
  mixins: [url],
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      collapseStatus: false,
      showPosts: false,
    };
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
  },
  mounted() {
    setTimeout(() => {
      this.showPosts = true;
    }, 1000);
  },
};
</script>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  margin-bottom: 20px;
}
.post-title {
  text-decoration: none;
  color: inherit;
}
.postContentClosed {
  overflow: hidden;
  height: 220px !important;
}
.postContentOpened {
  /* height: 355px !important; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 20; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
#plusIcon {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}
#plusIconDiv i {
  bottom: -17px;
  cursor: pointer;
}
.readMoreShadow {
  width: 100%;
  height: 250px;
  position: absolute;
  top: 0;
  /* background-color: red; */
  background: linear-gradient(transparent 0px, #111111);
}

.ornek {
  margin: auto;
}
.sola-kaydir {
  float: left;
  margin: 0 40px 40px 0;
}
.markdown-custom {
  position: relative;
}

@media (max-width: 500px) {
  .custom-grid {
  display: grid;
  grid-template-columns:  auto;
  grid-gap: 20px;
  margin-bottom: 20px;
}
}
</style>
