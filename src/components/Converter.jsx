import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IonText, IonDatetime, IonLabel, IonIcon, IonItem, IonButton, IonSelect, IonSelectOption, IonSegment, IonSegmentButton } from '@ionic/react'
import axios from 'axios'
import Loading from './Loading'
import { calendarOutline, swapVerticalOutline, calendarNumberOutline } from "ionicons/icons";
import './Converter.css'

let meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function Converter() {
    let mes = (new Date().getMonth() + 1).toString()
    let dia = new Date().getDate().toString()
    if (new Date().getMonth().toString().length < 2) { mes = '0' + mes }
    if (new Date().getDate().toString().length < 2) { dia = '0' + dia }
    let [selectedDateBar, setSelectedDateBar] = useState(`${new Date().getFullYear()}-${mes}-${dia}`)
    let [barMitzvaResult, setBarMitzvaResult] = useState(``)
    let [selectedDateYor, setSelectedDateYor] = useState(`${new Date().getFullYear()}-${mes}-${dia}`)
    let [yorResult, setYorResult] = useState(``)
    let [loading, setLoading] = useState(false)
    let [loading2, setLoading2] = useState(false)
    let [select, setSelect] = useState("spa")
    let [yearHebrew, setYearHebrew] = useState([]);
    let [dayHebrew, setDayHebrew] = useState([]);
    let [mesHebreo, setMesHebreo] = useState();
    let [anioHebreo, setAnioHebreo] = useState();
    let [diaHebreo, setDiaHebreo] = useState();

    function btnBar() {
        setLoading(true)

        axios.get(`https://www.hebcal.com/converter?cfg=json&gy=${selectedDateBar.split('-')[0]}&gm=${selectedDateBar.split('-')[1]}&gd=${selectedDateBar.split('-')[2]}&g2h=1`)
            .then((response) => {
                response.data.hy += 13

                axios.get(`https://www.hebcal.com/converter?cfg=json&hy=${response.data.hy}&hm=${response.data.hm}&hd=${response.data.hd}&h2g=1`)
                    .then((response) => {
                        setBarMitzvaResult(`${response.data.gd} de ${meses[response.data.gm]} de ${response.data.gy}`)

                        setLoading(false)
                    })
                    .catch((err) => { console.log(err) })

            })
            .catch((err) => { console.log(err) })
    }

    function btnYorSpa() {
        let afterSunset = 'off'
        let result = []
        setLoading2(true)

        axios.get(`https://www.hebcal.com/yahrzeit?cfg=json&v=yahrzeit&years=10&hebdate=on&t1=Yahrzeit&d1=${selectedDateYor.split('-')[2]}&m1=${selectedDateYor.split('-')[1]}&y1=${selectedDateYor.split('-')[0]}&s1=${afterSunset}`)
            .then((response) => {
                for (let i in response.data.items) {
                    result.push(`${response.data.items[i].date.split('-')[2]} de ${meses[Number(response.data.items[i].date.split('-')[1])]} de ${response.data.items[i].date.split('-')[0]}`)

                    setYorResult(result)
                }

                setLoading2(false)
            })
            .catch((err) => { console.log(err) })
    }

    function btnYorHeb() {
        let afterSunset = 'off'
        let result = []
        setLoading2(true)

        if (mesHebreo.length < 2) { mesHebreo = '0' + mesHebreo }
        if (diaHebreo.length < 2) { diaHebreo = '0' + diaHebreo }

        axios.get(`https://www.hebcal.com/converter?cfg=json&hy=${anioHebreo}&hm=${mesHebreo}&hd=${diaHebreo}&h2g=1&strict=1`)
            .then((response) => {
                axios.get(`https://www.hebcal.com/yahrzeit?cfg=json&v=yahrzeit&years=10&hebdate=on&t1=Yahrzeit&d1=${response.data.gd}&m1=${response.data.gm}&y1=${response.data.gy}&s1=${afterSunset}`)
                    .then((response) => {
                        for (let i in response.data.items) {
                            result.push(`${response.data.items[i].date.split('-')[2]} de ${meses[Number(response.data.items[i].date.split('-')[1])]} de ${response.data.items[i].date.split('-')[0]}`)

                            setYorResult(result)
                        }

                        setLoading2(false)
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }

    useLayoutEffect(() => {
        let yh = [];
        let dh = [];

        for (let i = 5660; i < 5860; i++) { yh.push(i) }
        for (let i = 1; i < 31; i++) { dh.push(i) }

        setDayHebrew(dh);
        setYearHebrew(yh);
    }, [])

    return (
        <>
            <div className='ion-text-center ion-margin'>
                <h3>Convertidor para Bar Mitzva y Yortzait</h3>
            </div>

            <br /><br />

            <div className='center'>
                <h1 align='center'>Bar Mitzva</h1>
                <p>Selecciona tu fecha de nacimiento para calcular tu fecha de Bar Mitzva</p>
            </div>

            <div className='wrapper'>
                <div className='selector'>
                    <IonLabel><IonIcon icon={calendarOutline}></IonIcon></IonLabel>
                    <IonDatetime min="1900-01-01" max="2999-12-31" value={selectedDateBar} onIonChange={e => setSelectedDateBar(e.detail.value)}></IonDatetime>
                </div>
                <IonButton onClick={btnBar} fill='outline' >Calcular</IonButton>
            </div>

            <br /><br />

            {
                loading ?
                    <><Loading /></>
                    :
                    <>
                        {
                            barMitzvaResult != '' ?
                                <>
                                    <div className='center ion-text-center lineUp'>
                                        <b><IonText>Tu Bar Mitzva sera el:</IonText></b>

                                        <br />

                                        <IonText>{barMitzvaResult}</IonText>
                                    </div>
                                </>
                                : null
                        }
                    </>
            }

            <IonItem></IonItem><br /><br />

            <div className='center'>
                <h1 align='center'>Yortzait - Aniversario</h1>
                <p>Selecciona la fecha de yortzait para calcular los proximos 10 años de aniversarios</p>
            </div>

            <IonSegment value={select} onIonChange={(e) => { setSelect(e.target.value) }}>
                <IonSegmentButton value="spa">espanol</IonSegmentButton>
                <IonSegmentButton value="heb">Hebreo</IonSegmentButton>
            </IonSegment>

            <br />

            {
                select == "spa" ?
                    <>
                        <div className='wrapper'>
                            <div className='selector'>
                                <IonLabel><IonIcon icon={calendarOutline}></IonIcon></IonLabel>
                                <IonDatetime min="1900-01-01" max="2999-12-31" value={selectedDateYor} onIonChange={e => setSelectedDateYor(e.detail.value)}></IonDatetime>
                            </div>

                            <IonButton onClick={btnYorSpa} fill='outline' >Calcular</IonButton>
                        </div>
                    </>
                    :
                    <>
                        <div className='wrapper2'>
                            <IonLabel color="primary" className='minimo'>Dia</IonLabel>
                            <IonSelect className='minimo' value={diaHebreo} interface="popover" onIonChange={(e) => { setDiaHebreo(e.target.value) }}>
                                {dayHebrew.map((item, i) => (<IonSelectOption key={i}>{item}</IonSelectOption>))}
                            </IonSelect>

                            <IonLabel color="primary" className='minimo'>Mes</IonLabel>
                            <IonSelect className='minimo' value={mesHebreo} interface="popover" onIonChange={(e) => { setMesHebreo(e.target.value) }}>
                                <IonSelectOption value="Tishrei">Tishre</IonSelectOption>
                                <IonSelectOption value="Cheshvan">Jeshvan</IonSelectOption>
                                <IonSelectOption value="Kislev">Kislev</IonSelectOption>
                                <IonSelectOption value="Tevet">Tebet</IonSelectOption>
                                <IonSelectOption value="Shvat">Shebat</IonSelectOption>
                                <IonSelectOption value="Adar">Adar 1</IonSelectOption>
                                <IonSelectOption value="Adar2">Adar 2</IonSelectOption>
                                <IonSelectOption value="Nisan">Nisan</IonSelectOption>
                                <IonSelectOption value="Sivan">Sivan</IonSelectOption>
                                <IonSelectOption value="Iyyar">Iyar</IonSelectOption>
                                <IonSelectOption value="Tamuz">Tamuz</IonSelectOption>
                                <IonSelectOption value="Av">Av</IonSelectOption>
                                <IonSelectOption value="Elul">Elul</IonSelectOption>
                            </IonSelect>

                            <IonLabel color="primary" className='minimo'>Año</IonLabel>
                            <IonSelect className='minimo' value={anioHebreo} interface="popover" onIonChange={(e) => { setAnioHebreo(e.target.value) }}>
                                {yearHebrew.map((item, i) => (<IonSelectOption key={i}>{item}</IonSelectOption>))}
                            </IonSelect>

                            <IonButton onClick={btnYorHeb} fill='outline' >Calcular</IonButton>
                        </div>
                    </>
            }

            <br />

            {
                loading2 ?
                    <><Loading /></>
                    :
                    <>
                        {
                            yorResult != '' ?
                                <>
                                    <div className='center ion-text-center lineUp'>
                                        <b><IonText>Aniversarios:</IonText></b>

                                        <br />

                                        {
                                            yorResult.map((item) => {
                                                return <>
                                                    <IonText>{item}</IonText> <br />
                                                </>
                                            })
                                        }
                                    </div>
                                </>
                                : null
                        }

                        <br /><br />
                    </>
            }

        </>
    )
}

export default Converter