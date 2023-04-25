import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import './Jaguim.css'

// https://www.hebcal.com/holidays/


let months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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

    // useEffect(() => {
    //     if (jaguimMayores.length > 0) {
    //         for (let i in jaguimMayores) {
    //             console.log(jaguimMayores[i].title)
    //         }
    //     }
    // }, [jaguimMayores])

    // useEffect(() => {
    //     if (jaguimMenores.length > 0) {
    //         for (let i in jaguimMenores) {
    //             console.log(jaguimMenores[i].title)
    //         }
    //     }
    // }, [jaguimMenores])

    useEffect(() => {
        if (acabo) {
            let temp1 = jaguimMayores
            let temp2 = jaguimMenores
            let temp3 = ayunos

            for (let i in temp1) {
                // console.log(temp1[i])
                if (temp1[i].title.includes('Erev')) { temp1[i].title = temp1[i].title.replace('Erev', 'Vispera') }
                if (temp1[i].title == 'Simját Torá') { temp1[i].title = temp1[i].title = 'Shemini Atzeret' }
                if (temp1[i].title == 'Janucá: 1 vela') { temp1[i].date = temp1[i].date.slice(0, temp1[i].date.indexOf('T')) }
            }

            temp2 = temp2.filter((item) => { return item.title != 'Rosh Hashana LaBehemot' && item.title != 'Leil Selijot' && item.title != 'Chag HaBanot' })

            for (let i in temp3) {
                if (temp3[i].memo.includes('Erev')) { temp3[i].memo = temp3[i].memo.replace('Erev', 'Vispera') }
                if (temp3[i].memo.includes('Tzom Tammuz')) { temp3[i].memo = temp3[i].memo.replace('Tzom', '17 de ') }
                temp3[i].date = temp3[i].date.slice(0, temp3[i].date.indexOf('T'))
            }

            setJaguimMayores(temp1)
            setJaguimMenores(temp2)
            setAyunos(temp3)
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
                                            {
                                                item.title == 'Purim' || item.title == 'Vispera Pesaj' || item.title == 'Vispera Shavuot' || item.title == 'Vispera Tisha BAv' || item.title == 'Vispera Rosh Hashana' || item.title == 'Vispera Yom Kippur' || item.title == 'Vispera Sukot' || item.title == 'Shmini Atzeret' || item.title == 'Simját Torá' || item.title == 'Janucá: 1 vela' ?
                                                    <>
                                                        <tr>
                                                            {/* <td className='left'>{item.title}</td> */}
                                                            <td className='left' style={{ fontSize: item.title.length >= 18 ? '1rem' : '1.2rem' }}>{item.title}</td>
                                                            <td className='right' style={{ fontSize: item.title.length >= 18 ? '1rem' : '1.2rem' }}>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[0]}`}</td>
                                                        </tr>

                                                        {/* <div className='fiestas'>
                                                            <p>{item.title}</p>
                                                            <p>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[1]}`}</p>
                                                        </div> */}
                                                    </>
                                                    : null
                                            }
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
                                                <td className='left'>{item.title}</td>
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
                                                <td className='left'>{item.memo}</td>
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