import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import './Jaguim.css'

function Jaguim() {
    let [jaguim, setJaguim] = useState([])

    useLayoutEffect(() => {
        axios.get('https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=off&geo=geoname&geonameid=3530597&M=off&s=off&lg=es')
            .then((response) => {
                let temp = []

                for (let i in response.data.items) {
                    if (response.data.items[i].category != 'candles') {
                        if (response.data.items[i].category != 'havdalah') {
                            temp.push(response.data.items[i])
                        }
                    }

                    if (Number(i) + 1 == response.data.items.length) {
                        setJaguim(temp)
                    }
                }
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <>

            {
                jaguim.length > 0 ?
                    <>
                        {
                            jaguim.map((item) => {
                                return (
                                    <>
                                        {item.title} {item.date}
                                        <br />
                                    </>
                                )
                            })
                        }
                    </>
                    : null
            }
        </>
    )
}

export default Jaguim