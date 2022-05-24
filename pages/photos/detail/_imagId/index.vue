<template>
  <div>
    <!-- Modal -->
    <br /><br /><br /><br /><br />
   <div class="container">
       
      <!-- <i class="fa fa-chevron-left btn p-0" > Önceki</i>
      <span style="right:10px; position:absolute">Sonraki <i class="fa fa-chevron-right btn p-0 "  ></i></span> -->
      <div class="modal-content bg-transparent">
        <div class="row m-0" style="background-color: #111111;">
          <div class="col-xl-6 p-1" id="imageContent">
            <img
              src="@/assets/media/images/site/gallerySample.jpg"
              style="width: 100%; "
            />
          </div>
          <div class="col-xl-6 p-3" id="commentContent">
            <div class="scrollbar scrollbarStyle">
              <div class="commentItem">
                <b>illiyyuntv</b> Kendini korumak; emirleri yerine getirip
                yasaklardan kaçınmakla olur; aileyi korumak da onlara sevabı
                emredip günahtan men etmekle olur. <br />
                <p>
                  Ali radıyallahu anh şöyle demiştir: Onlara öğretin ve terbiye
                  edin (eğitin)
                </p>
                <p>(Zadü'l Mesir Fi İlmi't Tefsir)</p>
                <p class="text-muted">1h</p>
              </div>
              <div class="commentItem mt-2">
                <div class="row">
                  <div class="col-10">
                    <b>TareqMohammad</b> La ilâhe illallah
                  </div>
                  <div class="col-2 p-1">
                    <i class="fa fa-heart text-danger" aria-hidden="true"></i>
                    <i
                      class="fa fa-ellipsis-v  btn text-gri"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></i>
                    <div class="dropdown " style="position: static!important">
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a class="dropdown-item" href="#">Düzenle</a>
                        <a class="dropdown-item" href="#">Sil</a>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-muted">1h &nbsp;&nbsp;&nbsp;&nbsp;Yanıtla</p>
              </div>
              <div class="commentItem mt-2">
                <div class="row">
                  <div class="col-10">
                    <b>TareqMohammad</b> La ilâhe illallah
                  </div>
                  <div class="col-2 p-1">
                    <i class="fa fa-heart text-danger" aria-hidden="true"></i>
                    <i
                      class="fa fa-ellipsis-v  btn text-gri"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></i>
                    <div class="dropdown " style="position: static!important">
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a class="dropdown-item" href="#">Düzenle</a>
                        <a class="dropdown-item" href="#">Sil</a>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-muted">1h &nbsp;&nbsp;&nbsp;&nbsp;Yanıtla</p>
              </div>
            </div>
            <div style="border-top: solid 3px #261d1e; width: 100%"></div>
            <div class="commentContent mt-3" style="line-height: 25px">
              <div class="d-flex justify-content-between">
                <div style="color:  #a6a6a6; ">
                  <span>599 Beğeni</span>
                  <div style="font-size: 27px">
                    <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    <i class="fa fa-paper-plane p-1" aria-hidden="true"></i>
                    <i class="fa fa-comment-o p-1" aria-hidden="true"></i>
                  </div>
                  <p>10 Ağustos</p>
                </div>
                <div class="text-center" style="color:  #a6a6a6; ">
                  <span>999</span>
                  <div
                    class="text-center"
                    style="border:solid 3px #261d1e; border-radius: 5px; font-size: 20px"
                  >
                    <i class="fa fa-arrow-down m-2"></i>
                  </div>
                  <p>İndir</p>
                </div>
              </div>
              <div style="position: relative;">
                <input
                autocomplete="false"
                  type="text"
                  class="form-control"
                  name=""
                  value="@TareqMohammad "
                  id="commentTextArea"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
    
  </div>
</template>
