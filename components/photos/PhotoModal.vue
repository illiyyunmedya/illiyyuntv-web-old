<template>
  <div>
    <!-- Modal -->
    <div>
      <b-modal
        id="modal-center"
        centered
        title="BootstrapVue"
        size="xl"
        hide-header
        hide-footer
        :modal-class="'pl-0'"
        @hidden="closed"
      >
        <span
          class="btn pt-1 pl-2"
          @click="$bvModal.hide('modal-center')"
          id="closeCommentModal"
        >
          X
        </span>
        <i
          class="fa fa-chevron-left btn p-0"
          id="galleryPrevIcon"
          @click="prev"
        ></i>
        <i
          class="fa fa-chevron-right btn p-0"
          id="galleryNextIcon"
          @click="next"
        ></i>
        <div class="row m-0" style="background-color: #111111">
          <div class="col-xl-6 p-1" id="imageContent">
            <img :src="getPhotoUrl" style="width: 100%" />
          </div>
          <div class="col-xl-6 p-3" id="commentContent">
            <div class="modal-wrapper">
              <div class="photo-data">
                <div>
                  <b>illiyyuntv</b>
                </div>

                <!-- <p>
                  Ali radıyallahu anh şöyle demiştir: Onlara öğretin ve terbiye
                  edin (eğitin)
                </p> -->
                <!-- <p>(Zadü'l Mesir Fi İlmi't Tefsir)</p> -->
                <div class="mt-3">
                  {{ getPhotoDescription }}
                </div>
              </div>
              <div class="photo-footer">
                <p class="text-muted mt-1">{{ getPhotoDate }}</p>
                <p>
                  <i
                    @click="download(photoData.media)"
                    id="indir"
                    class="fa fa-arrow-down"
                  ></i>
                </p>
              </div>
            </div>
            <!-- <div style="border-top: solid 3px #261d1e; width: 100%"></div> -->
            <!-- <div class="commentContent mt-3" style="line-height: 25px">
              <div class="d-flex justify-content-between">
                <div style="color: #a6a6a6">
                  <span>599 Beğeni</span>
                  <div style="font-size: 27px">
                    <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    <i class="fa fa-paper-plane p-1" aria-hidden="true"></i>
                    <i class="fa fa-comment-o p-1" aria-hidden="true"></i>
                  </div>
                  <p>10 Ağustos</p>
                </div>
                <div class="text-center" style="color: #a6a6a6">
                  <span>999</span>
                  <div
                    class="text-center"
                    style="
                      border: solid 3px #261d1e;
                      border-radius: 5px;
                      font-size: 20px;
                    "
                  >
                    <i class="fa fa-arrow-down m-2"></i>
                  </div>
                  <p>İndir</p>
                </div>
              </div>
              <div style="position: relative">
                <input
                  type="text"
                  class="form-control"
                  name=""
                  value="@TareqMohammad "
                  id="commentTextArea"
                />
              </div>
            </div> -->
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["photoData"],

  methods: {
    prev() {
      this.$emit("prev");
    },

    next() {
      this.$emit("next");
    },

    closed() {
      this.$emit("closed");
    },
    download(img) {
      axios({
        method: "get",
        url: img.url,
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", img.name || "image");
        document.body.appendChild(link);
        link.click();
      });
    },
  },

  watch: {
    photoData: function () {
      if (this.photoData?.media.url != null) {
        this.$bvModal.show("modal-center");
      }
    },
  },
  computed: {
    getPhotoUrl() {
      return this.photoData?.media.url;
    },
    getPhotoDescription() {
      return this.photoData?.description || "";
    },
    getPhotoDate() {
      const d = new Date(this.photoData?.created_at);
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

<style>
.photo-footer{
  display: flex;
  justify-content: space-between;
}
.modal-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

#galleryPrevIcon {
  font-size: 30px;
  color: #ffffff80;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: -30px;
  z-index: 12;
  height: 100%;
}

#galleryNextIcon {
  font-size: 30px;
  color: #ffffff80;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: -30px;
  z-index: 15;
  height: 100%;
}

#commentContent {
  border: solid 3px #261d1e;
  font-family: Montserrat;
  font-weight: 200;
  font-size: 15px;
  color: #fff;
}

#imageContent {
  border: solid 3px #261d1e;
}

#closeCommentModal {
  font-size: 20px;
  color: white;
  position: absolute;
  font-family: Helvetica;
  z-index: 13;
}

#commentTextArea {
  background-color: transparent;
  border-radius: 50px;
  border: solid 1px #494142;
}

.modal-content {
  background-color: transparent !important;
}

.photo-data {
}

#indir {
  color: #d6d6d6;
  border: solid 1px white;
  padding: 5px 5px 5px 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
