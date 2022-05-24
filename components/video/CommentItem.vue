<template>
  <div v-if="commentItem.parentId == 0 || replyComp">
    <div class="media mt-3">
      <div class="bd-highlight mr-3">
        <div class="defaultProfileDiv">
          <big
            ><b class="text-siyah">{{
              commentItem.userFullName.charAt(0)
            }}</b></big
          >
        </div>
      </div>

      <div class="media-body">
        <div class="d-flex justify-content-between">
          <big class="mt-0" style="font-size: 17px !important">
            {{ commentItem.userFullName }}
            <small class="text-muted ml-2">{{
              $timeEgo(Date.parse(commentItem.comment_date))
            }}</small>
          </big>
          <b-dropdown
            v-if="$store.state.userData.user.user_id != null"
            right
            size="lg"
            variant="link"
            no-caret
            toggle-class="m-0 p-0"
          >
            <template #button-content>
              <i class="text-decoration-none fa fa-ellipsis-v m-0 text-gri"></i>
              <span class="sr-only">Search</span>
            </template>
            <template
              v-if="
                $store.state.userData.user.userType == 1 ||
                commentItem.user_id == $store.state.userData.user.user_id
              "
            >
              <b-dropdown-item
                v-if="commentItem.user_id == $store.state.userData.user.user_id"
                @click="isEditing = true"
                href="#"
                >Düzenle</b-dropdown-item
              >
              <b-dropdown-item @click="deleteComment" href="#"
                >Sil</b-dropdown-item
              >
            </template>
            <b-dropdown-item
              v-if="
                $store.state.userData.user.userType != 1 &&
                commentItem.user_id != $store.state.userData.user.user_id
              "
              >Şikayet et</b-dropdown-item
            >
            <b-dropdown-item
              @click="banned"
              v-if="$store.state.userData.user.userType == 1"
              >Üyeyi Engelle</b-dropdown-item
            >
          </b-dropdown>
        </div>

        <div class="commentParagItem">
          <div class="accordion" id="faq">
            <small
              v-html="
                replyComp
                  ? '<span class=text-mavi>@' +
                    JSON.parse(commentItem.commentProps)
                      .repliedCommentFullName +
                    '</span>  '
                  : ''
              "
            ></small>
            <div
              :contenteditable="isEditing"
              ref="commentArea"
              v-html="commentItem.comment_comment"
              @input="newComment"
              :class="{
                activeEditing: isEditing,
                'font-size-15 font-source-sans-pro commentDiv mt-2': true,
              }"
              :style="readMore ? 'max-height:none !important' : ''"
            ></div>
            <div v-if="isEditing">
              <b-button
                key="1"
                class="mt-2 bg-kirmizi ml-2 float-right"
                size="sm"
                @click="updateComment"
                >Kaydet</b-button
              >

              <b-button
                key="2"
                class="mt-2 btn-white float-right"
                size="sm"
                @click="cancelEditing"
                >İptal</b-button
              >
            </div>

            <i
              ><p
                v-if="
                  commentItem.comment_comment.split(/\r\n|\r|\n/).length > 7 &&
                  isEditing == false
                "
                v-text="readMore ? 'devamını gizle' : 'devamını oku'"
                style="cursor: pointer"
                @click="readMore = !readMore"
              ></p
            ></i>
          </div>
        </div>

        <div style="line-height: 20px" class="mt-2">
          <div class="row m-0">
            <big
              ><i
                @click="
                  likeAComment({
                    id: commentItem.id,
                    user_id: $store.state.userData.user.user_id,
                  })
                "
                :class="{
                  'fa fa-thumbs-up text-gri': true,
                  'text-mavi': configLikes(
                    commentItem.comment_likes,
                    'isLiked'
                  ),
                }"
                style="cursor: pointer"
                aria-hidden="true"
              ></i
              >&nbsp;&nbsp;</big
            >
            <span class="text-muted"
              ><small
                v-html="configLikes(commentItem.comment_likes, 'userLikes')"
              ></small></span
            >&nbsp;&nbsp;&nbsp;&nbsp;

            <div>
              <i
                v-if="
                  JSON.parse(commentItem.comment_likes).adminLike == 1 ||
                  $store.state.userData.user.userType == 1
                "
                @click="
                  $store.state.userData.user.userType == 1
                    ? likeAComment({
                        id: commentItem.id,
                        user_id: $store.state.userData.user.user_id,
                        type: 'likeAdmin',
                      })
                    : null
                "
                class="fa fa-heart text-gri"
                :class="{
                  'text-kirmizi':
                    JSON.parse(commentItem.comment_likes).adminLike == 1,
                }"
                aria-hidden="true"
                style="cursor: pointer"
              ></i>
              <img style="border-radius:50%"
                v-if="JSON.parse(commentItem.comment_likes).adminLike == 1"
                src="@/assets/media/images/site/illiyyunProfileLogo.png"
                width="20"
              />
            </div>
            <span
              v-if="$store.state.userData.user.user_id != null"
              @click="isReply = !isReply"
              class="text-muted ml-2 c-p"
              >&nbsp;Yanıtla</span
            >
          </div>
          <InsertComment
            :commentItem="commentItem"
            :isReply="isReply"
            v-if="$store.state.userData.user.user_id != null && isReply == true"
          ></InsertComment>
          <p
            @click="!isOpenReplies ? getReplies() : hideReplies()"
            v-if="
              JSON.parse(commentItem.commentProps).isReplied == true &&
              !replyComp
            "
            class="mt-2 text-mavi c-p"
            v-text="!isOpenReplies ? 'Yanıtları gör' : 'Yanıtları gizle'"
          ></p>
          <CommentItem
            v-for="repliesItem in commentItem.replies"
            :key="repliesItem.id"
            :commentItem="repliesItem"
            :replyComp="true"
          ></CommentItem>
          <p
            class="text-mavi mt-3 c-p"
            @click="getReplies"
            v-if="isNextData && isOpenReplies"
          >
            Daha fazla yanıt gör
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  props: ["commentItem", "replyComp"],
  name: "CommentItem",
  data() {
    return {
      isEditing: false,
      readMore: false,
      editedComment: null,
      isReply: false,
      parentUser: null,
      isOpenReplies: false,
      isNextData: false,
    };
  },
 
  methods: {
    async banned() {
      if (confirm("Üye engellensinmi ? üyeye dair tüm içerik silinecek.")) {
        const response = await this.$axios.$post(
          process.env.baseapi1 + "user/delete",
          {
            id: this.commentItem.user_id,
          }
        );
        if (response.durum == "success") {
          Cookie.remove("acsess_token");

          this.$toast.success("Üye engellendi.", { duration: 3000 });
        } else {
          this.$toast.success("Bir sorun oluştu.", { duration: 3000 });
        }
      }
    },

    promise(term, payload) {
      return this.$store
        .dispatch(term, payload)
        .then((res) => {
          return res;
        })
        .then((resp) => {
          return resp;
        });
    },
    cancelEditing() {
      this.$refs.commentArea.innerHTML = this.commentItem.comment_comment;
      this.isCommentButton = false;
      this.isEditing = false;
    },
    async getReplies() {
      const mevcut = this.commentItem.replies
        ? this.commentItem.replies.length
        : 0;
      const res = await this.promise("getReplies", {
        id: this.commentItem.id,
        mevcut,
      });
      this.isNextData = res;
      this.isOpenReplies = true;
    },
    hideReplies() {
      this.$store.commit("hideReplies", this.commentItem.id);
      this.isOpenReplies = false;
    },
    newComment(val) {
      this.editedComment = val.target.innerHTML;
    },
    async updateComment() {
      await this.$store
        .dispatch("updateComment", {
          id: this.commentItem.id,
          user_id: this.commentItem.user_id,
          comment_comment: this.editedComment,
          parentId: this.commentItem.parentId,
        })
        .then((r) => {
          this.$toast.success("Yorum güncellendi.", { duration: 3000 });
        })
        .catch((e) => {
          this.$toast.error("Bir hata oluştu.", { duration: 3000 });
        });
      this.cancelEditing();
    },
    async deleteComment() {
      const response = await this.$axios.$post(
        process.env.baseapi1 + "video/comments/delete",
        {
          id: this.commentItem.id,
          user_id: this.commentItem.user_id,
          parentId: this.commentItem.parentId,
        }
      );
      if (response.durum == "success") {
        await this.$store.commit("deleteComment", {
          id: this.commentItem.id,
          parentId: this.commentItem.parentId,
        });
        this.$toast.success("Yorum silindi.", { duration: 3000 });
      }
    },

    configLikes(obj, opt) {
      if (opt == "userLikes") {
        return JSON.parse(obj).userLikes;
      }
      if (opt == "isLiked") {
        return (
          JSON.parse(obj).userIds.find(
            (x) => x === this.$store.state.userData.user.user_id
          ) != undefined
        );
      }
    },
    likeAComment(obj) {
      this.$store.dispatch("likeAComment", obj);
    },
  },
 
 
};
</script>

<style>
.activeEditing {
  max-height: none !important;
  padding: 10px;
  background-color: #202020;
}
.commentDiv {
  white-space: pre-wrap;
  max-height: 160px;
  overflow: hidden;
  width: 100%;
}
</style>
