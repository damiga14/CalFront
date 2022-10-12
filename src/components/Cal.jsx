/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { IonText, IonIcon, IonButton, IonPopover, useIonViewWillEnter, IonPage, IonContent } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import axios from 'axios'
import add from 'date-fns/add'
import sub from 'date-fns/sub'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import tzlookup from 'tz-lookup'
import './Cal.css'
import logo from '../assets/logo.png'
import Popup from './Popup';
import Levana from '../components/Levana'
import { Geolocation } from '@ionic-native/geolocation'
import { createGesture, Gesture } from '@ionic/react';
import { Network } from '@capacitor/network';
import { getTimezone } from 'countries-and-timezones'
import { Device } from '@capacitor/device';

let lat = '19.4349023'
let long = '-99.2069489'

let yomTob = []
yomTob['Pesaj 1'] = true
yomTob['Pesaj 2'] = true
yomTob['Pesaj 7'] = true
yomTob['Pesaj 8'] = true
yomTob['Shavuot I'] = true
yomTob['Shavuot II'] = true
yomTob['Rosh Hashana'] = true
yomTob['Rosh Hashana II'] = true
yomTob['Yom Kippur'] = true
yomTob['Sukot 1'] = true
yomTob['Sukot 2'] = true
yomTob['Shmini Atzeret'] = true
yomTob['Simját Torá'] = true
// yomTob["Ta'anit Bejorot<br>Erev Pesaj"] = true
// yomTob['Erev Yom Kippur'] = true
// yomTob['Erev Sukot'] = true
// yomTob['Erev Rosh Hashana'] = true
// yomTob['Erev Shavuot'] = true

let pesaj = []
pesaj["Pésaj I"] = 'Pesaj 1'
pesaj["Pésaj II"] = 'Pesaj 2'
pesaj["Pésaj III (J''M)"] = 'Pesaj 3'
pesaj["Pésaj IV (J''M)"] = 'Pesaj 4'
pesaj["Pésaj V (J''M)"] = 'Pesaj 5'
pesaj["Pésaj VI (J''M)"] = 'Pesaj 6'
pesaj["Pésaj VII"] = 'Pesaj 7'
pesaj["Pésaj VIII"] = 'Pesaj 8'

let januka = []
januka["Janucá: 1 vela"] = 'Januka'
januka["Janucá: 2 velas"] = 'Januka 1'
januka["Janucá: 3 velas"] = 'Januka 2'
januka["Janucá: 4 velas"] = 'Januka 3'
januka["Janucá: 5 velas"] = 'Januka 4'
januka["Janucá: 6 velas"] = 'Januka 5'
januka["Janucá: 7 velas"] = 'Januka 6'
januka["Janucá: 8 velas"] = 'Januka 7'
januka["Janucá: 8º día"] = 'Januka 8'

let sukot = []
sukot["Sukot I"] = 'Sukot 1'
sukot["Sukot II"] = 'Sukot 2'
sukot["Sukot III (J''M)"] = 'Sukot 3'
sukot["Sukot IV (J''M)"] = 'Sukot 4'
sukot["Sukot V (J''M)"] = 'Sukot 5'
sukot["Sukot VI (J''M)"] = 'Sukot 6'
sukot["Sukot VII (Hoshana Raba)"] = 'Hoshana Raba'

let meses = []
meses["Tishrei"] = 'Tishre'
meses["Cheshvan"] = 'Jeshvan'
meses["Tevet"] = 'Tebet'
meses["Sh'vat"] = 'Shebat'
meses["Iyyar"] = 'Iyar'

// cuenta gratis
let user = '0014083856'
let key = '71b00e0576030cd79a4f6991e84028bc304ede1679022357f6ff2ac77c5602516ed17dcf9aba840c'

// cuenta buena no pagada
// let user = '0013329078'
// let key = '61be5e5d2f3cd6228cac8adfc97f8786b53c2d01992068b9f1f697bc2763188f5daa8b4d9d34922c'

// function formatDate() {
//     var d = new Date(),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;

//     return [year, month, day].join('-');
// }

function Cal() {
    // const [present, dismiss] = useIonLoading();
    let mes = (new Date().getMonth()).toString()
    let dia = new Date().getDate().toString()

    if (new Date().getMonth().toString().length < 2) { mes = '0' + mes }
    if (new Date().getDate().toString().length < 2) { dia = '0' + dia }

    let [todaysDate, setTodaysDate] = useState(`${new Date().getFullYear()}-${mes}-${dia}`)
    let [todaysDateToChange, setTodaysDateToChange] = useState('')
    let [monthName, setMonthName] = useState('')
    let [monthNameHebrew1, setMonthNameHebrew1] = useState('')
    let [monthNameHebrew2, setMonthNameHebrew2] = useState('')
    let [hebrewYear1, sethebrewYear1] = useState('')
    let [hebrewYear2, sethebrewYear2] = useState('')
    let [firstTime, setFirstTime] = useState(true)
    // let [calStructure, setCalStructure] = useState(getCalStructure(new Date(todaysDate)))
    let [calStructureHebrew, setCalStructureHebrew] = useState([])
    let [calStructureHebrewantes, setCalStructureHebrewantes] = useState([])
    let [calStructureHebrewdespues, setCalStructureHebrewdespues] = useState([])
    let [calStructureHolidays, setCalStructureHolidays] = useState([])
    let [acabo, setAcabo] = useState(false)
    let [acabo2, setAcabo2] = useState(false)
    let [acabo3, setAcabo3] = useState(false)
    let [acabo4, setAcabo4] = useState(false)
    // let [selectedDate, setSelectedDate] = useState(formatDate() + 'T00:00:00-05:00');
    let [horarios, setHorarios] = useState('')
    let [validaDST, setValidaDST] = useState('')
    let [APIresponse, setAPIresponse] = useState([])
    let [APIresponse2, setAPIresponse2] = useState([])
    let [APIresponseTemp, setAPIresponseTemp] = useState([])
    let [show, setShow] = useState(false);
    // let [lat, setLat] = useState();
    // let [long, setLong] = useState();
    let [showPopover, setShowPopover] = useState(false);
    let [showPopover2, setShowPopover2] = useState(false);
    let [showPopover3, setShowPopover3] = useState(false);
    let [alert, setAlert] = useState('')
    let [url, setUrl] = useState('https://calateretdownload.netlify.app')
    // let [veranoCode, setVeranoCode] = useState('abrir dia')
    let [locationName, setLocationName] = useState('')
    let [sumarHoras, setSumerHoras] = useState(true)

    async function getLocation() {
        let position = await Geolocation.getCurrentPosition()
        lat = String(position.coords.latitude)
        long = String(position.coords.longitude)

        // lat = '34.986779'
        // long = '135.723153'

        // setLat(position.coords.latitude)
        // setLong(position.coords.longitude)

        // console.log(position.coords.latitude + ', ' + position.coords.longitude)

        // la api de https://opencagedata.com/api me da lat y long en el link de openstreetmaps, esa la mando a myzmanim
    }

    function myZmanimCallGPS(callBack, date) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { callBack(xmlhttp.responseText, date); }
        }
        xmlhttp.open("POST", 'https://api.myzmanim.com/engine1.json.aspx/searchGps', true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xmlhttp.send(`coding=JS&latitude=${lat}&longitude=${long}&key=${key}&user=${user}`)
    }

    function myZmanimCallGPS_callback(response, date) {
        var day = JSON.parse(response);
        myZmanimCall(myZmanimCall_callback, date, day.LocationID)
    }

    function myZmanimCallGPS_callback2(response, date) {
        var day = JSON.parse(response);
        myZmanimCall(myZmanimCall_callback2, date, day.LocationID)
    }

    function myZmanimCall(callBack, date, locationID) {
        // let locationID = '43945191'

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { callBack(xmlhttp.responseText); }
        }
        xmlhttp.open("POST", 'https://api.myzmanim.com/engine1.json.aspx/getDay', true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // cuenta ateret, hay q pagar para usar
        // xmlhttp.send(`coding=JS&language=en&locationid=43945191&inputdate=${dateForAPI}&key=61be5e5d2f3cd6228cac8adfc97f8786b53c2d01992068b9f1f697bc2763188f5daa8b4d9d34922c&user=0013329078`);

        // cuenta gratis mia eu
        xmlhttp.send(`coding=JS&language=en&locationid=${locationID}&inputdate=${date}&key=${key}&user=${user}`);
    }

    function myZmanimCall_callback(response) {
        var day = JSON.parse(response);

        setAPIresponse(day)
        // setAPIresponseTemp(day)        
    }

    function myZmanimCall_callback2(response) {
        var day = JSON.parse(response);

        setAPIresponseTemp(day)
    }

    function hebcalCall(year, month, day) {
        // axios.get(`https://www.hebcal.com/shabbat?cfg=json&geonameid=3530597&&m=45&gy=${year}&gm=${month}&gd=${day}&lg=es`)
        axios.get(`https://www.hebcal.com/shabbat?cfg=json&m=45&gy=${year}&gm=${month}&gd=${day}&lg=es&latitude=${lat}&longitude=${long}&tzid=${tzlookup(lat, long)}`)
            .then((response) => { setAPIresponse2(response) })
            .catch((err) => { console.log(err) })
    }

    function getCalStructure(date) {
        let fecha

        if (date) {
            fecha = new Date(date)
        }
        else {
            fecha = new Date()
        }

        let cal = []

        let cuantos;

        function daysInFebruary(year) {
            return (((year % 4 === 0) && ((!(year % 100 === 0)) || (year % 400 === 0))) ? 29 : 28);
        }

        switch (fecha.getMonth()) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                cuantos = 31;
                break;

            case 3:
            case 5:
            case 8:
            case 10:
                cuantos = 30;
                break;

            case 1:
                cuantos = daysInFebruary(fecha.getFullYear());
                break;

            default:
                break;
        }

        for (let i = 1; i <= cuantos; i++) {
            cal.push(new Date(fecha.getFullYear(), fecha.getMonth(), i))
        }

        return cal
    }

    function getMonthName(num) {
        let name = ''
        switch (num) {
            case 0:
                name = 'Enero'
                break;
            case 1:
                name = 'Febrero'
                break;
            case 2:
                name = 'Marzo'
                break;
            case 3:
                name = 'Abril'
                break;
            case 4:
                name = 'Mayo'
                break;
            case 5:
                name = 'Junio'
                break;
            case 6:
                name = 'Julio'
                break;
            case 7:
                name = 'Agosto'
                break;
            case 8:
                name = 'Septiembre'
                break;
            case 9:
                name = 'Octubre'
                break;
            case 10:
                name = 'Noviembre'
                break;
            case 11:
                name = 'Diciembre'
                break;
            default:
                break;
        }

        return name
    }

    // const monthNames = ["January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    // ];

    // const d = new Date();
    // document.write("The current month is " + monthNames[d.getMonth()]);

    function clickCuadrito(year, month, day) {
        if (day.length < 2) { day = '0' + day }
        if (month.toString().length < 2) { month = '0' + month.toString() }

        let date = `${year}-${month}-${day}`

        myZmanimCallGPS(myZmanimCallGPS_callback, date)
        // myZmanimCall(myZmanimCall_callback, date)

        hebcalCall(year, month, day)

        // setShowPopover(true)
        setShow(true)
        setHorarios(date)
    }

    function handleClick(event) {
        if (event.currentTarget.yo != 'hidden') {
            clickCuadrito(document.getElementById(event.currentTarget.id).year, (document.getElementById(event.currentTarget.id).month + 1), document.getElementById(event.currentTarget.id).day)
        }
    }

    function creaCal(otraFecha) {
        // present()

        let calStructure = []
        let calStructureantes = []
        let calStructuredespues = []
        let todaysDateantes = new Date(dayjs(todaysDate).$d.toString())
        let todaysDatedespues = new Date(dayjs(todaysDate).add(2, 'month').$d.toString())

        todaysDateantes = `${todaysDateantes.getFullYear()}-${todaysDateantes.getMonth().toString().length < 2 ? '0' + todaysDateantes.getMonth().toString() : todaysDateantes.getMonth()}-${todaysDateantes.getDate()}`
        todaysDatedespues = `${todaysDatedespues.getFullYear()}-${todaysDatedespues.getMonth().toString().length < 2 ? '0' + todaysDatedespues.getMonth().toString() : todaysDatedespues.getMonth()}-${todaysDatedespues.getDate()}`

        if (otraFecha) {
            let mes = otraFecha.getMonth().toString()
            let dia = otraFecha.getDate().toString()

            if (otraFecha.getMonth().toString().length < 2) { mes = '0' + mes }
            if (otraFecha.getDate().toString().length < 2) { dia = '0' + dia }

            setTodaysDate(`${otraFecha.getFullYear()}-${mes}-${dia}`)
            todaysDate = `${otraFecha.getFullYear()}-${mes}-${dia}`

            todaysDateantes = new Date(dayjs(otraFecha).subtract(1, 'month').$d.toString())
            todaysDatedespues = new Date(dayjs(otraFecha).add(1, 'month').$d.toString())
            todaysDateantes = `${todaysDateantes.getFullYear()}-${todaysDateantes.getMonth().toString().length < 2 ? '0' + todaysDateantes.getMonth().toString() : todaysDateantes.getMonth()}-${todaysDateantes.getDate()}`
            todaysDatedespues = `${todaysDatedespues.getFullYear()}-${todaysDatedespues.getMonth().toString().length < 2 ? '0' + todaysDatedespues.getMonth().toString() : todaysDatedespues.getMonth()}-${todaysDatedespues.getDate()}`

            // setCalStructure(getCalStructure(new Date(otraFecha)))
            calStructure = getCalStructure(new Date(todaysDate.slice(0, 4), todaysDate.slice(5, 7), todaysDate.slice(-2)))

            calStructureantes = getCalStructure(new Date(todaysDateantes.slice(0, 4), todaysDateantes.slice(5, 7), todaysDateantes.slice(-2)))
            calStructuredespues = getCalStructure(new Date(todaysDatedespues.slice(0, 4), todaysDatedespues.slice(5, 7), todaysDatedespues.slice(-2)))
        }
        else {
            // setCalStructure(getCalStructure(new Date(todaysDate)))
            calStructure = getCalStructure(new Date(todaysDate.slice(0, 4), todaysDate.slice(5, 7), todaysDate.slice(-2)))

            calStructureantes = getCalStructure(new Date(todaysDateantes.slice(0, 4), todaysDateantes.slice(5, 7), todaysDateantes.slice(-2)))
            calStructuredespues = getCalStructure(new Date(todaysDatedespues.slice(0, 4), todaysDatedespues.slice(5, 7), todaysDatedespues.slice(-2)))
        }

        //Create Cal
        setMonthName(getMonthName(calStructure[0].getMonth()))

        //Get MyZmanim
        // for (let i in calStructure) {
        //     myZmanimCall(myZmanimCall_callback, `${calStructure[i].getFullYear()}-${calStructure[i].getMonth() + 1}-${calStructure[i].getDate()}`)
        // }

        // levanaCall()

        let dateStart = calStructure[0].getFullYear() + '-' + ('0' + (calStructure[0].getMonth() + 1)).slice(-2) + '-' + ('0' + calStructure[0].getDate()).slice(-2)
        let dateEnd = calStructure[calStructure.length - 1].getFullYear() + '-' + ('0' + (calStructure[calStructure.length - 1].getMonth() + 1)).slice(-2) + '-' + ('0' + calStructure[calStructure.length - 1].getDate()).slice(-2)

        let dateStartantes = calStructureantes[0].getFullYear() + '-' + ('0' + (calStructureantes[0].getMonth() + 1)).slice(-2) + '-' + ('0' + calStructureantes[0].getDate()).slice(-2)
        let dateEndantes = calStructureantes[calStructureantes.length - 1].getFullYear() + '-' + ('0' + (calStructureantes[calStructureantes.length - 1].getMonth() + 1)).slice(-2) + '-' + ('0' + calStructureantes[calStructureantes.length - 1].getDate()).slice(-2)

        let dateStartdespues = calStructuredespues[0].getFullYear() + '-' + ('0' + (calStructuredespues[0].getMonth() + 1)).slice(-2) + '-' + ('0' + calStructuredespues[0].getDate()).slice(-2)
        let dateEnddespues = calStructuredespues[calStructuredespues.length - 1].getFullYear() + '-' + ('0' + (calStructuredespues[calStructuredespues.length - 1].getMonth() + 1)).slice(-2) + '-' + ('0' + calStructuredespues[calStructuredespues.length - 1].getDate()).slice(-2)

        axios.get(`https://www.hebcal.com/converter?cfg=json&start=${dateStartantes}&end=${dateEndantes}&g2h=1`)
            .then((response) => {
                let num = 1

                for (let i in response.data.hdates) {
                    calStructureHebrewantes[num] = response.data.hdates[i]
                    num++

                    if (num - 1 == response.data.end.slice(-2)) {
                        setAcabo3(true)
                    }
                }
            })
            .catch((err) => { console.log(err) })

        axios.get(`https://www.hebcal.com/converter?cfg=json&start=${dateStartdespues}&end=${dateEnddespues}&g2h=1`)
            .then((response) => {
                let num = 1

                for (let i in response.data.hdates) {
                    calStructureHebrewdespues[num] = response.data.hdates[i]
                    num++

                    if (num - 1 == response.data.end.slice(-2)) {
                        setAcabo4(true)
                    }
                }
            })
            .catch((err) => { console.log(err) })

        axios.get(`https://www.hebcal.com/converter?cfg=json&start=${dateStart}&end=${dateEnd}&g2h=1`)
            .then((response) => {
                let num = 1

                for (let i in response.data.hdates) {
                    calStructureHebrew[num] = response.data.hdates[i]
                    num++

                    if (num - 1 == response.data.end.slice(-2)) {
                        setAcabo(true)
                    }
                }
            })
            .catch((err) => { console.log(err) })

        axios.get(`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=3530597&M=on&s=on&start=${dateStart}&end=${dateEnd}&lg=es`)
            .then((response) => {
                let num = 0

                for (let i in response.data.items) {
                    if ((response.data.items[i].category == 'holiday' && response.data.items[i].subcat != "modern") || response.data.items[i].category == "roshchodesh") {
                        if (calStructureHolidays[response.data.items[i].date.slice(8, 10)]) {
                            if (response.data.items[i].title.search('Pésaj') == 0) {
                                calStructureHolidays[response.data.items[i].date.slice(8, 10)] += '<br>' + pesaj[response.data.items[i].title] ? pesaj[response.data.items[i].title] : response.data.items[i].title
                            }
                            else if (response.data.items[i].title.search('Janucá') == 0) {
                                calStructureHolidays[response.data.items[i].date.slice(8, 10)] += '<br>' + januka[response.data.items[i].title]
                            }
                            else if (response.data.items[i].title.search('Sukot') == 0) {
                                calStructureHolidays[response.data.items[i].date.slice(8, 10)] += '<br>' + sukot[response.data.items[i].title]
                            }
                            else {
                                if (response.data.items[i].title != 'Rosh Hashana LaBehemot') {
                                    if (response.data.items[i].title == 'Leil Selijot') {
                                        calStructureHolidays[response.data.items[i].date.slice(8, 10)] += '<br> Selijot Ashkenazim'
                                    }
                                    else {
                                        calStructureHolidays[response.data.items[i].date.slice(8, 10)] += '<br>' + response.data.items[i].title
                                    }
                                }
                            }
                        } else {
                            if (response.data.items[i].title.search('Pésaj') == 0) {
                                calStructureHolidays[response.data.items[i].date.slice(8, 10)] = pesaj[response.data.items[i].title] ? pesaj[response.data.items[i].title] : response.data.items[i].title
                            }
                            else if (response.data.items[i].title.search('Janucá') == 0) {
                                calStructureHolidays[response.data.items[i].date.slice(8, 10)] = januka[response.data.items[i].title]
                            }
                            else if (response.data.items[i].title.search('Sukot') == 0) {
                                calStructureHolidays[response.data.items[i].date.slice(8, 10)] = sukot[response.data.items[i].title]
                            }
                            else {
                                if (response.data.items[i].title != 'Rosh Hashana LaBehemot') {
                                    if (response.data.items[i].title == 'Leil Selijot') {
                                        calStructureHolidays[response.data.items[i].date.slice(8, 10)] = 'Selijot Ashkenazim'
                                    }
                                    else {
                                        calStructureHolidays[response.data.items[i].date.slice(8, 10)] = response.data.items[i].title
                                    }
                                }
                            }
                        }
                    }

                    num++

                    if (num == response.data.items.length) {
                        setAcabo2(true)
                    }
                }
            })
            .catch((err) => { console.log(err) })

        if (firstTime) {
            // Dias
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Dom</div>`
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Lun</div>`
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Mar</div>`
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Mie</div>`
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Jue</div>`
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Vie</div>`
            document.getElementById('lineaDias').innerHTML += `<div class="squaresDias">Shabat</div>`

            // Cuadritos fechas
            for (let i = 1; i <= 42; i++) {
                document.getElementById('grid').innerHTML += `<div id="square${i}" class="squares"></div>`
            }

            for (let id5 = 1; id5 <= 42; id5++) {
                document.getElementById(`square${id5}`).addEventListener("click", handleClick)
            }

            setFirstTime(false)
        }

        else {
            for (let id4 = 1; id4 <= 42; id4++) {
                document.getElementById(`square${id4}`).style.visibility = "visible";
                document.getElementById(`square${id4}`).style.removeProperty('border-color')
                document.getElementById(`square${id4}`).style.removeProperty('border-width')
                document.getElementById(`square${id4}`).style.removeProperty('border-style')
                document.getElementById(`square${id4}`).style.removeProperty('background-color')
                document.getElementById(`square${id4}`).style.removeProperty('opacity')
                // document.getElementById(`square${id4}`).removeEventListener("click", handleClick)
                document.getElementById(`square${id4}`).yo = ''
                document.getElementById(`square${id4}`).innerHTML = ''
            }
        }

        let id
        for (let i in calStructure) {
            if (i == 0) {
                id = calStructure[i].getDay()
                id++

                for (let id3 = 1; id3 < id; id3++) {
                    document.getElementById(`square${id3}`).yo = "hidden";
                    document.getElementById(`square${id3}`).style.setProperty('background-color', 'rgb(154, 204, 219, .5)')
                    document.getElementById(`square${id3}`).style.setProperty('opacity', '0.5')
                    // document.getElementById(`square${id3}`).removeEventListener('click', handleClick)
                }
            }

            document.getElementById(`square${id}`).innerHTML = `<num-dia>${calStructure[i].getDate()}</num-dia>`
            document.getElementById(`square${id}`).day = calStructure[i].getDate().toString()
            document.getElementById(`square${id}`).month = calStructure[i].getMonth()
            document.getElementById(`square${id}`).year = calStructure[i].getFullYear().toString()

            if (new Date().getFullYear() == calStructure[i].getFullYear() && new Date().getDate() == calStructure[i].getDate() && new Date().getMonth() == calStructure[i].getMonth()) {
                document.getElementById(`square${id}`).style.setProperty('background-color', 'rgb(86, 153, 247)')
            }
            else {
                if (id % 7) {
                    if ((id >= 1 && id <= 7) || (id >= 15 && id <= 21) || (id >= 29 && id <= 35)) {
                        if (id % 2) {
                            document.getElementById(`square${id}`).style.setProperty('background-color', 'rgb(204, 249, 208)')
                        }
                        else {
                            document.getElementById(`square${id}`).style.setProperty('background-color', 'rgb(250, 246, 177)')
                        }
                    }
                    else if ((id >= 8 && id <= 14) || (id >= 22 && id <= 28) || (id >= 36 && id <= 42)) {
                        if (id % 2) {
                            document.getElementById(`square${id}`).style.setProperty('background-color', 'rgb(250, 246, 177)')
                        }
                        else {
                            document.getElementById(`square${id}`).style.setProperty('background-color', 'rgb(204, 249, 208)')
                        }
                    }
                }
                else {
                    // document.getElementById(`square${id}`).style.setProperty('background-color', 'rgb(204, 249, 208)')
                    document.getElementById(`square${id}`).style.setProperty('border-color', 'rgb(250, 53, 53)')
                    document.getElementById(`square${id}`).style.setProperty('border-width', '1px')
                    document.getElementById(`square${id}`).style.setProperty('border-style', 'solid')
                }
            }

            id++

            if (i == calStructure.length - 1) {
                for (let id2 = id; id2 <= 42; id2++) {
                    document.getElementById(`square${id2}`).style.setProperty('background-color', 'rgb(154, 204, 219, .5)')
                    document.getElementById(`square${id2}`).style.setProperty('opacity', '0.5')
                    document.getElementById(`square${id2}`).yo = 'hidden'
                    // document.getElementById(`square${id2}`).removeEventListener('click', handleClick)

                    if (!document.getElementById(`square36`).innerHTML) {
                        document.getElementById(`square36`).style.visibility = "hidden";
                        document.getElementById(`square37`).style.visibility = "hidden";
                        document.getElementById(`square38`).style.visibility = "hidden";
                        document.getElementById(`square39`).style.visibility = "hidden";
                        document.getElementById(`square40`).style.visibility = "hidden";
                        document.getElementById(`square41`).style.visibility = "hidden";
                        document.getElementById(`square42`).style.visibility = "hidden";
                    }
                }
            }
        }
    }

    function recalculateMonth(what, from) {
        let fechaNueva

        if (what == 'add') {
            fechaNueva = add(new Date(todaysDate.slice(0, 4), todaysDate.slice(5, 7), todaysDate.slice(-2)), { months: 1 })
        }
        else {
            fechaNueva = sub(new Date(todaysDate.slice(0, 4), todaysDate.slice(5, 7), todaysDate.slice(-2)), { months: 1 })
        }

        setCalStructureHebrew([])
        setCalStructureHebrewantes([])
        setCalStructureHebrewdespues([])

        if (from == 'ges') {
            calStructureHebrew[1] = { hy: 5782, hm: 'Adar II', hd: 18, hebrew: 'י״ח בַּאֲדָר ב׳ תשפ״ב', events: [] }
            calStructureHebrewantes[1] = { hy: 5782, hm: 'Adar II', hd: 18, hebrew: 'י״ח בַּאֲדָר ב׳ תשפ״ב', events: [] }
            calStructureHebrewdespues[1] = { hy: 5782, hm: 'Adar II', hd: 18, hebrew: 'י״ח בַּאֲדָר ב׳ תשפ״ב', events: [] }
        }
        setAcabo(false)
        setAcabo2(false)
        setAcabo3(false)
        setAcabo4(false)
        setCalStructureHolidays([])
        setTodaysDateToChange(new Date(fechaNueva.getFullYear(), fechaNueva.getMonth(), fechaNueva.getDate()))
        // creaCal(`${fechaNueva.getFullYear()}-${fechaNueva.getMonth() + 1}-${fechaNueva.getDate()}`)
    }

    // Network.addListener('networkStatusChange', status => {
    //     console.log('Network status changed', status);
    // });

    const logCurrentNetworkStatus = async () => {
        const status = await Network.getStatus();

        // console.log('Network status:', status);

        if (!status.connected) { setShowPopover2(true) }
    };

    useIonViewWillEnter(() => {
        axios.get(`${process.env.REACT_APP_BackURL}/api/v1/myzmanimapi`)
            .then((response) => {
                user = response.data.data[0].user
                key = response.data.data[0].key
                myZmanimCallGPS(myZmanimCallGPS_callback2, `${todaysDate.split('-')[0]}-${Number(todaysDate.split('-')[1]) + 1}-${todaysDate.split('-')[2]}`)
            })
            .catch((err) => { console.log(err) })
    }, [])

    useLayoutEffect(() => {
        dayjs.extend(utc)
        dayjs.extend(timezone)

        axios.get(`${process.env.REACT_APP_BackURL}/api/v1/alerts`)
            .then((response) => {
                for (let i in response.data.data) {
                    if (new Date().getTime() > new Date(response.data.data[i].dateStart).getTime() && new Date().getTime() < new Date(response.data.data[i].dateEnd).getTime()) {
                        setShowPopover(true)

                        setAlert(response.data.data[i].alert)
                    }
                }
            })
            .catch((err) => { console.log(err) })

        axios.get(`${process.env.REACT_APP_BackURL}/api/v1/version`)
            .then((response) => {
                if (Number(response.data.data[0].VersionNumber) > process.env.REACT_APP_Version) {
                    setShowPopover3(true)
                }

                setSumerHoras(response.data.data[0].sumaVerano)
            })
            .catch((err) => { console.log(err) })

        creaCal()
        getLocation()

        logCurrentNetworkStatus()

        // const logDeviceInfo = async () => {
        //     const info = await Device.getInfo();

        //     info.operatingSystem == 'ios'
        //         ? setUrl('https://apps.apple.com/mx/app/tebila-app/id1572888530')
        //         : setUrl('https://play.google.com/store/apps/details?id=com.davidamiga.tebilaapp')
        // };

        // logDeviceInfo()
    }, [])

    useLayoutEffect(() => {
        if (APIresponse.length == 0) {
            // myZmanimCallGPS(myZmanimCallGPS_callback2, todaysDate)
            myZmanimCallGPS(myZmanimCallGPS_callback2, `${todaysDate.split('-')[0]}-${Number(todaysDate.split('-')[1]) + 1}-${todaysDate.split('-')[2]}`)
        }
        else {
            let time = getTimezone(tzlookup(lat, long))

            // DaylightTime
            // 0 = "Standard Time"
            // 1 = "Daylight Saving Time"
            // 2 = "Zmanim returned are in Standard Time. User should add one hour for Daylight Saving Time when applicable."
            // 3 = "We don't know if DST is observed here and now."

            // setVeranoCode(APIresponse.Time.DaylightTime)

            if (sumarHoras) {
                if (APIresponse.Time.DaylightTime == 2 || APIresponse.Time.DaylightTime == 3) {
                    // if (APIresponse.Time.DaylightTime != 0) {
                    // MyZmanim no sabe si hay DST
                    if ((time.dstOffsetStr != time.utcOffsetStr)) {
                        // Pero si hay DST

                        if (time.name.includes('Mex')) {
                            // Estoy en Mexico
                            // sumar hora a todo
                            setValidaDST('mexicoSumar')
                        }
                        else {
                            // No estoy en Mexico
                            // mensaje q hay dst y hay q sumar
                            setValidaDST('mundoAvisar')
                        }
                    }
                }
            }
        }
    }, [APIresponse])

    useLayoutEffect(() => {
        if (APIresponseTemp != 0) {
            if (!APIresponseTemp.ErrMsg) {
                if (APIresponseTemp.Place.Country != APIresponseTemp.Place.State) { setLocationName(`${APIresponseTemp.Place.Country}, ${APIresponseTemp.Place.State}`) }
                else { setLocationName(`${APIresponseTemp.Place.Country}`) }
            }
        }
    }, [APIresponseTemp])

    useEffect(() => {
        if (todaysDateToChange !== '') {
            creaCal(todaysDateToChange)
        }
    }, [todaysDateToChange])

    useEffect(() => {
        let id
        let id2 = 1
        let skip = 0
        let cual = 1
        let antes = getCalStructure(dayjs.tz(todaysDate, tzlookup(lat, long)).$d.toString())
        let despues = getCalStructure(dayjs.tz(todaysDate, tzlookup(lat, long)).add(2, 'month').$d.toString())

        if (acabo && acabo3 && acabo4) {
            for (let i = 1; i < 9; i++) {
                if (document.getElementById(`square${i}`).yo == 'hidden') {
                    skip++
                }
            }

            for (let i = skip; i > 0; i--) {
                if (document.getElementById(`square${i}`).yo == 'hidden') {
                    if (calStructureHebrewantes.length > 0) {
                        document.getElementById(`square${id2}`).innerHTML = `<num-dia>${antes[antes.length - i].getDate()}</num-dia> <div class='fechHeb'> <mes-heb>${meses[calStructureHebrewantes[calStructureHebrewantes.length - i].hm] ? meses[calStructureHebrewantes[calStructureHebrewantes.length - i].hm] : calStructureHebrewantes[calStructureHebrewantes.length - i].hm}</mes-heb> <num-dia-heb>${calStructureHebrewantes[calStructureHebrewantes.length - i].hd}</num-dia-heb> </div> <extra>&nbsp;</extra>`
                        id2++
                    }
                }
            }

            id = skip + 1

            for (let i in calStructureHebrew) {
                //document.getElementById(`square${id}`).innerHTML += `<br><br> <num-dia-heb>${calStructureHebrew[i].hebrew.slice(0, -6).replace(/בִּ|בְּ|בֶּ|בַּ/g, '')}</num-dia-heb>`

                // if (calStructureHebrew[i].hm) {
                if (document.getElementById(`square${id}`).innerHTML.includes('extra')) {
                    document.getElementById(`square${id}`).innerHTML += `<div class='fechHeb'> <mes-heb>${meses[calStructureHebrew[i].hm] ? meses[calStructureHebrew[i].hm] : calStructureHebrew[i].hm}</mes-heb> <num-dia-heb>${calStructureHebrew[i].hd}</num-dia-heb></div>`
                    document.getElementById(`square${id}`).appendChild(document.getElementById(`extra${id}`))
                }
                else {
                    document.getElementById(`square${id}`).innerHTML += `<div class='fechHeb'> <mes-heb>${meses[calStructureHebrew[i].hm] ? meses[calStructureHebrew[i].hm] : calStructureHebrew[i].hm}</mes-heb> <num-dia-heb>${calStructureHebrew[i].hd}</num-dia-heb></div>`
                }
                // }

                id++
            }

            for (let i2 = id; i2 <= 42; i2++) {
                if (document.getElementById(`square${i2}`).yo == 'hidden') {
                    if (calStructureHebrewdespues.length > 0) {
                        document.getElementById(`square${i2}`).innerHTML = `<num-dia>${despues[cual - 1].getDate()}</num-dia><div class='fechHeb'> <mes-heb>${meses[calStructureHebrewdespues[cual].hm] ? meses[calStructureHebrewdespues[cual].hm] : calStructureHebrewdespues[cual].hm}</mes-heb> <num-dia-heb>${calStructureHebrewdespues[cual].hd}</num-dia-heb> </div> <extra>&nbsp;</extra>`
                    }
                }
                cual++
            }

            if (calStructureHebrew[1]) {
                setMonthNameHebrew1(meses[calStructureHebrew[1].hm] ? meses[calStructureHebrew[1].hm] : calStructureHebrew[1].hm)
                setMonthNameHebrew2(meses[calStructureHebrew[calStructureHebrew.length - 1].hm] ? meses[calStructureHebrew[calStructureHebrew.length - 1].hm] : calStructureHebrew[calStructureHebrew.length - 1].hm)
                sethebrewYear1(calStructureHebrew[1].hy)
                sethebrewYear2(calStructureHebrew[calStructureHebrew.length - 1].hy)
            }
        }

        const gesture = createGesture({
            // el: document.getElementById('grid'),
            // onMove: (detail) => { onMove(detail); },

            el: document.getElementById('grid'),
            onEnd: (detail) => { onEnd(detail); }
        })

        gesture.enable();

        // const onMove = (detail) => {
        //     const type = detail.type;
        //     const currentX = detail.currentX;
        //     const deltaX = detail.deltaX;
        //     const velocityX = detail.velocityX;
        // }

        const onEnd = (detail) => {
            // if (detail.currentX >= 0 && detail.currentX <= 250) {
            if (detail.deltaX > 1) {
                // console.log('left to right')
                recalculateMonth('sub', 'ges')
            }
            // }
            // else if (detail.currentX >= 250 && detail.deltaX <= 380) {
            if (detail.deltaX < 1) {
                // console.log('right to left')
                recalculateMonth('add', 'ges')
            }
            // }
        }
    }, [acabo, acabo3, acabo4])

    useEffect(() => {
        let id
        let skip = 0
        let cual

        if (acabo2 && acabo) {
            for (let i = 1; i < 9; i++) {
                if (document.getElementById(`square${i}`).yo == 'hidden') {
                    skip++
                }
            }

            id = skip + 1

            for (let i in calStructureHebrew) {
                cual = i

                if (cual.length < 2) {
                    cual = '0' + cual
                }

                if (calStructureHolidays[cual] != undefined) {
                    if (calStructureHolidays[cual].includes('Tzom Tammuz')) { document.getElementById(`square${id}`).innerHTML += ` <extra id=extra${id}>${calStructureHolidays[cual].replace('Tzom Tammuz', 'Ayuno 17 de Tamuz')}</extra>` }
                    else if (calStructureHolidays[cual].includes('Tzom')) { document.getElementById(`square${id}`).innerHTML += ` <extra id=extra${id}>${calStructureHolidays[cual].replace('Tzom', 'Ayuno de')}</extra>` }
                    else if (calStructureHolidays[cual].includes('observado')) { document.getElementById(`square${id}`).innerHTML += ` <extra id=extra${id}>${calStructureHolidays[cual].replace('(observado)', '')}</extra>` }
                    else if (calStructureHolidays[cual].includes('Yom Kippur')) { document.getElementById(`square${id}`).innerHTML += ` <extra id=extra${id}>Yom Kippur</extra>` }
                    else if (calStructureHolidays[cual].includes('Erev')) { document.getElementById(`square${id}`).innerHTML += ` <extra id=extra${id}>${calStructureHolidays[cual].replace('Erev', 'Vispera de ')}</extra>` }
                    else { document.getElementById(`square${id}`).innerHTML += ` <extra id=extra${id}>${calStructureHolidays[cual]}</extra>` }

                    if (document.getElementById(`square${id}`).style.getPropertyValue('background-color') != 'rgb(86, 153, 247)') {
                        if (calStructureHolidays[cual].slice(0, 4) == 'Rosh') {
                            if (yomTob[calStructureHolidays[cual].slice(0, 12)]) {
                                document.getElementById(`square${id}`).style.setProperty('border-color', 'rgb(250, 53, 53)')
                                document.getElementById(`square${id}`).style.setProperty('border-width', '1px')
                                document.getElementById(`square${id}`).style.setProperty('border-style', 'solid')
                                document.getElementById(`square${id}`).style.setProperty('background-color', '#FFFFFF')
                            }
                        }
                        else {
                            if (yomTob[calStructureHolidays[cual]]) {
                                document.getElementById(`square${id}`).style.setProperty('border-color', 'rgb(250, 53, 53)')
                                document.getElementById(`square${id}`).style.setProperty('border-width', '1px')
                                document.getElementById(`square${id}`).style.setProperty('border-style', 'solid')
                                document.getElementById(`square${id}`).style.setProperty('background-color', '#FFFFFF')
                            }
                        }
                    }
                }
                else {
                    document.getElementById(`square${id}`).innerHTML += `<extra id=extra${id}>&nbsp;</extra>`
                }

                id++
            }
        }
    }, [acabo2, acabo])

    return (
        <>
            <IonPage >
                <IonContent>
                    <IonPopover isOpen={showPopover} cssClass='my-custom-class' onDidDismiss={e => setShowPopover(false)} backdrop-dismiss='true'>
                        <div className='ion-margin ion-text-center'>
                            <IonText className=''>Anuncio Importante!</IonText>
                            <br /><br />
                            <IonText color='danger'>{alert}</IonText>
                        </div>

                        <IonButton expand='block' color='tertiary' onClick={() => {
                            setShowPopover(false)
                        }}>Ok</IonButton>
                    </IonPopover>

                    <IonPopover isOpen={showPopover2} cssClass='my-custom-class' onDidDismiss={e => setShowPopover2(false)} backdrop-dismiss='true'>
                        <div className='ion-margin ion-text-center'>
                            <IonText className='' color='danger'>No hay conexion a internet</IonText>
                            <br /><br />
                            <IonText>Para el funcionamiento correcto de nuestra app es necesaria una conexion a internet. Por favor revisa tu conexion e intenta de nuevo.</IonText>
                        </div>

                        <IonButton expand='block' color='tertiary' onClick={() => {
                            setShowPopover2(false)
                        }}>Ok</IonButton>
                    </IonPopover>

                    <IonPopover isOpen={showPopover3} cssClass='my-custom-class' backdrop-dismiss='false'>
                        <div className='ion-margin ion-text-center'>
                            <IonText className='' color='danger'>No tienes la version mas actulizada de la app!</IonText>
                            <br /><br />
                            <IonText>Por favor actualiza antes de utilizarla.</IonText>
                        </div>

                        <IonButton expand='block' color='tertiary' onClick={() => { window.open(url) }}>Actualizar</IonButton>
                    </IonPopover>

                    <br /><br />

                    {/* <p>lat: {lat}</p>
                    <p>long: {long}</p>
                    <p>locationID: {locationid}</p>
                    <p>{tzlookup(lat, long)}</p>
                    <p>veranoCode: {veranoCode}</p> */}

                    <div className='arriba'>
                        <img src={logo} alt="" width={'20%'} />
                    </div>

                    <center>
                        <br />
                        <IonText className='locationName'>Ubicacion: </IonText> <IonText color='tertiary' className='locationName'>{locationName}</IonText>
                    </center>

                    {/* <img src={logo} alt="" className='logo' /> */}

                    <div className="buttonsCalName ion-marginz">
                        <div className="item" id='este'>
                            <IonButton fill='clear' onClick={() => { recalculateMonth('sub') }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                        </div>

                        <div className="item">
                            <div className='ion-padding'>
                                <div className='anos'>
                                    <IonText>{todaysDate.toString().slice(0, 4)} /&nbsp;</IonText>

                                    <IonText>{hebrewYear1} {
                                        hebrewYear1 != hebrewYear2 ? ` / ${hebrewYear2}` : null
                                    }</IonText>
                                </div>

                                <div className="meses">
                                    <IonText>{monthName}&nbsp;</IonText>

                                    <IonText>{monthNameHebrew1} {
                                        monthNameHebrew1 != monthNameHebrew2 ? ` / ${monthNameHebrew2}` : null
                                    }</IonText>
                                </div>
                            </div>
                        </div>

                        <div className="item" id='este'>
                            <IonButton fill='clear' onClick={() => { recalculateMonth('add') }}><IonIcon icon={chevronForwardOutline}></IonIcon></IonButton>
                        </div>
                    </div>

                    <div id="lineaDias">

                    </div>

                    <div id='grid'>

                    </div>

                    {
                        monthName ?
                            <>
                                <Levana title={true} nombre={monthName} key={monthName} />
                            </>
                            : null
                    }

                    <Popup trigger={show} setTrigger={setShow} horarios={horarios} APIresponse={APIresponse} APIresponse2={APIresponse2} calStructureHebrew={calStructureHebrew} lat={lat} long={long} validaDST={validaDST} />
                    <br /><br /><br />
                </IonContent>
            </IonPage>
        </>
    )
}

export default Cal
