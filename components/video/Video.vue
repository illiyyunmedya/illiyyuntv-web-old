<template>
  <div>
    <div class="container-fluid" id="videoPageContainer">
      <div class="row m-0">
        <div class="col mb-4" id="videoCol">
          <div
            class="embed-responsive embed-responsive-16by9"
            id="videoContent"
          >
            <iframe
              :src="
                'https://player.vimeo.com/video/' +
                videoId +
                '?autoplay=1&autopause=0'
              "
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></iframe>
          </div>

          <div class="d-flex justify-content-between">
            <div class="mt-4">
              <small v-for="(tag, index) in videoItem.tags" :key="index">
                <nuxt-link
                  style="font-size: 14px"
                  :to="'/videos?aranan=' + tag.tag"
                  >#{{ tag.tag }}
                </nuxt-link>
              </small>

              <h1 class="font-source-sans-pro font-size-25" id="videoBaslik">
                {{ videoItem.name }}
              </h1>
            </div>
            <div class="text-muted mt-4 pt-1">
              <!-- <i class="fa fa-heart font-size-25" aria-hidden="true"></i> 1.2 B
              &nbsp;&nbsp;&nbsp;&nbsp; -->
              <b-dropdown
                right
                size="lg"
                variant="link"
                no-caret
                toggle-class="m-0 p-0"
              >
                <template #button-content>
                  <i
                    class="
                      fa fa-cloud-download fa-2x
                      m-0
                      btn
                      bg-kirmizi
                      text-white
                      p-1
                      pl-2
                      pr-2
                    "
                  ></i>

                  <span class="sr-only">Search</span>
                </template>
                <template v-for="(downItem, index) in videoItem.files">
                  <b-dropdown-item
                    :href="downItem.link"
                    v-if="index != 5"
                    :key="index"
                    download
                    ><i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    {{ downItem.public_name }} ({{ downItem.size_short }})
                  </b-dropdown-item>
                </template>
              </b-dropdown>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6" style="font-size: 14px">
              <p class="text-muted">
                <i class="fa fa-play-circle" aria-hidden="true"></i>
                <span
                  v-html="
                    videoItem.stats.plays == 0
                      ? 'Görüntüleme Yok'
                      : videoItem.stats.plays + ' Görüntülenme'
                  "
                ></span>
                &nbsp;&nbsp; <i class="fa fa-clock-o" aria-hidden="true"></i>
                {{ $timeCreate(videoItem.created_time.split("T")[0]) }}
              </p>
            </div>
          </div>

          <div>
            <span v-b-modal.modal-1>
              Paylaş
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-share"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                />
              </svg>
            </span>

            <b-modal id="modal-1" hide-footer hide-header title="BootstrapVue">
              <div class="modal-content col-12">
                <div class="modal-header">
                  <h5 class="modal-title">Paylaş</h5>
                  <button
                    type="button"
                    class="close"
                    @click="$bvModal.hide('modal-1')"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mt-3">
                  <div class="icon-container1 d-flex">
                    <div class="smd">
                      <a
                        target="_blank"
                        :href="
                          'https://twitter.com/intent/tweet?text=' +
                          videoItem.name.replace('|', '-') +
                          '&amp;url=' +
                          link
                        "
                      >
                        <i
                          class="img-thumbnail fa fa-twitter fa-2x p-3"
                          style="color: #4c6ef5; background-color: aliceblue"
                        ></i>
                        <p>Twitter</p></a
                      >
                    </div>

                    <div class="smd">
                      <a
                        target="_blank"
                        :href="
                          'https://www.facebook.com/sharer/sharer.php?u=' + link
                        "
                      >
                        <i
                          class="
                            img-thumbnail
                            fa fa-facebook-official fa-2x
                            p-3
                          "
                          style="color: #3b5998; background-color: #eceff5"
                        ></i>
                        <p>Facebook</p>
                      </a>
                    </div>
                    <div class="smd">
                      <a
                        :href="
                          'http://www.reddit.com/submit?url=' +
                          link +
                          '&title=' +
                          videoItem.name
                        "
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          class="img-thumbnail fa fa-reddit-alien fa-2x p-3"
                          style="color: #ff5700; background-color: #fdd9ce"
                        ></i>
                        <p>Reddit</p></a
                      >
                    </div>
                  </div>
                  <div class="icon-container2 d-flex">
                    <div class="smd">
                      <a
                        :href="
                          'whatsapp://send?text=' + link + ' ' + videoItem.name
                        "
                        data-action="share/whatsapp/share"
                        target="_blank"
                        ><i
                          class="img-thumbnail fa fa-whatsapp fa-2x p-3"
                          style="color: #25d366; background-color: #cef5dc"
                        ></i>
                        <p>Whatsapp</p></a
                      >
                    </div>
                    <div class="smd">
                      <div
                        class="img-thumbnail fa fa-messenger fa-2x p-3"
                        style="color: #3b5998; background-color: #eceff5"
                      >
                        <a
                          target="_blank"
                          :href="'fb-messenger://share/?link=' + link"
                        >
                          <img
                            width="30"
                            src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Facebook_Messenger-512.png"
                            alt=""
                          />
                        </a>
                      </div>

                      <a
                        target="_blank"
                        :href="'fb-messenger://share/?link=' + link"
                      >
                        <p>Messenger</p>
                      </a>
                    </div>
                    <div class="smd">
                      <a
                        :href="
                          'https://telegram.me/share/url?url=' +
                          link +
                          '&text=' +
                          videoItem.name
                        "
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          class="img-thumbnail fa fa-telegram fa-2x p-3"
                          style="color: #4c6ef5; background-color: aliceblue"
                        ></i>
                        <p>Telegram</p></a
                      >
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <label style="font-weight: 600"
                    >Sayfa Linki <span class="message"></span></label
                  ><br />

                  <div class="row">
                    <input
                      class="col-10 ur"
                      type="url"
                      :value="link"
                      id="myInput"
                      aria-describedby="inputGroup-sizing-default"
                      style="height: 40px"
                    />
                    <button class="cpy" @click="kopyala">
                      <i class="fa fa-clone"></i>
                    </button>
                  </div>
                  <span v-if="linkmesaj">Kopyalandı!</span>
                </div>
              </div>
            </b-modal>
          </div>

          <div class="yanCizgi mt-2"></div>
          <div>
            <div class="custom-row m-0 mt-2">
              <img
                style="border-radius: 50%"
                src="https://res.cloudinary.com/dt2yilfxo/image/upload/v1648170617/logo_a57e49401f.png"
                class="logo"
              />

              <span class="p-3" style="font-family: Open Sans"
                ><b class="row m-0"
                  ><nuxt-link to="/videos/all" class="c-p mr-2"
                    ><span>İlliyyûnTV</span>
                  </nuxt-link>
                  <span
                    :style="`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 17px;
                            margin-top: 3px;
                        height: 17px;
                        
                        border-radius: 50%;`"
                  >
                    <img src="@/assets/media/tick.png" width="20" alt="" srcset=""> </span></b
              ></span>
            </div>
            <div class="mt-3">
              <div class="accordion" id="faq">
                <!-- <p>Okuyan; Salem alrwailiy</p> -->
                <p>
                  Sadece meal okumak ile Kur'ân-ı Kerim'in bir çok âyetinin
                  anlaşılması mümkün değildir. Mutlaka bir tefsire başvurulması
                  gerekir.
                </p>
                <p>
                  Tefsir için tıklayınız;
                  <a
                    target="blank"
                    href="https://mega.nz/folder/T8MCTILT#Q7cNjUEiSdUSUiCKtaKtWQ"
                    >https://mega.nz/folder/T8MCTILT#Q7cNj...</a
                  >
                </p>
                <b-collapse id="collapse-2">
                  <p>
                    Hadis için tıklayınız;
                    <a
                      target="blank"
                      href="https://mega.nz/folder/DxExGSqC#Is6xpyAN5EIxiWdiSS2Xmw"
                      >https://mega.nz/folder/T8MCTILT#Q7cNj...</a
                    >
                  </p>

                  <p>İbn Abbâs (Radıyallahu anh) dedi ki;</p>

                  <p>"Kur'ân'ın tefsiri dört yöndedir:</p>

                  <p>
                    • Birincisi, arapların kendi dilleri ile bildiği tefsir.
                  </p>

                  <p>
                    • İkincisi, bilmemenin mazeret olmadığı ve herkesin bilmesi
                    gereken tefsir.
                  </p>

                  <p>• Üçüncüsü, âlimlerin bildiği tefsir.</p>

                  <p>• Dördüncü ise, yalnızca Allah'ın bildiği tefsirdir.</p>

                  <p>Kim bu tefsiri bildiğini iddia ederse, o yalancıdır."</p>

                  <p>(Mecmû'u'l-Fetâvâ: 5/37)</p>

                  <p>
                    <a
                      v-for="(tag, index) in videoItem.tags"
                      href="#"
                      :key="index"
                      >#{{ tag.tag }} &nbsp;
                    </a>
                  </p>
                </b-collapse>

                <div class="yanCizgi position-relative">
                  <div id="plusIconDiv">
                    <i
                      @click="
                        updateCollapseStatus(!videoPageData.collapseStatus)
                      "
                      v-b-toggle.collapse-2
                      :class="{
                        'fa fa-plus-circle': videoPageData.collapseStatus,
                        'fa fa-times-circle': !videoPageData.collapseStatus,
                      }"
                      id="plusIconVideoPage"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <small
            >{{
              Object.keys(videoPageData.comments).length == 0
                ? "Henüz yorum yapılmamış, ilk yorumu siz yapın"
                : Object.keys(videoPageData.comments).length + " Yorum"
            }}
          </small>

          <InsertComment
            v-if="$store.state.userData.user.user_id != null"
          ></InsertComment>

          <div class="mt-3" v-else>
            <p style="font-size: 14px">
              Yorum yapabilmek için lütfen
              <nuxt-link to="/">kaydolun veya giriş</nuxt-link>
              yapın.
            </p>
          </div>

          <div class="comments mt-5">
            <CommentItem
              v-for="commentItem in videoPageData.comments"
              :key="commentItem.id"
              :commentItem="commentItem"
            ></CommentItem>
            <infinite-loading spinner="spiral" @infinite="infiniteScroll">
              <span slot="no-more"></span>
              <span slot="no-results"></span>
            </infinite-loading>
          </div>
        </div>
        <div class="col my-sidebar">
          <div class="d-flex justify-content-between mt-2">
            <span style="line-height: 100%"><small>Sıradaki</small></span>
            <span style="line-height: 100%"
              ><small>OTOMATİK OYNAT&nbsp;&nbsp;</small>
              <label class="switch">
                <input
                  :checked="videoPageData.autoPlayStatus"
                  @click="
                    $store.commit(
                      'autoPlayStatusChange',
                      !videoPageData.autoPlayStatus
                    )
                  "
                  type="checkbox"
                />
                <span class="slider round"></span>
              </label>
            </span>
          </div>
          <br />
          <HorizontalVideoCard :url="url"> </HorizontalVideoCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Cookie from "js-cookie";

export default {
  props: ["videoItem", "url"],
  middleware: ["generalControls"],
  data() {
    return {
      videoId: this.$route.params.videoId,
      commentPage: 0,
      link: "https://illiyyuntv.com/videos/watch/" + this.$route.params.videoId,
      linkmesaj: false,
    };
  },

  computed: {
    ...mapGetters({
      videoPageData: "videoPageData",
    }),
  },

  methods: {
    kopyala() {
      var copyText = this.$refs.link;
      var copyText = document.getElementById("myInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.linkmesaj = true;
    },
    infiniteScroll($state) {
      this.$store
        .dispatch(
          "getVideoPageDatas",
          this.$route.params.videoId + "&page=" + this.commentPage
        )
        .then((response) => {
          if (response == true) {
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.commentPage++;
    },

    endedEvent: function () {
      if (this.videoPageData.autoPlayStatus == true) {
        this.$emit("ended");
      }
    },
    updateCollapseStatus(val) {
      this.$store.commit("updateCollapseStatus", val);
    },
  },
  mounted() {
    let iframe = document.querySelector("iframe");
    let player = new Vimeo.Player(iframe);
    player.on("ended", this.endedEvent);
  },
};
</script>
<style scoped>
#plusIconVideoPage {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}
.logo{
  aspect-ratio: contain;
  width: 40px;
  height: 40px;
  margin-bottom: -10px;
}
.custom-row{
  display: flex;
  align-items: center;
}
</style>
