
export default (context, inject) => {

  const timeCreate = (date) => {
    var aylar = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık"
    ];

    var tarih = new Date(date);


    return tarih.getDate() +
      " " +
      aylar[tarih.getMonth()] +
      " " +
      tarih.getFullYear()


  }


  const videoTime = (duration) => {
    const second = duration % 60;
    const zero = second.toString().length == 1 ? "0" : "";
    return (
      Math.floor((duration % 3600) / 60) +
      ":" +
      zero +
      (duration % 60)
    );
  }

  const stripHTML = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const timeEgo = (val) => {
    var periods = {
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000
    };

    var diff = Date.now() - val;
    if (diff > periods.month) {
      // it was at least a month ago
      return Math.floor(diff / periods.month) + " ay önce";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + "h önce";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + " gün önce";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + "s önce";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + " dk önce";
    }
    return "şimdi";
  }



  inject('timeEgo', timeEgo)
  inject('stripHTML', stripHTML)
  inject('timeCreate', timeCreate)
  inject('videoTime', videoTime)


}