//VARIABEL
let getTimeHtml = document.querySelectorAll('.container div :nth-child(2)'),
    getTrHtml = document.querySelectorAll('.container > div'),
    database,
    labelTanggal = document.querySelector('h1 > label'),
    display = document.querySelector('.display'),
    data = fetch(`https://api.myquran.com/v1/sholat/jadwal/1619/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`);
    //https://api.myquran.com/v1/sholat/jadwal/1619/2022/1/1
    
//RUN FUNCTION
cekLocalStorage();
gagal()
onlineUpdate()


//FUNCTION 
function cekLocalStorage(){
    if(localStorage.getItem('prayer') === null){
        localStorage.setItem('prayer',`{"tanggal":"null, 00/00/0000","imsak":"00:00","subuh":"00:00","terbit":"00:00","dzuhur":"00:00","ashar":"00:00","maghrib":"00:00","isya":"00:00"}`);
    }
}

function gagal(){
    const x = JSON.parse(localStorage.getItem('prayer'));
    
    labelTanggal.innerHTML = x.tanggal
    
    getTimeHtml[0].innerHTML = x.imsak
    getTimeHtml[1].innerHTML = x.subuh
    getTimeHtml[2].innerHTML = x.terbit
    getTimeHtml[3].innerHTML = x.dzuhur
    getTimeHtml[4].innerHTML = x.ashar
    getTimeHtml[5].innerHTML = x.maghrib
    getTimeHtml[6].innerHTML = x.isya
    
    itemActive(x)
    setInterval(() => itemActive(x),60000)
    
    cekUpdate(x)
}

function cekUpdate(x){
    const tanggalJSON = new Date(x.date),
          tanggalNow = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);

    if(tanggalJSON.getFullYear() == tanggalNow.getFullYear() && tanggalJSON.getMonth() == tanggalNow.getMonth() && tanggalJSON.getDate() == tanggalNow.getDate()){
        labelTanggal.style.color = '#9BFF34'
    }
}

function onlineUpdate(){
    data
.then(data => data.json())
.then(data => {
    const x = data.data.jadwal;
    labelTanggal.innerHTML = x.tanggal
    
    getTimeHtml[0].innerHTML = x.imsak
    getTimeHtml[1].innerHTML = x.subuh
    getTimeHtml[2].innerHTML = x.terbit
    getTimeHtml[3].innerHTML = x.dzuhur
    getTimeHtml[4].innerHTML = x.ashar
    getTimeHtml[5].innerHTML = x.maghrib
    getTimeHtml[6].innerHTML = x.isya
    
    itemActive(x)
    setInterval(() => itemActive(x),60000)
    cekUpdate(x)
    
    const jadwal = {
    tanggal: x.tanggal,
    imsak: x.imsak,
    subuh: x.subuh,
    terbit: x.terbit,
    dzuhur: x.dzuhur,
    ashar: x.ashar,
    maghrib: x.maghrib,
    isya: x.isya,
    date: x.date
    }
    
    localStorage.setItem('prayer',JSON.stringify(jadwal))
})
}


function itemActive(x){
    const jamImsak = parseInt(x.imsak.substring(0,2)),
          menitImsak = parseInt(x.imsak.substring(3,5)),
          createImsak = new Date(1, 1, 1, jamImsak, menitImsak).getTime(),
          jamSubuh = parseInt(x.subuh.substring(0,2)),
          menitSubuh = parseInt(x.subuh.substring(3,5)),
          createSubuh = new Date(1, 1, 1, jamSubuh, menitSubuh).getTime(),
          jamTerbit = parseInt(x.terbit.substring(0,2)),
          menitTerbit = parseInt(x.terbit.substring(3,5)),
          createTerbit = new Date(1, 1, 1, jamTerbit, menitTerbit).getTime(),
          jamDzuhur = parseInt(x.dzuhur.substring(0,2)),
          menitDzuhur = parseInt(x.dzuhur.substring(3,5)),
          createDzuhur = new Date(1, 1, 1, jamDzuhur, menitDzuhur).getTime(),
          jamAshar = parseInt(x.ashar.substring(0,2)),
          menitAshar = parseInt(x.ashar.substring(3,5)),
          createAshar = new Date(1, 1, 1, jamAshar, menitAshar).getTime(),
          jamMaghrib = parseInt(x.maghrib.substring(0,2)),
          menitMaghrib = parseInt(x.maghrib.substring(3,5)),
          createMaghrib = new Date(1, 1, 1, jamMaghrib, menitMaghrib).getTime(),
          jamIsya = parseInt(x.isya.substring(0,2)),
          menitIsya = parseInt(x.isya.substring(3,5)),
          createIsya = new Date(1, 1, 1, jamIsya, menitIsya).getTime(),
          createDateNow = new Date(1, 1, 1, new Date().getHours(), new Date().getMinutes()).getTime()
          
          let active, next;
          if(createImsak >= createDateNow){
            transparent()
              getTrHtml[0].style.background = '#9BFF34';
              active = createImsak;
              next = 'Imsak';
          }else if(createSubuh >= createDateNow){
            transparent()
              getTrHtml[1].style.background = '#9BFF34';
              active = createSubuh;
              next = 'Subuh';
          }else if(createTerbit >= createDateNow){
            transparent()
              getTrHtml[2].style.background = '#9BFF34'
              active = createTerbit;
              next = 'Terbit';
          }else if(createDzuhur >= createDateNow){
            transparent()
              getTrHtml[3].style.background = '#9BFF34'
              active = createDzuhur;
              next = 'Dzuhur';
          }else if(createAshar >= createDateNow){
            transparent()
              getTrHtml[4].style.background = '#9BFF34';
              active = createAshar;
              next = 'Ashar';
          }else if(createMaghrib >= createDateNow){
            transparent()
              getTrHtml[5].style.background = '#9BFF34'
              active = createMaghrib;
              next = 'Maghrib';
          }else if(createIsya >= createDateNow){
            transparent()
              getTrHtml[6].style.background = '#9BFF34'
              active = createIsya;
              next = 'Isya';
          }else{
            transparent();
            getTrHtml[6].style.background = '#9BFF34'
            active = createIsya;
              next = 'last';
          }

          lookDisplay(active,createDateNow,next)
}

function lookDisplay(active,createDateNow,next){
  let jarak;

  if(next === 'last'){
    jarak = jarak = (createDateNow - active) / 1000 / 60;//dalam menit;
    display.innerHTML = `Isya ${convertToHours(jarak)} Yang Lalu`
    }else{
      jarak = (active - createDateNow) / 1000 / 60;//dalam menit;
      display.innerHTML = `${convertToHours(jarak)} Lagi Menuju ${next}`
    }
}

function transparent(){
    getTrHtml[0].style.background = 'transparent';
    getTrHtml[1].style.background = 'transparent'
    getTrHtml[2].style.background = 'transparent'
    getTrHtml[3].style.background = 'transparent'
    getTrHtml[4].style.background = 'transparent'
    getTrHtml[5].style.background = 'transparent'
    getTrHtml[6].style.background = 'transparent'
}

function convertToHours(jarak){
  if(jarak >= 60){
    const jam = Math.floor(jarak/60);
    const menit = Math.floor(((jarak / 60 ) - jam) * 60);

    if(menit == 0){
      jarak = `${jam} Jam`;
    }else{
      jarak = `${jam} Jam ${menit} Menit`;
    }
    
  }else{
    jarak = `${jarak} Menit`
  }
  return jarak
}