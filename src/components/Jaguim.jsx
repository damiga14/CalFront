import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import './Jaguim.css'


// https://www.hebcal.com/holidays/

let months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function Jaguim() {
    // let [jaguim, setJaguim] = useState([])
    let [jaguimMayores, setJaguimMayores] = useState([])
    let [jaguimMenores, setJaguimMenores] = useState([])

    useLayoutEffect(() => {
        axios.get('https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=off&geo=geoname&geonameid=3530597&M=off&s=off&lg=es')
            .then((response) => {
                let temp1 = []
                let temp2 = []

                for (let i in response.data.items) {
                    if (response.data.items[i].category != 'candles') {
                        if (response.data.items[i].category != 'havdalah') {
                            if (response.data.items[i].category != 'zmanim') {

                                if (response.data.items[i].subcat == 'major') { temp1.push(response.data.items[i]) }
                                if (response.data.items[i].subcat == 'minor') { temp2.push(response.data.items[i]) }
                            }
                        }
                    }

                    if (Number(i) + 1 == response.data.items.length) {
                        setJaguimMayores(temp1)
                        setJaguimMenores(temp2)
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


    return (
        <>
            <br /><br />

            <p className='title' style={{ color: 'cornflowerblue' }}>Fiestas Mayores</p>

            <br /><br />

            {
                jaguimMayores.length > 0 ?
                    <>
                        {
                            jaguimMayores.map((item) => {
                                return (
                                    <>
                                        {
                                            item.title == 'Purim' || item.title == 'Erev Pesaj' || item.title == 'Erev Shavuot' || item.title == 'Erev Tisha BAv' || item.title == 'Erev Rosh Hashana' || item.title == 'Erev Yom Kippur' || item.title == 'Erev Sukot' || item.title == 'Shmini Atzeret' || item.title == 'Simját Torá' || item.title == 'Janucá: 1 vela' ?
                                                <>
                                                    <div className='fiestas'>
                                                        <p>{item.title}</p>
                                                        <p>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[1]}`}</p>
                                                    </div>
                                                </>
                                                : null
                                        }
                                    </>
                                )
                            })
                        }
                    </>
                    : null
            }

            <br /><br />

            <p className='title' style={{ color: 'orange' }}>Fiestas Menores</p>

            <br /><br />

            {
                jaguimMenores.length > 0 ?
                    <>
                        {
                            jaguimMenores.map((item) => {
                                return (
                                    <>
                                        <div className='fiestas'>
                                            <p>{item.title}</p>
                                            <p>{`${Number(item.date.split('-')[2])} de ${months[Number(item.date.split('-')[1])]} ${item.date.split('-')[1]}`}</p>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </>
                    : null
            }

            <br /><br /><br />
        </>
    )
}

export default Jaguim