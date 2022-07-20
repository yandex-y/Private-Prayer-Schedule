//VARIABEL
//Element HTML
const getTimeHtml = document.querySelectorAll('.container div :nth-child(2)');
const getTrHtml = document.querySelectorAll('.container > div');
const labelTanggal = document.getElementById('tgl');
const display = document.querySelector('.display');
const kota = document.getElementById('h1kota');
const container_select_city = document.querySelector('.select-city-container');
const select_city = document.getElementById('select-city')
const search_city = document.getElementById('search-city')


//Data
const dataLocIDFetch = fetch(`https://api.myquran.com/v1/sholat/kota/semua`);
const data = function() {
    //https://api.myquran.com/v1/sholat/jadwal/1301/2022/7/5
    const idDefault = 1301;
    const idFromLS = localStorage.getItem('city');
    let idInput;

    idFromLS === null ? idInput = idDefault: idInput = idFromLS;

    return fetch(`https://api.myquran.com/v1/sholat/jadwal/${idInput}/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)
}


//RUN FUNCTION & Event

upDataTLS()
kota.addEventListener('click', () => {
    container_select_city.style.display = 'block'
    innerHTMLLocID()
})
search_city.addEventListener('input', (e) => {
    innerHTMLLocID(true)
})

//FUNCTION
function upDataTLS() {

    data().then(x => x.json()).then(y => {
        const root = y.data.jadwal;
        const dataOfArray = [y.data.lokasi, root.tanggal, root.imsak, root.subuh, root.terbit, root.dzuhur, root.ashar, root.maghrib, root.isya, y.data.id, root.date];
        updateJadwal(dataOfArray)
        innerHTML()
        updateLocID()
    })

    if (localStorage.getItem('prayer') == null) {
        const dataOfArray = ['-',
            '-, -/-/-',
            '-:-',
            '-:-',
            '-:-',
            '-:-',
            '-:-',
            '-:-',
            '-:-',
            '-',
            '-'];
        updateJadwal(dataOfArray)
    }
    innerHTML()
    updateLocID()
}

function updateJadwal(x) {
    localStorage.setItem('prayer', `
        {
        "id": "${x[9]}",
        "lokasi": "${x[0]}",
        "jadwal": {
        "tanggal": "${x[1]}",
        "imsak": "${x[2]}",
        "subuh": "${x[3]}",
        "terbit": "${x[4]}",
        "dzuhur": "${x[5]}",
        "ashar": "${x[6]}",
        "maghrib": "${x[7]}",
        "isya": "${x[8]}",
        "date": "${x[10]}"
        }
        }`);
}

function innerHTML() {
    //VARIABEL
    const root = getDataFromLS().jadwal
    const dateLS = new Date(root.date);
    const makeDateNow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 7);
    const waktuSholat = [root.imsak,
        root.subuh,
        root.terbit,
        root.dzuhur,
        root.ashar,
        root.maghrib,
        root.isya];
    let num = 0;

    //INNER HTML
    waktuSholat.forEach(x => {
        getTimeHtml[num].innerHTML = x
        num++
    })
    labelTanggal.innerHTML = root.tanggal;
    kota.innerHTML = getDataFromLS().lokasi

    if (makeDateNow.getTime() == dateLS.getTime()) {
        labelTanggal.style.color = '#9BFF34'
    }

    //RUN FUNCTION
    itemActive(waktuSholat)
    setInterval(itemActive, 14400)
}

function updateLocID() {
    const data = JSON.parse(localStorage.getItem('locId'));

    if (data === null) {
        dataLocIDFetch.then(x => x.json()).then(y => {
            //variabel arr id & lokasi kosong
            const idLocArr = [[], []];

            const idLocStr = ["id", "lokasi"];

            idLocArr.forEach((x, i) => {
                push(y, idLocArr[i], idLocStr[i])
            })

            function push(x, il, str) {
                x.forEach(y => {
                    il.push(y[str])
                })
            }

            localStorage.setItem('locId', `{"id": ${JSON.stringify(idLocArr[0])},"locName": ${JSON.stringify(idLocArr[1])}}`)
            window.location.reload()
        })
    }
    innerHTMLLocID()
}

function itemActive(y) {
    const x = JSON.parse(localStorage.getItem('prayer')).jadwal;
    const jadwalStr = ['imsak',
        'subuh',
        'terbit',
        'dzuhur',
        'ashar',
        'maghrib',
        'isya'];
    const createDateNow = new Date(1, 1, 1, new Date().getHours(), new Date().getMinutes()).getTime();

    //Variabel Jam, Menit
    const data = [];
    //Mengisi Variabel
    jadwalStr.forEach((o, i) => {
        data.push([parseInt(x[jadwalStr[i]].substring(0, 2)), parseInt(x[jadwalStr[i]].substring(3, 5))])
    })
    //Variabel getTime
    const getTime = [];
    //Mengisi Variabel
    data.forEach((o, i) => {
        getTime.push(new Date(1, 1, 1, data[i][0], data[i][1]).getTime())
    })
    let active;
    let last;
    let index;

    if (getTime[0] >= createDateNow) {
        transparent(0, jadwalStr);
        active = getTime[0];
        index = 0;
    } else if (getTime[1] >= createDateNow) {
        transparent(1, jadwalStr);
        active = getTime[1];
        index = 1;
    } else if (getTime[2] >= createDateNow) {
        transparent(2, jadwalStr);
        active = getTime[2];
        index = 2;
    } else if (getTime[3] >= createDateNow) {
        transparent(3, jadwalStr);
        active = getTime[3];
        index = 3;
    } else if (getTime[4] >= createDateNow) {
        transparent(4, jadwalStr);
        active = getTime[4];
        index = 4;
    } else if (getTime[5] >= createDateNow) {
        transparent(5, jadwalStr);
        active = getTime[5];
        index = 5;
    } else if (getTime[6] >= createDateNow) {
        transparent(6, jadwalStr);
        active = getTime[6];
        index = 6;
    } else {
        last = true;
        transparent(6, jadwalStr);
        active = getTime[6];
    }

    resultDisp(active, createDateNow, last, jadwalStr, index);
}

function innerHTMLLocID(search) {

    const data1 = JSON.parse(localStorage.getItem('prayer')).id;
    const data2 = JSON.parse(localStorage.getItem('locId'));
    const rootId = data2.id;
    const rootLocName = data2.locName;
    let name;
    let id;

    if (search) {
        name = [];
        id = []
        rootLocName.forEach((x, i) => {

            if (x.toLowerCase().includes(search_city.value.toLowerCase())) {
                name.push(x)
                id.push(rootId[i])
            }
        })
    } else {
        name = rootLocName;
        id = rootId
    }

    select_city.innerHTML = ''

    if (name.length == 0){
            const p = document.createElement('p');
            p.innerText = 'Tidak Ada Hasil'
            select_city.appendChild(p)
    } else {
        name.forEach((x, i) => {
            let text = document.createTextNode(name[i]);
            let tag = document.createElement('p');

            tag.value = id[i];
            
            tag.appendChild(text);

            tag.addEventListener('click', (e) => {

                localStorage.setItem('city', `${e.target.value}`);
                container_select_city.style.display = 'none'
                search_city.value = ''
                upDataTLS()
            })
            select_city.appendChild(tag)
            i++
        })

    }


}

function transparent(i, data) {
    const dataArr = data;
    const index = i;

    dataArr.forEach((e, i) => {

        if (index === i) {
            getTrHtml[i].style.background = '#9BFF34';
        } else {
            getTrHtml[i].style.background = 'transparent';
        }
    })
}

function resultDisp(active, createDateNow, last, data, index) {

    let jarak;

    if (last) {
        jarak = (createDateNow - active) / 1000 / 60; //dalam menit;
        display.innerHTML = `${data[data.length-1].toUpperCase()} ${convertToHours(jarak)} Yang Lalu`;
    } else if (active == createDateNow) {
        display.innerHTML = `Sekarang Waktu ${data[index].toUpperCase()}`
    } else {
        jarak = (active - createDateNow) / 1000 / 60; //dalam menit;
        display.innerHTML = `${convertToHours(jarak)} Lagi Menuju ${data[index].toUpperCase()}`
    }
}

function convertToHours(jarak) {
    const jam = Math.floor(jarak/60);
    const menit = Math.floor(((jarak / 60) - jam) * 60);

    return `${jam != 0 ? jam + ' Jam': ''} ${menit != 0 ? menit + ' Menit': ''}`
}

function getDataFromLS() {
    return JSON.parse(localStorage.getItem('prayer'))
}