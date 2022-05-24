<template>
  <div>
    <transition name="home">
      <div id="searchModal" v-if="isActiveSearchModal">
        <div class="d-flex justify-content-end">
          <i
            class="fa fa-close p-2 bg-danger m-2 btn text-white"
            style="font-size: 30px"
            @click="isActiveSearchModal = false"
          ></i>
        </div>

        <div id="modalStyle">
          <div class="relative">
            <div v-if="showSearchResult" class="search-result-mobile">
                <a
                    :href="videoCount > 0 ? `/videos/all?q=${searchKey}` : '#'"
                    class="result-item"
                  >
                    <span class="left">Videolar</span>
                    <span class="right">{{ videoCount }} İçerik</span>
                  </a>
                  <a
                    :href="
                      galleryCount > 0 ? `/photos?q=${searchKey}` : '#'
                    "
                    class="result-item"
                  >
                    <span class="left">Resimler</span>
                    <span class="right">{{ galleryCount }} İçerik</span>
                  </a>
                  <a
                    :href="
                      blogCount > 0 ? `/blog?q=${searchKey}` : '#'
                    "
                    class="result-item"
                  >
                    <span class="left">Yazılar</span>
                    <span class="right">{{ blogCount }} İçerik</span>
                  </a>
            </div>
          </div>
          <div class="input-group">
            <input
              type="text"
              name=""
              class="form-control"
              placeholder="Ara"
              id="modalSearchBar"
              v-model="searchKey"
              @input="search"
            />

            <i
              class="fa fa-search text-secondary p-3 c-p"
              id="modalSearchButton"
              @click="search"
            ></i>
          </div>
        </div>
      </div>
    </transition>

    <transition name="home">
      <div id="menuModal" v-if="isActiveMenuModal">
        <div class="d-flex justify-content-end">
          <i
            class="fa fa-close p-2 bg-danger m-2 btn text-white"
            style="font-size: 30px"
            @click="isActiveMenuModal = false"
          ></i>
        </div>

        <div class="d-flex justify-content-center" id="modalStyle">
          <div
            class="d-flex flex-column"
            style="font-size: 25px; font-family: Montserrat"
          >
            <div class="itemIcon p-1 text-white">
              <p>
                <nuxt-link to="/" class="text-center">
                  <i class="fa fa-home" aria-hidden="true"></i>
                  Ana Sayfa</nuxt-link
                >
              </p>
            </div>
            <div class="itemIcon p-1 text-white">
              <p>
                <nuxt-link to="/videos/all" class="text-center">
                  <i class="fa fa-video-camera" aria-hidden="true"></i>
                  Videolar</nuxt-link
                >
              </p>
            </div>
            <div class="itemIcon p-1 text-white">
              <p>
                <nuxt-link to="/photos" class="text-center">
                  <i class="fa fa-picture-o" aria-hidden="true"></i>
                  Resimler</nuxt-link
                >
              </p>
            </div>
            <div class="itemIcon p-1 text-white">
              <p>
                <nuxt-link to="/blog" class="text-center">
                  <img src="/images/blog-icon.png" alt="" />
                  Yazılar</nuxt-link
                >
              </p>
            </div>
            <div class="itemIcon p-1 text-white">
              <p>
                <nuxt-link to="/" class="text-center">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  Hesabım</nuxt-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div
      id="cover"
      class="centeredBackgroundImage mobilHeightCover"
      :class="{ home: $route.fullPath === '/' }"
      :style="[
        bannerImageUrl.length > 0
          ? { 'background-image': `url(${bannerImageUrl})` }
          : '',
      ]"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="container-fluid px-0">
            <div
              id="pcMenu"
              class="menu d-flex justify-content-between align-items-center p-4"
              :class="{ home: $route.fullPath === '/' }"
            >
              <div id="logo">
                <nuxt-link to="/">
                  <img :src="logo" alt="İlliyyun Tv" />
                </nuxt-link>
              </div>
              <div
                class="
                  d-flex
                  align-items-center
                  flex-column
                  bd-highlight
                  relative
                "
              >
                <div class="mt-1 bd-highlight" id="searchDiv">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control search-input"
                      placeholder="Aranacak içerik..."
                      v-model="searchKey"
                      @input="search"
                    />
                    <div class="input-group-append">
                      <button class="btn search-btn" @click="search">
                        <b>ARA</b>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="showSearchResult" class="search-result">
                  <a
                    :href="videoCount > 0 ? `/videos/all?q=${searchKey}` : '#'"
                    class="result-item"
                  >
                    <span class="left">Videolar</span>
                    <span class="right">{{ videoCount }} İçerik</span>
                  </a>
                  <a
                    :href="
                      galleryCount > 0 ? `/photos?q=${searchKey}` : '#'
                    "
                    class="result-item"
                  >
                    <span class="left">Resimler</span>
                    <span class="right">{{ galleryCount }} İçerik</span>
                  </a>
                  <a
                    :href="
                      blogCount > 0 ? `/blog?q=${searchKey}` : '#'
                    "
                    class="result-item"
                  >
                    <span class="left">Yazılar</span>
                    <span class="right">{{ blogCount }} İçerik</span>
                  </a>
                </div>
              </div>
              <div class="d-flex justify-content-between" id="headerIcons">
                <div class="itemIcon p-1">
                  <nuxt-link to="/videos/all">
                    <div>
                      <i class="fa fa-video-camera"></i>
                    </div>
                    <span>Videolar</span>
                  </nuxt-link>
                </div>
                <div class="itemIcon p-1">
                  <nuxt-link to="/photos">
                    <div>
                      <i class="fa fa-picture-o"></i>
                    </div>
                    <span>Resimler</span>
                  </nuxt-link>
                </div>
                <div class="itemIcon p-1">
                  <nuxt-link to="/blog">
                    <div>
                      <img src="/images/blog-icon.png" alt="" />
                    </div>
                    <span>Yazılar</span>
                  </nuxt-link>
                </div>
                <div v-if="$store.state.userData.isLogin" class="itemIcon p-1">
                  <nuxt-link to="/">
                    <div>
                      <i class="fa fa-user-circle"></i>
                    </div>
                    <span>Hesabım</span>
                  </nuxt-link>
                </div>

                <div
                  v-if="$store.state.userData.isLogin"
                  class="itemIcon p-1"
                  @click="logOut"
                >
                  <a href="#">
                    <div>
                      <i class="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                    <span>Çıkış</span>
                  </a>
                </div>
                <div class="itemIcon p-1" v-else>
                  <nuxt-link to="/">
                    <div>
                      <i class="fa fa-sign-in"></i>
                    </div>
                    <span>Kayıt / Giriş</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div
              id="mobilMenu"
              class="d-flex justify-content-between pt-2 mobilMenuDivPadding"
            >
              <div>
                <i
                  class="fa fa-bars text-white btn p-0"
                  style="font-size: 35px"
                  aria-hidden="true"
                  @click="isActiveMenuModal = true"
                ></i>
              </div>
              <div>
                <img :src="logo" alt="İlliyyun Tv" style="width: 50px" />
              </div>
              <div>
                <i
                  class="fa fa-search btn btn-danger btn-sm p-2"
                  id="mobilSearchButton"
                  @click="isActiveSearchModal = true"
                  aria-hidden="true"
                ></i>
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
  props: {
    bannerImageUrl: {
      default: "",
    },
  },

  async fetch() {
    const { data } = await this.$axios.get("/logo");

    this.logo = data.Image ? data.Image.url : "";
  },

  data() {
    return {
      logo: "",
      isActiveMenuModal: false,
      isActiveSearchModal: false,
      showSearchResult: false,
      searchKey: "",
      timer: undefined,
      videoCount: 0,
      blogCount: 0,
      galleryCount: 0,
    };
  },

  methods: {
    async search() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.doSearch, 500);
    },

    async doSearch() {
      this.showSearchResult = true;

      if (this.searchKey.length > 3) {
        let config = {
          headers: {
            Authorization: "bearer 65b33c797381dac21098a627af08ffe1",
            Accept:
              "application/vnd.vimeo.user+json;version=3.0,application/vnd.vimeo.video+json;version=3.4",
            "Content-Type": "application/json",
          },
        };

        const { data } = await this.$axios.get(
          "/blogs/count?title_contains=" + this.searchKey
        );
        this.blogCount = data;

        const { data: galleryCount } = await this.$axios.get(
          `/galleries/count?_where[_or][0][description_contains]=${this.searchKey}&_where[_or][1][tags_contains]=${this.searchKey}`
        );
        this.galleryCount = galleryCount;

        const videos = await this.$axios.$get(
          "https://api.vimeo.com/me/videos?query=" + this.searchKey,
          config
        );

        this.videoCount = videos.data.length;
      } else {
        this.showSearchResult = false;
      }
    },
  },
};
</script>

<style scoped>
#searchDiv {
  width: 500px;
  max-width: 95%;
}

.search-input {
  height: 44px;
}
</style>