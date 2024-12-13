import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import './Jaguim.css'

// https://www.hebcal.com/holidays/


// let months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
let months = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function Jaguim() {
    // let [jaguim, setJaguim] = useState([])
    let [acabo, setAcabo] = useState(false)
    let [jaguimMayores, setJaguimMayores] = useState([])
    let [jaguimMenores, setJaguimMenores] = useState([])
    let [ayunos, setAyunos] = useState([])

    useLayoutEffect(() => {
        axios.get('https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=off&nx=off&year=now&month=x&ss=off&mf=on&c=off&geo=geoname&geonameid=3530597&M=off&s=off&lg=es')
            .then((response) => {
                let temp1 = []
                let temp2 = []
                let temp3 = []

                for (let i in response.data.items) {

                    if (response.data.items[i].category != 'candles') {
                        if (response.data.items[i].category != 'havdalah') {
                            if (response.data.items[i].category != 'zmanim') {
                                if (response.data.items[i].subcat == 'major') { temp1.push(response.data.items[i]) }
                                if (response.data.items[i].subcat == 'minor') { temp2.push(response.data.items[i]) }
                            }

                            else {
                                // ayunos
                                if (response.data.items[i].title_orig == 'Fast begins') { temp3.push(response.data.items[i]) }
                            }
                        }
                    }

                    if (Number(i) + 1 == response.data.items.length) {
                        setJaguimMayores(temp1)
                        setJaguimMenores(temp2)
                        setAyunos(temp3)
                        setAcabo(true)
                    }
                }
            })
            .catch((err) => { console.log(err) })
    }, [])

    useEffect(() => {
        if (acabo) {
            let temp1 = jaguimMayores
            let temp2 = jaguimMenores
            let temp3 = ayunos

            let temp1Final = []
            let temp3Final = []

            for (let i in temp1) {
                if (temp1[i].title.includes('Erev')) { temp1[i].title = temp1[i].title.replace('Erev', 'Vispera') }
                if (temp1[i].title == 'Simját Torá') { temp1[i].title = temp1[i].title = 'Shemini Atzeret' }
                if (temp1[i].title == 'Janucá: 1 vela') { temp1[i].date = temp1[i].date.slice(0, temp1[i].date.indexOf('T')) }
                if (temp1[i].title.includes('Rosh') && temp1[i].hdate.includes('1 Tishrei')) { temp1[i].title = 'Rosh Hashana 1er día' }
                if (temp1[i].title == 'Rosh Hashana II') { temp1[i].title = 'Rosh Hashana 2do día' }
                if (temp1[i].title == 'Vispera Yom Kippur') { temp1[i].title = 'Vispera Yom Kipur' }
                if (temp1[i].title == 'Yom Kippur') { temp1[i].title = 'Yom Kipur' }
                if (temp1[i].title == "Sukot I") { temp1[i].title = 'Sukot 1er día' }
                if (temp1[i].title == "Sukot II") { temp1[i].title = 'Sukot 2do día' }
                if (temp1[i].title == "Sukot VII (Hoshana Raba)") { temp1[i].title = 'Vispera Shemini Atzeret' }
                if (temp1[i].title == "Shemini Atzeret") { temp1[i].title = 'Simjat Tora' }
                if (temp1[i].title == "Shmini Atzeret") { temp1[i].title = 'Shemini Atzeret' }
                if (temp1[i].title == "Janucá: 1 vela") { temp1[i].title = 'Januca 1era vela' }
                if (temp1[i].title == "Pésaj I") { temp1[i].title = 'Pesaj 1er día' }
                if (temp1[i].title == "Pésaj II") { temp1[i].title = 'Pesaj 2do día' }
                if (temp1[i].title == "Pésaj VII") { temp1[i].title = 'Pesaj 7mo día' }
                if (temp1[i].title == "Pésaj VIII") { temp1[i].title = 'Pesaj 8vo día' }
            }

            for (let i in temp3) {
                if (temp3[i].memo.includes('Erev')) { temp3[i].memo = temp3[i].memo.replace('Erev', 'Vispera') }
                if (temp3[i].memo.includes('Gedaliah')) { temp3[i].memo = temp3[i].memo.replace('Gedaliah', 'Guedalia') }
                if (temp3[i].memo.includes('Tzom Tammuz')) { temp3[i].memo = temp3[i].memo.replace('Tzom', '17 de ') }
                temp3[i].date = temp3[i].date.slice(0, temp3[i].date.indexOf('T'))
            }

            // orden mayores
            for (let i in temp1) { if (temp1[i].title == "Vispera Rosh Hashana") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Rosh Hashana 1er día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Rosh Hashana 2do día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Vispera Yom Kipur") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Yom Kipur") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Vispera Sukot") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Sukot 1er día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Sukot 2do día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Vispera Shemini Atzeret") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Shemini Atzeret") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Simjat Tora") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Januca 1era vela") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Vispera Purim") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Purim") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Vispera Pesaj") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Pesaj 1er día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Pesaj 2do día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Pesaj 7mo día") { temp1Final.push(temp1[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Pesaj 8vo día") { temp1Final.push(temp1[i]) } }

            // orden menores, ya vienen bien
            temp2 = temp2.filter((item) => { return item.title != 'Rosh Hashana LaBehemot' && item.title != 'Leil Selijot' && item.title != 'Chag HaBanot' && item.title != 'Shushan Purim' && item.title != 'Janucá: 8º día' })

            // orden ayunos
            for (let i in temp3) { if (temp3[i].memo.includes("Tzom Guedalia")) { temp3Final.push(temp3[i]) } }
            for (let i in temp3) { if (temp3[i].memo.includes("Asara B'Tevet")) { if (Number(temp3[i].date.split('-')[1]) < 10) { temp3Final.push(temp3[i]) } } }
            for (let i in temp3) { if (temp3[i].memo.includes("Ta'anit Ester")) { temp3Final.push(temp3[i]) } }
            for (let i in temp3) { if (temp3[i].memo.includes("Ta'anit Bejorot")) { temp3Final.push(temp3[i]) } }
            for (let i in temp3) { if (temp3[i].memo.includes("17 de  Tammuz")) { temp3Final.push(temp3[i]) } }
            for (let i in temp3) { if (temp3[i].memo.includes("Vispera Tish'a B'Av")) { temp3Final.push(temp3[i]) } }
            for (let i in temp1) { if (temp1[i].title == "Tish'a B'Av") { temp3Final.push({ date: `${temp1[i].date}`, memo: `${temp1[i].title}` }) } }
            for (let i in temp3) { if (temp3[i].memo.includes("Asara B'Tevet")) { if (Number(temp3[i].date.split('-')[1]) > 10) { temp3Final.push(temp3[i]) } } }

            setJaguimMayores(temp1Final)
            setJaguimMenores(temp2)
            setAyunos(temp3Final)
        }
    }, [acabo])

    return (
        <>
            <br /><br />

            <p className='title' style={{ color: 'cornflowerblue' }}>Fiestas Mayores</p>

            <br /><br />

            {
                jaguimMayores.length > 0 ?
                    <>
                        <table className='tabla'>
                            {
                                jaguimMayores.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                {/* <td className='left'>{item.title}</td> */}
                                                <td className='left' style={{ fontSize: item.title.length >= 17 ? '0.9rem' : '1.2rem' }}>{item.title}</td>
                                                {/* <td className='right' style={{ fontSize: item.title.length >= 17 || months[Number(item.date.split('-')[1])].length >= 7 ? '0.9rem' : '1.2rem' }}>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td> */}
                                                <td className='right'>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </table>
                    </>
                    : null
            }

            <br /><br />

            <p className='title' style={{ color: 'orange' }}>Fiestas Menores</p>

            <br /><br />

            {
                jaguimMenores.length > 0 ?
                    <>
                        <table className='tabla'>
                            {
                                jaguimMenores.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='left' style={{ fontSize: item.title.length >= 17 ? '0.9rem' : '1.2rem' }}>{item.title}</td>
                                                {/* <td className='right' style={{ fontSize: item.title.length >= 17 || months[Number(item.date.split('-')[1])].length >= 7 ? '0.9rem' : '1.2rem' }}>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td>                                                 */}
                                                <td className='right'>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td>
                                            </tr>
                                            {/* <div className='fiestas'>
                                                <p>{item.title}</p>
                                                <p>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[1]}`}</p>
                                            </div> */}
                                        </>
                                    )
                                })
                            }
                        </table>
                    </>
                    : null
            }

            <br /><br />

            <p className='title' style={{ color: 'purple' }}>Ayunos</p>

            <br /><br />

            {
                ayunos.length > 0 ?
                    <>
                        <table className='tabla'>
                            {
                                ayunos.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='left' style={{ fontSize: item.memo.length >= 17 ? '0.9rem' : '1.2rem' }}>{item.memo}</td>
                                                {/* <td className='right' style={{ fontSize: item.memo.length >= 17 || months[Number(item.date.split('-')[1])].length >= 7 ? '0.9rem' : '1.2rem' }}>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td> */}
                                                <td className='right'>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td>
                                            </tr>
                                            {/* <div className='fiestas'>
                                                <p>{item.title}</p>
                                                <p>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[1]}`}</p>
                                            </div> */}
                                        </>
                                    )
                                })
                            }
                        </table>
                    </>
                    : null
            }

            <br /><br /><br />
        </>
    )
}

export default Jaguim