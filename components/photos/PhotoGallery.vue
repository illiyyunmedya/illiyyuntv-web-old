<template>
  <div>
    <PhotoModal :photoData="imgData" @prev="prev" @next="next" @closed="closed"></PhotoModal>
    <div class="container-fluid">
      <div class="gallery">
        <div v-for="(item, index) in gallery" :key="`photo-${index}`" @click="setImgData(item)" class="gallery-item"
          tabindex="0" data-toggle="modal" data-target="#exampleModal">
          <i @click="download(item.media)" id="indir" class="fa fa-arrow-down"></i>

          <img :src="item.media.url" class="gallery-image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    gallery: {
      required: true,
      type: Array,
    },
  },


  updated() {
    try {
      if ("photo" in this.$route.params) {
        this.imgData = this.$route.params.photo
      }
      else if ("photo" in this.$route.query) {
        let photoData = (this.$route.query.photo && this.$parent.gallery.find((item) => item.id == this.$route.query.photo)) || null
        this.imgData = photoData
        this.time = new Date().getTime()
      }
    } catch (error) {
      this.imgData = null
    }
    this.$nuxt.refresh();

  },
  data() {
    return {
      time: new Date().getTime(),
      imgData: null,
    };
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `/photos/${pageNum}`;
    },
    setImgData(img) {
      this.$router.push({ name: "photos", query: img ? { photo: img.id, time: new Date().getTime() } : null })
      this.imgData = img
      this.time = new Date().getTime()
      this.$nuxt.refresh();
    },

    closed() {
      this.$router.replace({ 'query': null });
    },

    download(img) {
      axios({
        method: 'get',
        url: img.url,
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', img.name || 'image');
        document.body.appendChild(link);
        link.click();
      });
    },

    next() {
      const findIndex = this.gallery.findIndex(
        (item) => item === this.imgData
      );


      this.setImgData(
        this.gallery[
        findIndex < this.gallery.length - 1 ? findIndex + 1 : 0
        ])
    },

    prev() {
      const findIndex = this.gallery.findIndex(
        (item) => item === this.imgData
      );
      this.setImgData(
        this.gallery[
        findIndex === 0 ? this.gallery.length - 1 : findIndex - 1
        ])
    },
  },
};
</script>

<style scoped>
#cover {
  height: 200px;
  background-position: bottom top !important;
  background-image: url("~assets/media/images/site/galleryHead.jpg");
  margin-bottom: -100px;
  -webkit-mask-image: -webkit-gradient(linear,
      center bottom,
      center top,
      color-stop(0, rgba(0, 0, 0, 0)),
      color-stop(1, rgba(0, 0, 0, 1)));
}

/*

All grid code is placed in a 'supports' rule (feature query) at the bottom of the CSS (Line 310).

The 'supports' rule will only run if your browser supports CSS grid.

Flexbox and floats are used as a fallback so that browsers which don't support grid will still recieve a similar layout.

*/

/* Base Styles */

.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

/* Gallery Section */

.gallery {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 3rem;
  margin-top: -16px;
}

.gallery-item {
  position: relative;
  flex: 1 0 18rem;
  margin: 1rem;
  color: #fff;
  cursor: pointer;
}

.gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
  display: none;
}

.gallery-item-info span {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
}

.gallery-item-likes {
  margin-right: 2.2rem;
}

.gallery-item-type {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
}

.fa-clone,
.fa-comment {
  transform: rotateY(180deg);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#indir {
  position: absolute;
  right: 10px;
  z-index: 10;
  bottom: 10px;
  color: #d6d6d6;
  border: solid 1px white;
  padding: 5px 5px 5px 5px;
  border-radius: 5px;
}

#begen {
  position: absolute;
  left: 10px;
  z-index: 10;
  font-size: 20px;
  bottom: 10px;
  color: #d6d6d6;
}
</style>
