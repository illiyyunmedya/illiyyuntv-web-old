import Cookie from 'js-cookie'
import axios from 'axios'
import Vue from 'vue'


export const state = () => ({

  userData: {

    isLogin: false,
    user: {
      userEmail: "",
      userFullName: "",
      userName: "",
      userType: null,
      user_id: null,
    }

  },

  videoPageData: {
    isActiveEdit: false,
    collapseStatus: true,
    videCreatedTime: "",
    autoPlayStatus: false,
    isEditing: false,
    comments: []
  },

  horizonVidCardData: {

    videos: []
  }

})

export const mutations = {

  deleteHorizonData(state) {

    state.horizonVidCardData.videos = []

  },

  setHorizonVidCardData(state, payload) {

    state.horizonVidCardData.videos.push(...payload)
  },

  hideReplies(state, payload) {


    state.videoPageData.comments.find(x => x.id == payload).replies = null

  },

  setReplies(state, payload) {

    if (state.videoPageData.comments[state.videoPageData.comments.findIndex(x => x.id === payload[0].parentId)].replies) {

      state.videoPageData.comments[state.videoPageData.comments.findIndex(x => x.id === payload[0].parentId)].replies.push(...payload)

    } else {

      Vue.set(state.videoPageData.comments[state.videoPageData.comments.findIndex(x => x.id === payload[0].parentId)], 'replies', payload);

    }

  },

  updateComment(state, payload) {


    if (payload.parentId == 0) {

      state.videoPageData.comments.find(x => x.id === payload.id).comment_comment = payload.comment_comment

    } else {
      state.videoPageData.comments.find(x => x.id === payload.parentId).replies.find(x => x.id === payload.id).comment_comment = payload.comment_comment
    }


  },


  deleteComment(state, payload) {


    if (payload.parentId == 0) {

      const index = state.videoPageData.comments.findIndex(x => x.id === payload.id)
      state.videoPageData.comments.splice(index, 1)

    } else {

      Vue.delete(state.videoPageData.comments.find(x => x.id == payload.parentId).replies, state.videoPageData.comments.find(x => x.id == payload.parentId).replies.findIndex(x => x.id == payload.id))

    }

  },

  setANewCommentLikes(state, payload) {

    //eğer beğenilen üst yorumsa normal beğeni yaptık, alt yorumsa vue nin objenin alt elemanlarını reaktif güncellememesinden dolayı vue set ile reaktif olarak ekledik.
    if (payload.responseData.parentId == 0) {

      state.videoPageData.comments.find(x => x.id === payload.responseData.id).comment_likes = payload.responseData.comment_likes

    } else {

      Vue.set(state.videoPageData.comments.find(x => x.id === payload.responseData.parentId).replies.find(x => x.id === payload.responseData.id), 'comment_likes', payload.responseData.comment_likes);

    }

  },

  afterSendComment(state, payload) {

    if (payload.parentId == 0) {
      state.videoPageData.comments.unshift(payload)
    } else {

      if (state.videoPageData.comments.find(x => x.id == payload.parentId).replies) {

        state.videoPageData.comments.find(x => x.id == payload.parentId).replies.push(payload)

      } else {

        Vue.set(state.videoPageData.comments.find(x => x.id == payload.parentId), 'replies', [payload])
      }

    }


  },

  setVideoPageDatasToState(state, payload) {

    state.videoPageData.comments.push(...payload)



  },

  changeuserData(state, payload) {

    if (typeof payload === "boolean") {

      state.userData.isLogin = payload
      state.userData.user = {
        userEmail: "",
        userFullName: "",
        userName: "",
        user_id: null,
      }

    } else {

      /*const decodedToken = jwt.verify(payload, 'birleyici');
      state.userData.isLogin = true
      state.userData.user = decodedToken.data*/

    }



  },


  updateCollapseStatus(state, payload) {

    state.videoPageData.collapseStatus = payload

  },

  autoPlayStatusChange(state, payload) {

    if (payload == true) {

      Cookie.set("autoPlay", true)

    } else {

      Cookie.set("autoPlay", false)

    }

    state.videoPageData.autoPlayStatus = payload


  },


  deleteAllComments(state) {

    state.videoPageData.comments = []
  }

}

export const actions = {

  async getReplies(vuexContext, payload) {

    const mevcut = payload.mevcut
    const response = await this.$axios.$get(
      process.env.baseapi1 + "video/comments/replies?id=" +
      payload.id + '&mevcut=' + mevcut
    )
    vuexContext.commit("setReplies", response.results.results);

    return response.results.isNextData

  },

  async updateComment(vuexContext, payload) {

    const response = await this.$axios.$post(
      process.env.baseapi1 + "video/comments/update",
      {
        ...payload
      }
    )
    if (response.durum == "success") {

      vuexContext.commit("updateComment", { ...payload });

    }

  },

  async getVideoPageDatas(vuexContext, payload) {

    return false; 
    
    const comments = await axios.get(process.env.baseapi1 + "video/comments?id=" + payload)

    vuexContext.commit("setVideoPageDatasToState", comments.data.results)


    if (comments.data.results.length > 0) { return true } else { return false }

  },

  initAuthUser(vuexContext, req) {

    if (req) {
      if (req.headers.cookie) {

        if (req.headers.cookie.split(";").find(c => c.trim().startsWith("acsess_token="))) {

          const token = req.headers.cookie.split(";").find(c => c.trim().startsWith("acsess_token=")).split("=")[1]

          vuexContext.commit("changeuserData", token)

        }

      } else {

        vuexContext.commit("changeuserData", false)

      }

    }

  },

  initControls(vuexContext, req) {

    let autoPlay

    if (req) {

      if (req.headers.cookie) {
        if (req.headers.cookie.split(";").find(c => c.trim().startsWith("autoPlay="))) {
          let status = req.headers.cookie.split(";").find(c => c.trim().startsWith("autoPlay=")).split("=")[1] == "true" ? true : false
          vuexContext.commit("autoPlayStatusChange", status)
        }

      } else {

        vuexContext.commit("autoPlayStatusChange", false)

      }


    } else {

      autoPlay = Cookie.get("autoPlay")
      let status = autoPlay == "true" ? true : false
      if (autoPlay) {

        vuexContext.commit("autoPlayStatusChange", status)

      } else {

        vuexContext.commit("autoPlayStatusChange", status)

      }

    }


  },

  async likeAComment(vuexContext, obj) {

    try {
      const response = await this.$axios.$post(
        process.env.baseapi1 + "video/comment/like?type=userlike",
        {
          obj
        }
      );
      if (response.durum != "hata") {
        vuexContext.commit("setANewCommentLikes", response)
      }


    } catch (error) {

      console.log("sistemsel hata");

    }


  },

  async getVideosForHorizontalVidCard(vuexContext, url) {
    const pageNumber = url.split("&")[url.split("&").length - 1].split("=")[1] == 1

    let config = {
      headers: {
        Authorization: "bearer 65b33c797381dac21098a627af08ffe1",
        Accept:
          "application/vnd.vimeo.user+json;version=3.0,application/vnd.vimeo.video+json;version=3.4",
        "Content-Type": "application/json"
      }
    };

    const videos = await this.$axios.$get("https://api.vimeo.com/me/videos?" + url, config)

    if (pageNumber) {

      await vuexContext.commit("deleteHorizonData")

    }

    if (videos.data.length > 0) {


      await vuexContext.commit("setHorizonVidCardData", videos.data)


      return true

    } else {

      return false
    }

  }

}


export const getters = {
  videoPageData(state) {
    return state.videoPageData
  },
  horizonVidCardData(state) {
    return state.horizonVidCardData
  },

}