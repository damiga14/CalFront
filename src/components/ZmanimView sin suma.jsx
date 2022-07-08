/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IonText } from '@ionic/react';
import tzlookup from 'tz-lookup'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Loading from '../components/Loading'
// import moment from 'moment';
// import add from 'date-fns/add'
// import sub from 'date-fns/sub'
// import { format, compareAsc } from 'date-fns'
import './ZmanimView.css'

function getLastSunday(year, month) {
    let d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
}

function getFirstSunday(year, month) {
    let d = new Date(year, month, 0);
    let res = d.getDate() - d.getDay() - 21

    if (res >= 8) { res = res - 7 }

    d.setDate(res);
    return d;
}

function daysInFebruary(year) {
    return (((year % 4 === 0) && ((!(year % 100 === 0)) || (year % 400 === 0))) ? 29 : 28);
}

let misExtras = [
    { "month": "Sivan", "monthNumber": 3, "date": 13, "event": "Nes Musan|Comunidad Jalebi no dice Anna (Tajanun)" },
    { "month": "Tamuz", "monthNumber": 4, "date": 19, "event": "Nes Toshe|Comunidad Shami no dice Anna (Tajanun)" },
    { "month": "Ab", "monthNumber": 5, "date": 18, "event": "Atarat Nedarim" },
    { "month": "Elul", "monthNumber": 6, "date": 2, "event": "Primer dia selijot Sefaradim" },
    { "month": "Elul", "monthNumber": 6, "date": 8, "event": "Nes Tuma|Comunidad Jalebi no dice Anna (Tajanun)" },
    { "month": "Nisan", "monthNumber": 1, "date": 13, "event": "En la noche busqueda de jametz (kal jamira)" },
    { "month": "Nisan", "monthNumber": 1, "date": 15, "event": "A partir de Musaf - Morid Hatal" },
    { "month": "Nisan", "monthNumber": 1, "date": 16, "event": "En la noche - Barejenu" },
    { "month": "Tishre", "monthNumber": 7, "date": 22, "event": "A partir de Musaf - Mashib Haruaj" }
]

let misExtrasEspanol = [
    { "monthNumber": getFirstSunday('2022', '4').getMonth() + 1, "date": getFirstSunday('2022', '4').getDate(), "event": "Comienza horario de Verano" },
    { "monthNumber": getLastSunday('2022', '10').getMonth() + 1, "date": getLastSunday('2022', '10').getDate(), "event": "Comienza horario de Invierno" },
]

let horariosPesajVender = []
horariosPesajVender[1] = { "marzo": '11:10 AM', "abril": '10:58 AM', "marzoVerano": '12:10 AM', "abrilVerano": '11:58 AM' }
horariosPesajVender[2] = { "marzo": '11:10 AM', "abril": '10:58 AM', "marzoVerano": '12:10 AM', "abrilVerano": '11:58 AM' }
horariosPesajVender[3] = { "marzo": '11:09 AM', "abril": '10:57 AM', "marzoVerano": '12:09 AM', "abrilVerano": '11:57 AM' }
horariosPesajVender[4] = { "marzo": '11:09 AM', "abril": '10:57 AM', "marzoVerano": '12:09 AM', "abrilVerano": '11:57 AM' }
horariosPesajVender[5] = { "marzo": '11:10 AM', "abril": '10:56 AM', "marzoVerano": '12:10 AM', "abrilVerano": '11:56 AM' }
horariosPesajVender[6] = { "marzo": '11:09 AM', "abril": '10:56 AM', "marzoVerano": '12:09 AM', "abrilVerano": '11:56 AM' }
horariosPesajVender[7] = { "marzo": '11:09 AM', "abril": '10:56 AM', "marzoVerano": '12:09 AM', "abrilVerano": '11:56 AM' }
horariosPesajVender[8] = { "marzo": '11:09 AM', "abril": '10:55 AM', "marzoVerano": '12:09 AM', "abrilVerano": '11:55 AM' }
horariosPesajVender[9] = { "marzo": '11:09 AM', "abril": '10:55 AM', "marzoVerano": '12:09 AM', "abrilVerano": '11:55 AM' }
horariosPesajVender[10] = { "marzo": '11: 08 AM', "abril": '10: 55 AM', "marzoVerano": '12:08 AM', "abrilVerano": '11:55 AM' }
horariosPesajVender[11] = { "marzo": '11: 08 AM', "abril": '10: 55 AM', "marzoVerano": '12:08 AM', "abrilVerano": '11:55 AM' }
horariosPesajVender[12] = { "marzo": '11: 08 AM', "abril": '10: 54 AM', "marzoVerano": '12:08 AM', "abrilVerano": '11:54 AM' }
horariosPesajVender[13] = { "marzo": '11: 07 AM', "abril": '10: 54 AM', "marzoVerano": '12:07 AM', "abrilVerano": '11:54 AM' }
horariosPesajVender[14] = { "marzo": '11: 07 AM', "abril": '10: 53 AM', "marzoVerano": '12:07 AM', "abrilVerano": '11:53 AM' }
horariosPesajVender[15] = { "marzo": '11: 07 AM', "abril": '10: 53 AM', "marzoVerano": '12:07 AM', "abrilVerano": '11:53 AM' }
horariosPesajVender[16] = { "marzo": '11: 07 AM', "abril": '10: 52 AM', "marzoVerano": '12:07 AM', "abrilVerano": '11:52 AM' }
horariosPesajVender[17] = { "marzo": '11: 06 AM', "abril": '10: 52 AM', "marzoVerano": '12:06 AM', "abrilVerano": '11:52 AM' }
horariosPesajVender[18] = { "marzo": '11: 06 AM', "abril": '10: 51 AM', "marzoVerano": '12:06 AM', "abrilVerano": '11:51 AM' }
horariosPesajVender[19] = { "marzo": '11: 05 AM', "abril": '10: 51 AM', "marzoVerano": '12:05 AM', "abrilVerano": '11:51 AM' }
horariosPesajVender[20] = { "marzo": '11: 04 AM', "abril": '10: 50 AM', "marzoVerano": '12:04 AM', "abrilVerano": '11:50 AM' }
horariosPesajVender[21] = { "marzo": '11: 04 AM', "abril": '10: 50 AM', "marzoVerano": '12:04 AM', "abrilVerano": '11:50 AM' }
horariosPesajVender[22] = { "marzo": '11: 03 AM', "abril": '10: 49 AM', "marzoVerano": '12:03 AM', "abrilVerano": '11:49 AM' }
horariosPesajVender[23] = { "marzo": '11: 03 AM', "abril": '10: 49 AM', "marzoVerano": '12:03 AM', "abrilVerano": '11:49 AM' }
horariosPesajVender[24] = { "marzo": '11: 02 AM', "abril": '10: 48 AM', "marzoVerano": '12:02 AM', "abrilVerano": '11:48 AM' }
horariosPesajVender[25] = { "marzo": '11: 02 AM', "abril": '10: 48 AM', "marzoVerano": '12:02 AM', "abrilVerano": '11:48 AM' }
horariosPesajVender[26] = { "marzo": '11: 02 AM', "abril": '10: 48 AM', "marzoVerano": '12:02 AM', "abrilVerano": '11:48 AM' }
horariosPesajVender[27] = { "marzo": '11: 01 AM', "abril": '10: 48 AM', "marzoVerano": '12:01 AM', "abrilVerano": '11:48 AM' }
horariosPesajVender[28] = { "marzo": '11: 00 AM', "abril": '10: 47 AM', "marzoVerano": '12:00 AM', "abrilVerano": '11:47 AM' }
horariosPesajVender[29] = { "marzo": '11: 00 AM', "abril": '10: 47 AM', "marzoVerano": '12:00 AM', "abrilVerano": '11:47 AM' }
horariosPesajVender[30] = { "marzo": '10: 59 AM', "abril": '10: 47 AM', "marzoVerano": '11:59 AM', "abrilVerano": '11:47 AM' }
horariosPesajVender[31] = { "marzo": '10: 59 AM', "abril": '', "marzoVerano": '11:59 AM', "abrilVerano": '' }

let horariosPesajComer = []
horariosPesajComer[1] = { "marzo": '10:03 AM', "abril": '9:48 AM', "marzoVerano": '11:03 AM', "abrilVerano": '10:48 AM' }
horariosPesajComer[2] = { "marzo": '10:03 AM', "abril": '9:48 AM', "marzoVerano": '11:03 AM', "abrilVerano": '10:48 AM' }
horariosPesajComer[3] = { "marzo": '10:02 AM', "abril": '9:47 AM', "marzoVerano": '11:02 AM', "abrilVerano": '10:47 AM' }
horariosPesajComer[4] = { "marzo": '10:02 AM', "abril": '9:47 AM', "marzoVerano": '11:02 AM', "abrilVerano": '10:47 AM' }
horariosPesajComer[5] = { "marzo": '10:02 AM', "abril": '9:46 AM', "marzoVerano": '11:02 AM', "abrilVerano": '10:46 AM' }
horariosPesajComer[6] = { "marzo": '10:01 AM', "abril": '9:46 AM', "marzoVerano": '11:01 AM', "abrilVerano": '10:46 AM' }
horariosPesajComer[7] = { "marzo": '10:01 AM', "abril": '9:46 AM', "marzoVerano": '11:01 AM', "abrilVerano": '10:46 AM' }
horariosPesajComer[8] = { "marzo": '10:01 AM', "abril": '9:45 AM', "marzoVerano": '11:01 AM', "abrilVerano": '10:45 AM' }
horariosPesajComer[9] = { "marzo": '10:01 AM', "abril": '9:45 AM', "marzoVerano": '11:01 AM', "abrilVerano": '10:45 AM' }
horariosPesajComer[10] = { "marzo": '10: 00 AM', "abril": '9: 44 AM', "marzoVerano": '11:00 AM', "abrilVerano": '10:44 AM' }
horariosPesajComer[11] = { "marzo": '10: 00 AM', "abril": '9: 44 AM', "marzoVerano": '11:00 AM', "abrilVerano": '10:44 AM' }
horariosPesajComer[12] = { "marzo": '10: 00 AM', "abril": '9: 43 AM', "marzoVerano": '11:00 AM', "abrilVerano": '10:43 AM' }
horariosPesajComer[13] = { "marzo": '9: 59 AM', "abril": '9: 43 AM', "marzoVerano": '10:59 AM', "abrilVerano": '10:43 AM' }
horariosPesajComer[14] = { "marzo": '9: 59 AM', "abril": '9: 42 AM', "marzoVerano": '10:59 AM', "abrilVerano": '10:42 AM' }
horariosPesajComer[15] = { "marzo": '9: 58 AM', "abril": '9: 42 AM', "marzoVerano": '10:58 AM', "abrilVerano": '10:42 AM' }
horariosPesajComer[16] = { "marzo": '9: 58 AM', "abril": '9: 41 AM', "marzoVerano": '10:58 AM', "abrilVerano": '10:41 AM' }
horariosPesajComer[17] = { "marzo": '9: 57 AM', "abril": '9: 41 AM', "marzoVerano": '10:57 AM', "abrilVerano": '10:41 AM' }
horariosPesajComer[18] = { "marzo": '9: 57 AM', "abril": '9: 40 AM', "marzoVerano": '10:57 AM', "abrilVerano": '10:40 AM' }
horariosPesajComer[79] = { "marzo": '9: 56 AM', "abril": '9: 40 AM', "marzoVerano": '10:56 AM', "abrilVerano": '10:40 AM' }
horariosPesajComer[20] = { "marzo": '9: 55 AM', "abril": '9: 39 AM', "marzoVerano": '10:55 AM', "abrilVerano": '10:39 AM' }
horariosPesajComer[21] = { "marzo": '9: 55 AM', "abril": '9: 39 AM', "marzoVerano": '10:55 AM', "abrilVerano": '10:39 AM' }
horariosPesajComer[22] = { "marzo": '9: 54 AM', "abril": '9: 38 AM', "marzoVerano": '10:54 AM', "abrilVerano": '10:38 AM' }
horariosPesajComer[23] = { "marzo": '9: 54 AM', "abril": '9: 38 AM', "marzoVerano": '10:54 AM', "abrilVerano": '10:38 AM' }
horariosPesajComer[24] = { "marzo": '9: 53 AM', "abril": '9: 37 AM', "marzoVerano": '10:53 AM', "abrilVerano": '10:37 AM' }
horariosPesajComer[25] = { "marzo": '9: 53 AM', "abril": '9: 37 AM', "marzoVerano": '10:53 AM', "abrilVerano": '10:37 AM' }
horariosPesajComer[26] = { "marzo": '9: 52 AM', "abril": '9: 36 AM', "marzoVerano": '10:52 AM', "abrilVerano": '10:36 AM' }
horariosPesajComer[27] = { "marzo": '9: 51 AM', "abril": '9: 36 AM', "marzoVerano": '10:51 AM', "abrilVerano": '10:36 AM' }
horariosPesajComer[28] = { "marzo": '9: 50 AM', "abril": '9: 35 AM', "marzoVerano": '10:50 AM', "abrilVerano": '10:35 AM' }
horariosPesajComer[29] = { "marzo": '9: 50 AM', "abril": '9: 35 AM', "marzoVerano": '10:50 AM', "abrilVerano": '10:35 AM' }
horariosPesajComer[30] = { "marzo": '9: 49 AM', "abril": '9: 34 AM', "marzoVerano": '10:49 AM', "abrilVerano": '10:34 AM' }
horariosPesajComer[31] = { "marzo": '9: 49 AM', "abril": '', "marzoVerano": '10:49 AM', "abrilVerano": '' }

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
januka["Janucá: 1 vela"] = 'Januka|En la noche 1a vela'
januka["Janucá: 2 velas"] = 'Januka 1|En la noche 2a vela'
januka["Janucá: 3 velas"] = 'Januka 2|En la noche 3a vela'
januka["Janucá: 4 velas"] = 'Januka 3|En la noche 4a vela'
januka["Janucá: 5 velas"] = 'Januka 4|En la noche 5a vela'
januka["Janucá: 6 velas"] = 'Januka 5|En la noche 6a vela'
januka["Janucá: 7 velas"] = 'Januka 6|En la noche 7a vela'
januka["Janucá: 8 velas"] = 'Januka 7|En la noche 8a vela'
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

let perasha = []
perasha["Jayei Sara"] = 'Jaye Sara'
perasha["Toldot"] = 'Toledot'
perasha["Vayeji"] = 'Vaiji'
perasha["Vaiakel"] = 'Vayakhel'
perasha["Pekudei"] = 'Pekude'
perasha["Ajarei Mot"] = 'Ajare Mot'
perasha["Bejar"] = 'Behar'
perasha["Shlaj"] = 'Shelaj'
perasha["Pinjas"] = 'Pinejas'
perasha["Matot-Masei"] = 'Matot-Mase'
perasha["Devarim"] = 'Debarim'
perasha["Eikev"] = 'Ekeb'
perasha["Shoftim"] = 'Shofetim'
perasha["Ki Tezei"] = 'Ki Tetze'
perasha["Ki Tavo"] = 'Ki Tabo'
perasha["Shmini"] = 'Shemini'
perasha["Parah"] = 'Pará'

function ZmanimView(props) {
    // let [APIShabat, setAPIShabat] = useState(props.a2)
    let [candles, setCandles] = useState()
    let [habdala, setHabdala] = useState()
    let [fastBegins, setFastBegins] = useState()
    let [fastEnds, setFastEnds] = useState()
    let [perasha2, setPerasha] = useState()
    let [extra, setExtra] = useState()
    let [extra2, setExtra2] = useState()
    let [verano, setVerano] = useState(false)
    let [diceAnna, setDiceAnna] = useState(false)
    let [diceHamelej, setDiceHamelej] = useState(false)
    let [izcor, setIzcor] = useState(true)
    let [loading, setLoading] = useState(true)
    let [avisaDST, setAvisaDST] = useState(false)

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

    function getDayEspanol(day) {
        let dia = ''
        switch (day) {
            case 'Sunday':
                dia = 'Domingo'
                break;
            case 'Monday':
                dia = 'Lunes'
                break;
            case 'Tuesday':
                dia = 'Martes'
                break;
            case 'Wednesday':
                dia = 'Miercoles'
                break;
            case 'Thursday':
                dia = 'Jueves'
                break;
            case 'Friday':
                dia = 'Viernes'
                break;
            case 'Shabbos':
                dia = 'Shabat'
                break;

            default:
                break;
        }

        return dia
    }

    function formatZman(zman) {
        let d = new Date(zman);
        var hr = d.getUTCHours();
        var min = d.getUTCMinutes();
        var sec = d.getUTCSeconds();
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        var ampm = hr < 12 ? " AM" : " PM";
        if (hr == 0) hr = 12;
        if (hr > 12) hr -= 12;
        var result = hr + ":" + min
        if (sec > 0) result += ":" + sec;
        result += ampm;
        return result
    }

    function formatZman2(zman) {
        let d = new Date(zman);
        var hr = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        var ampm = hr < 12 ? " AM" : " PM";
        if (hr == 0) hr = 12;
        if (hr > 12) hr -= 12;
        var result = hr + ":" + min
        if (sec > 0) result += ":" + sec;
        result += ampm;
        return result
    }

    function formatZman3(zman) {
        let d = dayjs(zman, tzlookup(props.lat, props.long)).$d
        var hr = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        var ampm = hr < 12 ? " AM" : " PM";
        if (hr == 0) hr = 12;
        if (hr > 12) hr -= 12;
        var result = hr + ":" + min
        if (sec > 0) result += ":" + sec;
        result += ampm;
        return result
    }

    function seDiceAnna(d) {
        let day = Number(d.slice(d.indexOf('-', 5) + 1, d.length))
        let month = Number(d.slice(d.indexOf('-') + 1, d.indexOf('-', d.indexOf('-') + 2)))
        let noSeDice = false

        if ((month == 3 && (day >= 1 && day <= 12))
            || (month == 7 && day > 10)
            || month == 1
            || (month == 2 && (day == 18 || day == 14))
            || (month == 11 && day == 15)
            || (month == 5 && day == 15)
            || (month >= 12 && day == 15)) { noSeDice = true }

        return noSeDice
    }

    function seDiceHamelejHakadosh(d) {
        let day = Number(d.slice(d.indexOf('-', 5) + 1, d.length))
        let month = Number(d.slice(d.indexOf('-') + 1, d.indexOf('-', d.indexOf('-') + 2)))
        let noSeDice = false

        if (month == 7 && (day >= 1 && day <= 10)) { noSeDice = true }

        return noSeDice
    }

    function hayIzcor(d) {
        let day = Number(d.slice(d.indexOf('-', 5) + 1, d.length))
        let month = Number(d.slice(d.indexOf('-') + 1, d.indexOf('-', d.indexOf('-') + 2)))
        let hay = false

        if ((month == 1 && day == 22) || (month == 7 && day == 22) || (month == 7 && day == 10) || (month == 3 && day == 7)) { hay = true }

        return hay
    }

    useLayoutEffect(() => {
        dayjs.extend(utc)
        dayjs.extend(timezone)

        // moment().format();
    }, [])

    useLayoutEffect(() => {
        if (props.date) {
            setVerano(false)
            setLoading(true)
            setDiceAnna(false)
            setDiceHamelej(false)
            setIzcor(false)
            setAvisaDST(false)

            //barej alenu si es año bisiesto de goy, el año anterior es 5 dic en la noche, si no es el 4 en la noche
            if (daysInFebruary(Number(props.date.slice(0, 4)) + 1) == 29) {
                misExtrasEspanol.push({ "monthNumber": 12, "date": 5, "event": "En la noche - Barej Alenu" })
            }
            else {
                misExtrasEspanol.push({ "monthNumber": 12, "date": 4, "event": "En la noche - Barej Alenu" })
            }

            // // eslint-disable-next-line no-extend-native
            // Date.prototype.stdTimezoneOffset = function () {
            //     var jan = new Date(this.getFullYear(), 0, 1);
            //     var jul = new Date(this.getFullYear(), 6, 1);
            //     return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            // }
            // // eslint-disable-next-line no-extend-native
            // Date.prototype.isDstObserved = function () {
            //     return this.getTimezoneOffset() < this.stdTimezoneOffset();
            // }

            // if (dayjs(props.date).$d.isDstObserved()) {
            //     setVerano(true)
            // }

            if (dayjs(props.date).$M + 1 >= misExtrasEspanol[0].monthNumber && dayjs(props.date).$D >= misExtrasEspanol[0].date) {
                if (dayjs(props.date).$M + 1 <= misExtrasEspanol[1].monthNumber && dayjs(props.date).$D < misExtrasEspanol[1].date) {
                    verano = true
                    setVerano(true)
                }
            }

            if (props.validaDST) {
                if (props.validaDST == 'mexicoSumar') {
                    if (props.a.Zman) {
                        // props.a.Zman.Yakir110 = dayjs.tz(props.a.Zman.Yakir110, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.Dawn72fix = dayjs.tz(props.a.Zman.Dawn72fix, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.SunriseLevel = dayjs.tz(props.a.Zman.SunriseLevel, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.ShemaMA72fix = dayjs.tz(props.a.Zman.ShemaMA72fix, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.ShemaGra = dayjs.tz(props.a.Zman.ShemaGra, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.ShachrisMA72fix = dayjs.tz(props.a.Zman.ShachrisMA72fix, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.ShachrisGra = dayjs.tz(props.a.Zman.ShachrisGra, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.Midday = dayjs.tz(props.a.Zman.Midday, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.Mincha30fix = dayjs.tz(props.a.Zman.Mincha30fix, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.KetanaGra = dayjs.tz(props.a.Zman.KetanaGra, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.PlagGra = dayjs.tz(props.a.Zman.PlagGra, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.SunsetLevel = dayjs.tz(props.a.Zman.SunsetLevel, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.Night72fixLevel = dayjs.tz(props.a.Zman.Night72fixLevel, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                        // props.a.Zman.Midnight = dayjs.tz(props.a.Zman.Midnight, tzlookup(props.lat, props.long)).add(1, 'hour').$d.toString()
                    }
                }
                else if (props.validaDST == 'mundoAvisar') {
                    setAvisaDST(true)
                }
            }

        }
    }, [props.date, props.validaDST, props?.a?.Zman])

    useEffect(() => {
        let hayAntes = false

        if (props.a2.data && props.a.Time) {
            let today = props.date.slice(8, props.date.length)

            if (props.date.slice(8, props.date.length).length < 2) {
                today = '0' + String(props.date.slice(8, props.date.length))
            }

            setFastEnds()
            setFastBegins()
            setExtra()
            setExtra2()
            setPerasha()

            for (let i in props.a2.data.items) {
                if (props.a2.data.items[i].category == 'havdalah' && props.a2.data.items[i].memo == 'Yom Kippur') {
                    setFastEnds(formatZman3(props.a2.data.items[i].date))
                }
                else if (props.a2.data.items[i].category == 'candles') {
                    setCandles(props.a2.data.items[i].title.slice(22, props.a2.data.items[i].title.length).replace('pm', ' PM'))
                }
                else if (props.a2.data.items[i].category == 'havdalah') {
                    // setHabdala(props.a2.data.items[i].title.slice(18, props.a2.data.items[i].title.length).replace('pm', ' PM'))
                    setHabdala(formatZman2(dayjs.tz(props.a.Zman.SunsetLevel, tzlookup(props.lat, props.long)).add(45, 'minute').$d.toString()))
                }
                // else if (props.a2.data.items[i].title == 'El ayuno comienza') {
                //     if (props.a2.data.items[i].date.slice(8, 10) == today) {
                //         setFastBegins(props.a2.data.items[i].date.slice(11, 16))
                //     }
                // }
                else if (props.a2.data.items[i].title == 'El ayuno finaliza') {
                    if (props.a2.data.items[i].date.slice(8, 10) == today) {
                        setFastEnds(props.a2.data.items[i].date.slice(11, 16))
                    }
                }
                else if (props.a2.data.items[i].category == 'parashat') {
                    setPerasha(perasha[props.a2.data.items[i].title.replace('Parashá ', '')] ? perasha[props.a2.data.items[i].title.replace('Parashá ', '')] : props.a2.data.items[i].title.replace('Parashá ', ''))
                }
                else if (props.a2.data.items[i].category == 'holiday' && props.a2.data.items[i].subcat != "modern") {
                    if (props.a2.data.items[i].date.slice(8, 10) == today) {
                        if (!hayAntes) {
                            if (props.a.Time.IsFastDay) {
                                if (props.a2.data.items[i].title.includes('Tzom')) { setExtra('Ayuno ' + props.a2.data.items[i].title.replace('Tzom', '17 de')) }
                                else { setExtra('Ayuno ' + props.a2.data.items[i].title) }
                            }
                            else {
                                if (props.a2.data.items[i].title.search('Pésaj') == 0) {
                                    setExtra(pesaj[props.a2.data.items[i].title] ? pesaj[props.a2.data.items[i].title] : props.a2.data.items[i].title)
                                }
                                else if (props.a2.data.items[i].title.search('Janucá') == 0) {
                                    setExtra(januka[props.a2.data.items[i].title])
                                }
                                else if (props.a2.data.items[i].title.search('Sukot') == 0) {
                                    setExtra(sukot[props.a2.data.items[i].title])
                                }
                                else {
                                    if (props.a2.data.items[i].title != 'Rosh Hashana LaBehemot') {
                                        if (props.a2.data.items[i].title.includes('observado')) { setExtra(props.a2.data.items[i].title.replace('(observado)', '')) }
                                        else if (props.a2.data.items[i].title.includes('Erev')) { setExtra2(props.a2.data.items[i].title.replace('Erev', 'Visepra de ')) }
                                        else { setExtra(props.a2.data.items[i].title) }
                                    }
                                }
                            }

                            hayAntes = true
                        }
                        else {
                            if (props.a2.data.items[i].title != 'Rosh Hashana LaBehemot') {
                                if (props.a2.data.items[i].title.includes('Erev')) { setExtra2(props.a2.data.items[i].title.replace('Erev', 'Visepra de ')) }
                                else { setExtra2(props.a2.data.items[i].title) }
                            }
                        }
                    }
                }
                else if (props.a2.data.items[i].category == 'roshchodesh') {
                    if (props.a2.data.items[i].date.slice(8, 10) == today) {
                        setExtra2(props.a2.data.items[i].title)
                    }
                }
                else if (props.a2.data.items[i].title == 'Pésaj Sheni') {
                    if (props.a2.data.items[i].date.slice(8, 10) == today) {
                        setExtra2(props.a2.data.items[i].title)
                    }
                }
                else if (props.a2.data.items[i].category == 'mevarchim') {
                    if (props.a2.data.items[i].date.slice(8, 10) == today) {
                        if (!hayAntes) { setExtra('Mebarejim Hajodesh') }
                        else { setExtra2('Mebarejim Hajodesh') }
                    }
                }
            }
        }

        if (props.a.Time) {
            if (props.a.ErrMsg == null) {
                setLoading(false)
                setDiceAnna(seDiceAnna(props.a.Time.DateJewish))
                setDiceHamelej(seDiceHamelejHakadosh(props.a.Time.DateJewish))
                setIzcor(hayIzcor(props.a.Time.DateJewish))

                for (let i in misExtras) {
                    if (misExtras[i].monthNumber == props.a.Time.DateJewish.slice(props.a.Time.DateJewish.indexOf('-') + 1, props.a.Time.DateJewish.lastIndexOf('-'))) {
                        if (misExtras[i].date == props.a.Time.DateJewish.slice(props.a.Time.DateJewish.lastIndexOf('-') + 1)) {
                            setExtra2(misExtras[i].event)
                        }
                    }
                }

                if (props.a2) {
                    for (let i2 in props.a2.data.items) {
                        if ((props.a2.data.items[i2].title == 'El ayuno comienza' && props.a.Time.IsErevTishaBav) || (props.a2.data.items[i2].memo == 'Erev Yom Kippur' && props.a.Time.IsErevYomKipper)) {
                            setFastBegins(formatZman3(props.a2.data.items[i2].date))
                        }
                    }
                }

                for (let i in misExtrasEspanol) {
                    if (misExtrasEspanol[i].monthNumber == props.a.Time.DateCivil.slice(5, 7)) {
                        if (misExtrasEspanol[i].date == props.a.Time.DateCivil.slice(8, 10)) {
                            setExtra(misExtrasEspanol[i].event)
                        }
                    }
                }
            }
        }

    }, [props?.a2?.data?.items, props?.a?.Time])

    useEffect(() => {
        if (extra == 'Shabat Parah' || extra == 'Shabat HaJodesh' || extra == 'Shabat Zajor' || extra == 'Shabat Shekalim') {
            setPerasha(`${perasha2}-${extra.replace('Shabat ', '')}`)
            setExtra()
        }
    }, [extra])

    return (
        <>
            {
                // console.log(props.a, props.a2)
            }

            {
                props.a.ErrMsg == 'DateOutOfRange' ?
                    <>
                        <IonText className='ion-text-center' color='danger'><b>Rango de fechas excedido!</b></IonText>

                        <br /><br />

                        <IonText>Para asegurar la precisión de nuestros horarios, solo calculamos hasta un año atrás y adelante de la fecha actual.</IonText>
                    </>
                    :

                    loading ? <Loading /> :

                        <>
                            {
                                verano && !avisaDST ?
                                    <><IonText className='small' color='danger'>Contemplamos horario de verano</IonText><br /><br /></>
                                    : null
                            }

                            {
                                avisaDST ?
                                    <><IonText className='small' color='danger'>No tenemos informacion de horario de verano para tu ubicacion, en caso de aplicarse sumar una hora a todos los horarios</IonText><br /><br /></>
                                    : null
                            }

                            <div className='titulo'>
                                {props.a.Time ? `${getDayEspanol(props.a.Time.Weekday)}` : null} {Number(props.date.slice(8, props.date.length))} de {getMonthName(props.date.slice(5, 7) - 1)}
                                <br />
                                {/* {props.a.Time ? `${props.a.Time.DateJewishShort}` : null} */}

                                {props.calStructureHebrew ?
                                    props.a.Time ?
                                        `${props.calStructureHebrew[Number(props.date.slice(8, props.date.length))].hd} de ${meses[props.calStructureHebrew[Number(props.date.slice(8, props.date.length))].hm] ? meses[props.calStructureHebrew[Number(props.date.slice(8, props.date.length))].hm] : props.calStructureHebrew[Number(props.date.slice(8, props.date.length))].hm}`
                                        : null
                                    : null}
                            </div>

                            <br />

                            <div>
                                {perasha2 ? <><IonText className='small'>Perasha de la semana: </IonText><b><br /><IonText className="perasha">{perasha2}</IonText></b></> : null}
                            </div>

                            <div>
                                {props.a.Time ? <><IonText className='small'>Daf Hayomi: <b><br /><IonText className="perasha">{props.a.Time.DafYomi}</IonText></b></IonText><br /><br /></> : null}
                            </div>

                            {
                                extra ?
                                    extra.slice(0, 5) == 'Ayuno' ?
                                        <>
                                            <div>
                                                {extra ? <><b><IonText className="extra" color='danger'>{extra}</IonText></b><br /></> : null}
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>
                                                {
                                                    extra ?
                                                        extra.indexOf('|') != -1 ?
                                                            <>
                                                                <b><IonText className="extra">{extra.slice(0, extra.indexOf('|'))}</IonText></b><br />
                                                                <b><IonText className="extra" color='success'>{extra.slice(extra.indexOf('|') + 1, extra.length)}</IonText></b>
                                                            </>
                                                            :

                                                            extra == 'Leil Selijot' ?
                                                                <>
                                                                    <b><IonText className="extra">Primer dia Selijot Ashkenazim</IonText></b><br />
                                                                </>

                                                                :
                                                                extra == "Ta'anit Bejorot" ?
                                                                    <>
                                                                        <b><IonText className="extra">Ayuno Primogenitos</IonText></b><br />
                                                                    </>

                                                                    :
                                                                    <>
                                                                        <b><IonText className="extra">{extra}</IonText></b><br />
                                                                    </>
                                                        : null
                                                }
                                            </div>
                                        </>
                                    : null
                            }

                            <div>
                                {extra2 ? <><b><IonText className="extra small">{extra2}</IonText></b><br /></> : null}

                                <div>
                                    {
                                        props.a.Time ?
                                            props.a.Time.IsRoshChodesh ?
                                                <><b><IonText className="extra small">Halel Salteado</IonText></b></>

                                                : props.a.Time.IsCholHamoed && props.a.Time.Weekday != 'Shabbos' ?
                                                    <><b><IonText className="extra small" color='danger'>No se pone Tefilim</IonText></b><br /></>
                                                    : null
                                            : null
                                    }

                                    {
                                        extra ?
                                            props.a.Time ?
                                                (props.a.Time.ParshaAndHoliday == "חול המועד" || props.a.Time.ParshaAndHoliday == 'שביעי של פסח' || props.a.Time.ParshaAndHoliday == 'שמיני של פסח') && extra.includes('Pesaj') ?
                                                    <><b><IonText className="extra small">Halel Salteado</IonText></b></>
                                                    : null
                                                : null
                                            : null
                                    }
                                </div>
                            </div>

                            <div>
                                {
                                    extra ?
                                        props.a.Time ?
                                            props.a.Time.ParshaAndHoliday == 'סוכות' || props.a.Time.ParshaAndHoliday == 'שמיני עצרת' || props.a.Time.ParshaAndHoliday == 'שמחת תורה' || props.a.Time.ParshaAndHoliday == 'חנוכה' || extra == 'Pesaj 1' || extra == 'Pesaj 2' || extra.includes('Sukot') ?
                                                <><b><IonText className="extra small">Halel Completo</IonText></b><br /></>
                                                : null
                                            : null
                                        : null
                                }

                                {
                                    extra ?
                                        props.a.Time ?
                                            props.a.Time.Omer == 49 || extra == 'Sukot 6' ?
                                                <><b><IonText className="extra small">En la noche desvelada</IonText></b><br /></>
                                                : null
                                            : null
                                        : null
                                }

                                {
                                    extra ?
                                        props.a.Time ?
                                            extra.includes('Sukot') && !extra.includes('Erev') && props.a.Time.Weekday != 'Shabbos' ?
                                                <><b><IonText className="extra small" color='success'>Beraja de lulab</IonText></b><br /></>
                                                : null
                                            : null
                                        : null
                                }

                                {
                                    props.a.Time ?
                                        props.a.Time.ParshaAndHoliday == 'פורים' ?
                                            <><b><IonText className="extra small" color='success'>Lectura de Meguila</IonText></b><br /></>
                                            : props.a.Time.ParshaAndHoliday == 'תענית אסתר' ?
                                                <><b><IonText className="extra small" color='success'>En la noche lectura de Meguila</IonText></b><br /></>
                                                : null
                                        : null
                                }

                                {
                                    props.a.Time ?
                                        props.a.Time.ParshaAndHoliday == 'פורים' || props.a.Time.ParshaAndHoliday == 'חנוכה' ?
                                            <><b><IonText className="extra small">Al Hanisim</IonText></b> <br /></>
                                            : null
                                        : null
                                }

                                {
                                    props.a.Time ?
                                        (props.a.Time.ParshaAndHoliday == "חול המועד" || diceAnna) && props.a.Time.Weekday != 'Shabbos' && !props.a.Time.IsYomTov && !props.a.Time.IsRoshChodesh ?
                                            <><b><IonText className="extra small" color='danger'>No se dice Anna (tajanun)</IonText></b> <br /></>
                                            : null
                                        : null
                                }

                                {
                                    diceHamelej ?
                                        <><><b><IonText className="extra small" color='danger'>Hamelej Hakadosh</IonText></b> <br /></></>
                                        : null
                                }

                                {
                                    izcor ?
                                        <><><b><IonText className="extra small">Izcor</IonText></b></></>
                                        : null
                                }
                            </div>

                            <div>
                                {
                                    props.a.Time ?

                                        props.a.Time.TonightIsYomTov && props.a.Time.ParshaAndHoliday == "פסח" ?
                                            <>
                                                <IonText className="omer" color='success'>En la noche Omer {props.a.Time ? `${props.a.Time.Omer + 1}` : null}</IonText>
                                            </>

                                            : props.a.Time.Omer == 49 ?
                                                <>
                                                    <IonText className="omer">Omer {props.a.Time.Omer}</IonText>
                                                </>

                                                : props.a.Time.Omer >= 1 ?
                                                    <>
                                                        <IonText className="omer">Omer {props.a.Time.Omer}</IonText>
                                                        <br />
                                                        <IonText className="omer" color='success'>En la noche {props.a.Time ? `${props.a.Time.Omer + 1}` : null}</IonText>
                                                    </>

                                                    : null
                                        : null
                                }
                            </div>

                            {
                                props.a.Time ?
                                    props.a.Time.IsErevPesach ?
                                        <>
                                            <br />

                                            <h3>Horarios de Pesaj</h3>

                                            <div className='horariosPesaj ion-text-start horarios'>
                                                <IonText color='horasyo'>Fin de comer jametz</IonText>

                                                <br />

                                                {
                                                    verano ?
                                                        props.date.slice(5, 7) == '03' ? <> <IonText>{horariosPesajComer[props.date.slice(8, 10)].marzoVerano}</IonText> </> : <> <IonText>{horariosPesajComer[props.date.slice(8, 10)].abrilVerano}</IonText> </>
                                                        :
                                                        props.date.slice(5, 7) == '03' ? <> <IonText>{horariosPesajComer[props.date.slice(8, 10)].marzo}</IonText> </> : <> <IonText>{horariosPesajComer[props.date.slice(8, 10)].abril}</IonText> </>
                                                }

                                                <br /><br />

                                                <IonText color='horasyo'>Fin deshacerse y venta de jametz</IonText>

                                                <br />
                                                {
                                                    verano ?
                                                        props.date.slice(5, 7) == '03' ? <> <IonText>{horariosPesajVender[props.date.slice(8, 10)].marzoVerano}</IonText> </> : <> <IonText>{horariosPesajVender[props.date.slice(8, 10)].abrilVerano}</IonText> </>
                                                        :
                                                        props.date.slice(5, 7) == '03' ? <> <IonText>{horariosPesajVender[props.date.slice(8, 10)].marzo}</IonText> </> : <> <IonText>{horariosPesajVender[props.date.slice(8, 10)].abril}</IonText> </>
                                                }

                                                <br /><br />

                                                <IonText color='horasyo'>Jatzot (comer aficoman)</IonText>

                                                <br />

                                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.Midnight)}` : null}</IonText>
                                            </div>
                                        </>
                                        : null
                                    : null
                            }

                            <br />

                            <div className='ion-text-start horarios'>
                                <IonText color='horasyo'>Amanecer - Alot Hashajar</IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.Dawn72fix)}` : null}</IonText>

                                <br /><br />

                                {
                                    props.a.Time ?
                                        props.a.Time.IsFastDay ?
                                            <>
                                                <IonText className='big' color='danger'>Ayuno Comienza</IonText>
                                                <br />
                                                <IonText className='big'>{formatZman(props.a.Zman.Dawn72fix)}</IonText>

                                                <br /> <br />
                                            </>
                                            : null
                                        : null
                                }

                                <IonText color='horasyo'>Horario Talit y Tefilin </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.Yakir110)}` : null}</IonText>                                

                                <br /><br />

                                <IonText className='big' color='danger'>Salida del Sol </IonText>
                                {/* este q salga mas grande */}
                                <br />
                                <IonText className='big'>{props.a.Zman ? `${formatZman(props.a.Zman.SunriseLevel)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Fin Keriat Shema 1° </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.ShemaMA72fix)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Fin Keriat Shema 2° </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.ShemaGra)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Zman Tefila 1° </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.ShachrisMA72fix)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Zman Tefila 2° </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.ShachrisGra)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Medio Dia - Jatzot </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.Midday)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Minja Guedola </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.Mincha30fix)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Minja Ketana </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.KetanaGra)}` : null}</IonText>

                                <br /><br />

                                <IonText color='horasyo'>Plag Haminja </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.PlagGra)}` : null}</IonText>

                                <br /><br />

                                {
                                    props.a.Time ?
                                        props.a.Time.Weekday == 'Friday' ?
                                            <>
                                                <IonText className='big' color='danger'>Encendido Shabat </IonText>&#x1F56F;&#x1F56F;

                                                <br />

                                                <IonText className='big'>{candles}</IonText>

                                                <br /><br />
                                            </>

                                            : null
                                        : null
                                }

                                <IonText className='big' color='danger'>Puesta del Sol - Shekia </IonText>
                                <br />
                                <IonText className='big'>{props.a.Zman ? `${formatZman(props.a.Zman.SunsetLevel)}` : null}</IonText>

                                <br /><br />

                                {
                                    fastBegins ?
                                        <>
                                            <IonText className='big' color='danger'>Ayuno Comienza</IonText>

                                            <br />

                                            <IonText className='big'>{fastBegins}</IonText>

                                            <br /><br />
                                        </>
                                        : null
                                }

                                {
                                    fastEnds ?
                                        <>
                                            <IonText className='big' color='success'>Fin Ayuno 45 min</IonText>

                                            <br />

                                            <IonText className='big'>{habdala}</IonText>

                                            <br />

                                            {props.a.Zman ? <> <IonText className='small'>&#128073; Otras opiniones: {formatZman2(dayjs.tz(props.a.Zman.SunsetLevel, tzlookup(props.lat, props.long)).add(35, 'minute').$d.toString())} </IonText> <br /> </> : null}
                                            {props.a.Zman ? <> <IonText className='small'>&#128073; En caso de necesidad: {formatZman2(dayjs.tz(props.a.Zman.SunsetLevel, tzlookup(props.lat, props.long)).add(30, 'minute').$d.toString())} </IonText></> : null}

                                            <br /><br />
                                        </>
                                        : null
                                }

                                {
                                    props.a.Time ?
                                        props.a.Time.Weekday == 'Shabbos' ?
                                            <>
                                                <IonText className='big' color='success'>Fin Shabat 45 min</IonText>

                                                <br />

                                                <IonText className='big'>{habdala}</IonText>

                                                <br />

                                                <IonText> &#128073; Otras opiniones, 5 minutos menos</IonText>

                                                <br /><br />
                                            </>

                                            : null
                                        : null
                                }

                                {
                                    props.a.Time ?
                                        props.a.Time.Weekday != 'Shabbos' ?
                                            <>
                                                <IonText color='horasyo'>Salida de Estrellas - Tzet Hakojabim 45 min </IonText>

                                                <br />

                                                <IonText>{props.a.Zman ? `${formatZman2(dayjs.tz(props.a.Zman.SunsetLevel, tzlookup(props.lat, props.long)).add(45, 'minute').$d.toString())}` : null}</IonText>

                                                <br /><br />

                                                <IonText color='horasyo'>Rabenu Tam </IonText>

                                                <br />

                                                <IonText className='big'>{props.a.Zman ? `${formatZman(props.a.Zman.Night72fixLevel)}` : null}</IonText>

                                                <br /><br />
                                            </>

                                            :
                                            <>
                                                {/* <IonText color='success'>Salida de Estrellas - Tzet Hakojabim </IonText>

                                <br />

                                <IonText>{props.a.Zman ? `${props.a.Zman.NightChazonIsh.slice(11, 16)}` : null}</IonText>

                                <br /><br /> */}

                                                <IonText className='big' color='success'>Rabenu Tam </IonText>
                                                <br />
                                                <IonText className='big'>{props.a.Zman ? `${formatZman(props.a.Zman.Night72fixLevel)}` : null}</IonText>

                                                <br /><br />
                                            </>

                                        : null
                                }

                                <IonText color='horasyo'>Media Noche - Jatzot Laila </IonText>
                                <br />
                                <IonText>{props.a.Zman ? `${formatZman(props.a.Zman.Midnight)}` : null}</IonText>

                            </div>
                        </>
            }
        </>
    )
}




export default ZmanimView