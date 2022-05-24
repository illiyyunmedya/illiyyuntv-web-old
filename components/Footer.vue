<template>
  <div>
    <footer class="mt-5 p-4 bg-gri">
      <div class="container-fluid">
        <div class="row">
          <div id="footerLinks" class="mt-3 mb-3 col-md-3 text-center">
            <ul>
              <li><nuxt-link to="/">Ana Sayfa</nuxt-link></li>
              <li><nuxt-link to="/videos/all">Videolar</nuxt-link></li>
              <li><nuxt-link to="/photos">Resimler</nuxt-link></li>
              <li><nuxt-link to="/blog">Blog</nuxt-link></li>
            </ul>
          </div>
          <div class="col-1" style="border-left: solid 1px #626262;"></div>
          <div class="mt-3 mb-3 col-md-4" id="footerContact">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ad Soyad"
                />
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="E-Posta" />
              </div>
            </div>
            <div class="input-group mt-2">
              <textarea class="form-control" placeholder="Mesajınız"></textarea>
              <div class="input-group-append">
                <button class="btn bg-danger text-white" type="button">
                  <B
                    ><i
                      style="font-size: 30px"
                      class="fa fa-paper-plane"
                      aria-hidden="true"
                    ></i
                  ></B>
                </button>
              </div>
            </div>
          </div>
          <div class="col-1" style="border-right: solid 1px #626262;"></div>
          <div class="mt-3 mb-3 col-md-3 text-center">
            <div id="footerSocial">
              <h5 style="font-family: Montserrat; font-weight: 200; ">
                Bizi Takip Edin
              </h5>
              <!-- <img src="media/images/site/logo.png" width="100">  -->
              <div class="mt-2" style="font-size: 18px">
                 <a class="text-white" href="https://www.facebook.com/illiyyuntv/" target="blank"> <i class="fa fa-facebook"></i> </a>
                 <a class="text-white" href="https://www.youtube.com/channel/UCIQAjqeM5zwfRLKeTJTQwBg" target="blank"> <i class="fa fa-youtube"></i> </a>
                 <a class="text-white" href="https://www.instagram.com/illiyyuntv" target="blank"> <i class="fa fa-instagram"></i> </a>


              </div>
              <div>
                <a href="https://illiyyuntv.com/illiyyuntv-android.apk" >
                <img
                  src="@/assets/media/images/site/googleplay.png"
                  width="140"
                  class="m-1"
                /> </a>
              </div>
              <div>
                <img
                  src="@/assets/media/images/site/appstore.png"
                  width="140"
                  class="m-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="container-fluid">
      <p class="text-muted mt-2" style="text-align: justify; line-height: 18px">
        <small class="text-white"
          ><i
            >Web sitemizde ki (görüntü, yazı, video) içerikler, kâr amacıyla dağıtılamaz, kurum yada kuruluşlarca kullanılamaz, kişisel sosyal medya hesaplarında (kaynak belirtme şartı olmaksızın) paylaşılabilir. Videoların; Youtube vb video paylaşım sitelerinde (telif sebebiyle) paylaşılmasına izin verilmez. İlliyyûn İlimYaymaHareketi / İlliyyûnTV, herhangi bir grup, cemaat ya da siyasi görüşe tabi değildir, çalışmalar gönüllülük esası gerçekleşmekte ve bağış kabul edilmemektedir. Yorumlarda kullandığınız e-mail adresleri paylaşılmaz ve yayınlanmaz. Kullanıcı isim, soyisim, yorum ve değerlendirmeleri kişinin kendisi belirlemiş olup bunlardan dolayı bir sorumluluk kabul edilmez. Hakaret, küfür, tehdit edici, ahlak dışı, ırkçı ibarelerle yorum yapan üyelerin hesapları uyarı yapılmadan iptal edilir. Sitemizde herhangi bir kurum ve kuruluşların reklamları bulunmamaktadır. Copyright 2022 - Tüm hakları saklıdır. “Bütün işlerin sonu Allah’a döner.” (Lokman Sûresi 22)</i
          ></small
        >
      </p>
    </div>
  </div>
</template>
