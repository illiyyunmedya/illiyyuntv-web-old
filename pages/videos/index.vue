<template>
  <div class="container-fluid">
    <HorizontalVideoCard :url="url"></HorizontalVideoCard>
  </div>
</template>
<script>
import axios from "axios";
export default {
  async asyncData(context) {
    let aranan = context.query.aranan;

    function cevir(aranan) {
      return aranan
        .replace("Ğ", "g")
        .replace("Ü", "u")
        .replace("Ş", "s")
        .replace("I", "i")
        .replace("İ", "i")
        .replace("Ö", "o")
        .replace("Ç", "c")
        .replace("ğ", "g")
        .replace("ü", "u")
        .replace("ş", "s")
        .replace("ı", "i")
        .replace("ö", "o")
        .replace("ç", "c");
    }

    aranan = await cevir(aranan);

    const url = "query=" + aranan;

    await context.store.dispatch(
      "getVideosForHorizontalVidCard",
      url + "&per_page=12&page=1"
    );

    return { url };
  },
  watch: {
    "$route.query.aranan": async function () {
         let aranan = this.$route.query.aranan;

    function cevir(aranan) {
      return aranan
        .replace("Ğ", "g")
        .replace("Ü", "u")
        .replace("Ş", "s")
        .replace("I", "i")
        .replace("İ", "i")
        .replace("Ö", "o")
        .replace("Ç", "c")
        .replace("ğ", "g")
        .replace("ü", "u")
        .replace("ş", "s")
        .replace("ı", "i")
        .replace("ö", "o")
        .replace("ç", "c");
    }

    aranan = await cevir(aranan);

    const url = "query=" + aranan;
      
     await this.$store.dispatch(
      "getVideosForHorizontalVidCard",
      url + "&per_page=12&page=1"
    );
    },
  },
};
</script>
