(window.webpackJsonp=window.webpackJsonp||[]).push([[4,8],{336:function(e,t,n){"use strict";(function(e){n(5),n(4),n(2),n(1),n(6),n(3),n(7);var r=n(0),o=n(22);n(70);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a={props:["isReply","commentItem"],data:function(){return{newComment:"",isCommentButton:!1,isCancelButton:!1}},methods:{cancelComment:function(){this.newComment="",this.$refs.commentArea.value="",this.isCommentButton=!1},changeCommentValue:function(e){this.newComment=e.target.value},submitComment:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={comment_comment:t.newComment,user_id:t.$store.state.userData.user.user_id,video_id:t.$route.params.videoId},t.isReply&&(r.parentId=0==t.commentItem.parentId?t.commentItem.id:t.commentItem.parentId,r.commentProps={repliedCommentFullName:t.commentItem.userFullName,isReplied:!1}),n.next=4,t.$axios.$post(e.env.baseapi1+"video/comments/add",c({},r));case 4:"success"==(o=n.sent).durum&&(t.newComment="",t.$refs.commentArea.value="",t.$store.commit("afterSendComment",c(c({},o.results3[0]),t.$store.state.userData.user)));case 6:case"end":return n.stop()}}),n)})))()}},watch:{newComment:function(){var element=this.$refs.commentArea;element.style.height="auto",element.style.height=element.scrollHeight+"px",0==this.newComment&&(element.style.height="50px")}}}}).call(this,n(104))},345:function(e,t,n){"use strict";(function(e){var r=n(22),o=(n(87),n(1),n(70),n(82)),m=n.n(o);t.a={props:["commentItem","replyComp"],name:"CommentItem",data:function(){return{isEditing:!1,readMore:!1,editedComment:null,isReply:!1,parentUser:null,isOpenReplies:!1,isNextData:!1}},methods:{banned:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!confirm("Üye engellensinmi ? üyeye dair tüm içerik silinecek.")){n.next=5;break}return n.next=3,t.$axios.$post(e.env.baseapi1+"user/delete",{id:t.commentItem.user_id});case 3:"success"==n.sent.durum?(m.a.remove("acsess_token"),t.$toast.success("Üye engellendi.",{duration:3e3})):t.$toast.success("Bir sorun oluştu.",{duration:3e3});case 5:case"end":return n.stop()}}),n)})))()},promise:function(e,t){return this.$store.dispatch(e,t).then((function(e){return e})).then((function(e){return e}))},cancelEditing:function(){this.$refs.commentArea.innerHTML=this.commentItem.comment_comment,this.isCommentButton=!1,this.isEditing=!1},getReplies:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.commentItem.replies?e.commentItem.replies.length:0,t.next=3,e.promise("getReplies",{id:e.commentItem.id,mevcut:n});case 3:r=t.sent,e.isNextData=r,e.isOpenReplies=!0;case 6:case"end":return t.stop()}}),t)})))()},hideReplies:function(){this.$store.commit("hideReplies",this.commentItem.id),this.isOpenReplies=!1},newComment:function(e){this.editedComment=e.target.innerHTML},updateComment:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("updateComment",{id:e.commentItem.id,user_id:e.commentItem.user_id,comment_comment:e.editedComment,parentId:e.commentItem.parentId}).then((function(t){e.$toast.success("Yorum güncellendi.",{duration:3e3})})).catch((function(t){e.$toast.error("Bir hata oluştu.",{duration:3e3})}));case 2:e.cancelEditing();case 3:case"end":return t.stop()}}),t)})))()},deleteComment:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$axios.$post(e.env.baseapi1+"video/comments/delete",{id:t.commentItem.id,user_id:t.commentItem.user_id,parentId:t.commentItem.parentId});case 2:if("success"!=n.sent.durum){n.next=7;break}return n.next=6,t.$store.commit("deleteComment",{id:t.commentItem.id,parentId:t.commentItem.parentId});case 6:t.$toast.success("Yorum silindi.",{duration:3e3});case 7:case"end":return n.stop()}}),n)})))()},configLikes:function(e,t){var n=this;return"userLikes"==t?JSON.parse(e).userLikes:"isLiked"==t?null!=JSON.parse(e).userIds.find((function(e){return e===n.$store.state.userData.user.user_id})):void 0},likeAComment:function(e){this.$store.dispatch("likeAComment",e)}}}}).call(this,n(104))},352:function(e,t,n){var content=n(361);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(58).default)("06195dfa",content,!0,{sourceMap:!1})},354:function(e,t,n){"use strict";n.r(t);var r=n(336).a,o=n(48),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"d-flex bd-highlight mb-3 mt-3"},[n("div",{staticClass:"bd-highlight"},[n("div",{staticClass:"defaultProfileDiv"},[n("big",[n("b",{staticClass:"text-siyah"},[e._v(e._s(e.$store.state.userData.user.userFullName.charAt(0)))])])],1)]),e._v(" "),n("div",{staticClass:"ml-3 flex-fill bd-highlight"},[n("textarea",{ref:"commentArea",staticClass:"form-control bg-transparent textAreaDotNone videoCommentTextarea p-0",staticStyle:{min:"height 50px"},attrs:{placeholder:"Herkese açık bir yorum ekle..."},on:{input:e.changeCommentValue}}),e._v(" "),n("transition-group",{attrs:{name:"home",mode:"out-in"}},[e.newComment.length>0?n("b-button",{key:"1",staticClass:"mt-2 bg-kirmizi ml-2 float-right",attrs:{size:"sm",disabled:e.newComment.length<3},on:{click:e.submitComment}},[e._v("Yorum ekle")]):e._e(),e._v(" "),0!=this.newComment.length?n("b-button",{key:"2",staticClass:"mt-2 btn-white float-right",attrs:{size:"sm"},on:{click:e.cancelComment}},[e._v("İptal")]):e._e()],1)],1)])])}),[],!1,null,null,null);t.default=component.exports},356:function(e,t,n){"use strict";n.r(t);var r=n(345).a,o=(n(360),n(48)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return 0==e.commentItem.parentId||e.replyComp?r("div",[r("div",{staticClass:"media mt-3"},[r("div",{staticClass:"bd-highlight mr-3"},[r("div",{staticClass:"defaultProfileDiv"},[r("big",[r("b",{staticClass:"text-siyah"},[e._v(e._s(e.commentItem.userFullName.charAt(0)))])])],1)]),e._v(" "),r("div",{staticClass:"media-body"},[r("div",{staticClass:"d-flex justify-content-between"},[r("big",{staticClass:"mt-0",staticStyle:{"font-size":"17px !important"}},[e._v("\n          "+e._s(e.commentItem.userFullName)+"\n          "),r("small",{staticClass:"text-muted ml-2"},[e._v(e._s(e.$timeEgo(Date.parse(e.commentItem.comment_date))))])]),e._v(" "),null!=e.$store.state.userData.user.user_id?r("b-dropdown",{attrs:{right:"",size:"lg",variant:"link","no-caret":"","toggle-class":"m-0 p-0"},scopedSlots:e._u([{key:"button-content",fn:function(){return[r("i",{staticClass:"text-decoration-none fa fa-ellipsis-v m-0 text-gri"}),e._v(" "),r("span",{staticClass:"sr-only"},[e._v("Search")])]},proxy:!0}],null,!1,3361441876)},[e._v(" "),1==e.$store.state.userData.user.userType||e.commentItem.user_id==e.$store.state.userData.user.user_id?[e.commentItem.user_id==e.$store.state.userData.user.user_id?r("b-dropdown-item",{attrs:{href:"#"},on:{click:function(t){e.isEditing=!0}}},[e._v("Düzenle")]):e._e(),e._v(" "),r("b-dropdown-item",{attrs:{href:"#"},on:{click:e.deleteComment}},[e._v("Sil")])]:e._e(),e._v(" "),1!=e.$store.state.userData.user.userType&&e.commentItem.user_id!=e.$store.state.userData.user.user_id?r("b-dropdown-item",[e._v("Şikayet et")]):e._e(),e._v(" "),1==e.$store.state.userData.user.userType?r("b-dropdown-item",{on:{click:e.banned}},[e._v("Üyeyi Engelle")]):e._e()],2):e._e()],1),e._v(" "),r("div",{staticClass:"commentParagItem"},[r("div",{staticClass:"accordion",attrs:{id:"faq"}},[r("small",{domProps:{innerHTML:e._s(e.replyComp?"<span class=text-mavi>@"+JSON.parse(e.commentItem.commentProps).repliedCommentFullName+"</span>  ":"")}}),e._v(" "),r("div",{ref:"commentArea",class:{activeEditing:e.isEditing,"font-size-15 font-source-sans-pro commentDiv mt-2":!0},style:e.readMore?"max-height:none !important":"",attrs:{contenteditable:e.isEditing},domProps:{innerHTML:e._s(e.commentItem.comment_comment)},on:{input:e.newComment}}),e._v(" "),e.isEditing?r("div",[r("b-button",{key:"1",staticClass:"mt-2 bg-kirmizi ml-2 float-right",attrs:{size:"sm"},on:{click:e.updateComment}},[e._v("Kaydet")]),e._v(" "),r("b-button",{key:"2",staticClass:"mt-2 btn-white float-right",attrs:{size:"sm"},on:{click:e.cancelEditing}},[e._v("İptal")])],1):e._e(),e._v(" "),r("i",[e.commentItem.comment_comment.split(/\r\n|\r|\n/).length>7&&0==e.isEditing?r("p",{staticStyle:{cursor:"pointer"},domProps:{textContent:e._s(e.readMore?"devamını gizle":"devamını oku")},on:{click:function(t){e.readMore=!e.readMore}}}):e._e()])])]),e._v(" "),r("div",{staticClass:"mt-2",staticStyle:{"line-height":"20px"}},[r("div",{staticClass:"row m-0"},[r("big",[r("i",{class:{"fa fa-thumbs-up text-gri":!0,"text-mavi":e.configLikes(e.commentItem.comment_likes,"isLiked")},staticStyle:{cursor:"pointer"},attrs:{"aria-hidden":"true"},on:{click:function(t){return e.likeAComment({id:e.commentItem.id,user_id:e.$store.state.userData.user.user_id})}}}),e._v("  ")]),e._v(" "),r("span",{staticClass:"text-muted"},[r("small",{domProps:{innerHTML:e._s(e.configLikes(e.commentItem.comment_likes,"userLikes"))}})]),e._v("    \n\n          "),r("div",[1==JSON.parse(e.commentItem.comment_likes).adminLike||1==e.$store.state.userData.user.userType?r("i",{staticClass:"fa fa-heart text-gri",class:{"text-kirmizi":1==JSON.parse(e.commentItem.comment_likes).adminLike},staticStyle:{cursor:"pointer"},attrs:{"aria-hidden":"true"},on:{click:function(t){1==e.$store.state.userData.user.userType&&e.likeAComment({id:e.commentItem.id,user_id:e.$store.state.userData.user.user_id,type:"likeAdmin"})}}}):e._e(),e._v(" "),1==JSON.parse(e.commentItem.comment_likes).adminLike?r("img",{staticStyle:{"border-radius":"50%"},attrs:{src:n(359),width:"20"}}):e._e()]),e._v(" "),null!=e.$store.state.userData.user.user_id?r("span",{staticClass:"text-muted ml-2 c-p",on:{click:function(t){e.isReply=!e.isReply}}},[e._v(" Yanıtla")]):e._e()],1),e._v(" "),null!=e.$store.state.userData.user.user_id&&1==e.isReply?r("InsertComment",{attrs:{commentItem:e.commentItem,isReply:e.isReply}}):e._e(),e._v(" "),1!=JSON.parse(e.commentItem.commentProps).isReplied||e.replyComp?e._e():r("p",{staticClass:"mt-2 text-mavi c-p",domProps:{textContent:e._s(e.isOpenReplies?"Yanıtları gizle":"Yanıtları gör")},on:{click:function(t){e.isOpenReplies?e.hideReplies():e.getReplies()}}}),e._v(" "),e._l(e.commentItem.replies,(function(e){return r("CommentItem",{key:e.id,attrs:{commentItem:e,replyComp:!0}})})),e._v(" "),e.isNextData&&e.isOpenReplies?r("p",{staticClass:"text-mavi mt-3 c-p",on:{click:e.getReplies}},[e._v("\n          Daha fazla yanıt gör\n        ")]):e._e()],2)])])]):e._e()}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InsertComment:n(354).default,CommentItem:n(356).default})},359:function(e,t,n){e.exports=n.p+"img/illiyyunProfileLogo.d15f6a9.png"},360:function(e,t,n){"use strict";n(352)},361:function(e,t,n){var r=n(57)(!1);r.push([e.i,".activeEditing{max-height:none!important;padding:10px;background-color:#202020}.commentDiv{white-space:pre-wrap;max-height:160px;overflow:hidden;width:100%}",""]),e.exports=r}}]);