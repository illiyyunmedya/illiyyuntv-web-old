<template>
  <div>
    <div class="container-fluid">
      <div v-if="videos.search">
        <p class="text-muted">
          <i>{{ videos.data.length }} adet sonuç bulundu</i>
        </p>
      </div>

      <div class="row">
        <div class="col-md-3" v-for="(video, index) in videos" :key="index">
          <div style="position: relative">
            <span
              class="badge p-1 bg-siyah"
              style="position: absolute; right: 7px; bottom: 5px"
              >{{ $videoTime(video.duration) }}</span
            >

            <nuxt-link
              :to="'/videos/watch/' + video.link.split('/')[3]"
              style="width: 100%; cursor: pointer"
            >
              <img :src="video.pictures.sizes[2].link"  style="width: 100%; cursor: pointer" alt="" />
            </nuxt-link>
          </div>
          <br />
          <span>
            <nuxt-link
              :to="'/videos/watch/' + video.link.split('/')[3]"
              style="cursor: pointer"
              >{{ video.name }}</nuxt-link
            >
          </span>
          <br />
          <span class="text-muted"
            ><small
              ><i class="fa fa-play-circle" aria-hidden="true"></i>
              <span
                v-html="
                  video.stats.plays == 0
                    ? 'Görüntüleme Yok'
                    : video.stats.plays + ' Görüntülenme'
                "
              >
              </span></small
          ></span>
          &nbsp;&nbsp;
          <span class="text-muted"
            ><small
              ><i class="fa fa-clock-o" aria-hidden="true"></i>
              <span>{{ $timeEgo(Date.parse(video.created_time)) }}</span>
            </small></span
          >
          <br /><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["videos"],
};
</script>

<style scoped>
#cover {
  background-image: url("~assets/media/images/site/videosHeadImage.jpg");
  position: relative;
  height: 400px;
  margin-bottom: -50px;
  -webkit-mask-image: -webkit-gradient(
    linear,
    center bottom,
    center top,
    color-stop(0, rgba(0, 0, 0, 0)),
    color-stop(1, rgba(0, 0, 0, 1))
  );
}

a {
  text-decoration: none !important;
  color: white;
}
</style>
