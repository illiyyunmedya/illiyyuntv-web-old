<template>
  <div>
    <div v-if="$route.path == '/videos/all'">
      <Videos :videos="horizonData.videos"></Videos>
    </div>

    <div
      v-else
      class="oneriVideoItem"
      v-for="(relatedItem, index) in horizonData.videos"
      :key="relatedItem.name + index + $route.query.aranan"
    >
      <div class="row">
        <div
          class="col"
          :style="{ maxWidth: $route.query.aranan ? '320px' : '220px' }"
        >
          <div class="position-relative">
            <span class="badge p-1 bg-siyah videoTimeSpan">{{
              $videoTime(relatedItem.duration)
            }}</span>
            <nuxt-link :to="'/videos/watch/' + relatedItem.link.split('/')[3]">
              <img
                :src="relatedItem.pictures.sizes[3].link"
                style="width: 100%; cursor: pointer"
                alt=""
              />
            </nuxt-link>
          </div>
        </div>
        <div class="col p-0">
          <span
            ><nuxt-link
              :to="'/videos/watch/' + relatedItem.link.split('/')[3]"
              style="cursor: pointer; text-decoration: none; color: white"
              >{{
                relatedItem.name.length > 40
                  ? relatedItem.name.slice(0, 40) + "..."
                  : relatedItem.name
              }}</nuxt-link
            ></span
          >
          <br />
          <span class="text-muted"
            ><small>
              <span
                v-html="
                  relatedItem.stats.plays == 0
                    ? '0'
                    : relatedItem.stats.plays + ' görüntüleme'
                "
              ></span>
              •
            </small></span
          >

          <span class="text-muted"
            ><small>
              <span>{{
                $timeEgo(Date.parse(relatedItem.created_time))
              }}</span></small
            ></span
          >
        </div>
      </div>
    </div>
    <infinite-loading
      v-if="!this.$route.query.q"
      :key="infiniteKey"
      spinner="spiral"
      @infinite="infiniteScroll"
    >
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["url"],
  data() {
    return {
      infiniteKey: "infiniteKey",
      page: 2,
      per_page: 12,
    };
  },
  computed: {
    ...mapGetters({
      horizonData: "horizonVidCardData",
    }),
    lastUrl: function () {
      let url = this.url;
      this.$route.query.aranan
        ? (url = "query=" + this.$route.query.aranan)
        : "";
      return url + "&per_page=" + this.per_page + "&page=" + this.page;
    },
  },

  methods: {
    infiniteScroll($state) {
      this.$store
        .dispatch("getVideosForHorizontalVidCard", this.lastUrl)
        .then((response) => {
          if (response == true) {
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
          $state.complete();
        });
      this.page++;
    },
  },
  watch: {
    "$route.query.aranan": function () {
      this.infiniteKey = Math.random() * 100;
    },
  },
};
</script>
