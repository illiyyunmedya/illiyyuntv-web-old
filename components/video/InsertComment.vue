<template>
  <div>
    <div class="d-flex bd-highlight mb-3 mt-3">
      <div class="bd-highlight">
        <div class="defaultProfileDiv">
          <big
            ><b class="text-siyah">{{
              $store.state.userData.user.userFullName.charAt(0)
            }}</b></big
          >
        </div>
      </div>

      <div class="ml-3 flex-fill bd-highlight">
        <textarea
          @input="changeCommentValue"
          ref="commentArea"
          placeholder="Herkese açık bir yorum ekle..."
          class="form-control bg-transparent textAreaDotNone videoCommentTextarea p-0"
          style="min: height 50px"
        ></textarea>
        <transition-group name="home" mode="out-in">
          <b-button
            key="1"
            class="mt-2 bg-kirmizi ml-2 float-right"
            size="sm"
            :disabled="newComment.length < 3"
            v-if="newComment.length > 0"
            @click="submitComment"
            >Yorum ekle</b-button
          >

          <b-button
            key="2"
            class="mt-2 btn-white float-right"
            size="sm"
            v-if="this.newComment.length != 0"
            @click="cancelComment"
            >İptal</b-button
          >
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isReply", "commentItem"],
  data() {
    return {
      newComment: "",
      isCommentButton: false,
      isCancelButton: false,
    };
  },
  methods: {
    cancelComment() {
      this.newComment = "";
      this.$refs.commentArea.value = "";
      this.isCommentButton = false;
    },

    changeCommentValue(e) {
      this.newComment = e.target.value;
    },
    async submitComment() {
      let obj = {
        comment_comment: this.newComment,
        user_id: this.$store.state.userData.user.user_id,
        video_id: this.$route.params.videoId,
      };
      if (this.isReply) {
        
        obj.parentId =
          this.commentItem.parentId == 0
            ? this.commentItem.id
            : this.commentItem.parentId;

        obj.commentProps = {
          repliedCommentFullName: this.commentItem.userFullName,
          isReplied: false,
        };
      }
      const response = await this.$axios.$post(
        process.env.baseapi1 + "video/comments/add",
        {
          ...obj,
        }
      );
      if (response.durum == "success") {
        this.newComment = "";
        this.$refs.commentArea.value = "";
        this.$store.commit("afterSendComment", {
          ...response.results3[0],
          ...this.$store.state.userData.user,
        });
      }
    },
  },
  watch: {
    
    newComment() {
      const element = this.$refs.commentArea;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
      if (this.newComment == 0) {
        element.style.height = "50px";
      }
    },
  },
};
</script>
