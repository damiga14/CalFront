import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import './Levana.css'
import Loading from '../components/Loading'

function Levana(props) {
    let [levanaResponse, setLevanaResponse] = useState([])
    // let [cual, setCual] = useState(0)
    let [cual, setCual] = useState({})
    let [loading, setLoading] = useState(true)

    function levanaCall() {
        axios.get(`${process.env.REACT_APP_BackURL}/api/v1/getLevana`)
            .then((response) => {
                // setLevanaResponse(response.data.data[0].json); setLoading(false)

                for (let i in response) {
                    if (response[i].monthEspanol == props.monthName && response[i].year == props.year) {
                        setLevanaResponse(response[i])
                        setLoading(false)
                    }
                }
            })
            .catch((err) => { console.log(err) })
    }

    useLayoutEffect(() => {
        levanaCall()

        // if (props.month) {
        //     setCual(props.month)
        // }
        // else {
        //     switch (props.nombre) {
        //         case 'Enero':
        //             setCual(4)
        //             break;
        //         case 'Febrero':
        //             setCual(5)
        //             break;
        //         case 'Marzo':
        //             setCual(6)
        //             break;
        //         case 'Abril':
        //             setCual(7)
        //             break;
        //         case 'Mayo':
        //             setCual(8)
        //             break;
        //         case 'Junio':
        //             setCual(9)
        //             break;
        //         case 'Julio':
        //             setCual(10)
        //             break;
        //         case 'Agosto':
        //             setCual(11)
        //             break;
        //         case 'Septiembre':
        //             setCual(0)
        //             break;
        //         case 'Octubre':
        //             setCual(1)
        //             break;
        //         case 'Noviembre':
        //             setCual(2)
        //             break;
        //         case 'Diciembre':
        //             setCual(3)
        //             break;
        //         default:
        //             break;
        //     }
        // }
    }, [])

    return (
        <div key={props.key}>

            <IonCard>
                <IonCardContent className='levanaCard'>

                    {loading ? <Loading /> : null}

                    {
                        levanaResponse.molad ?
                            <>
                                <div className='levanaCard ion-text-center'>
                                    {
                                        props.title ?
                                            <>
                                                {/* <IonText color='horasyo' className='big'>Bircat Halebana Jodesh {levanaResponse.molad[cual].month}</IonText> */}
                                                <IonText color='horasyo' className='big'>Bircat Halebana Jodesh {levanaResponse.monthHeb}</IonText>
                                            </>

                                            :
                                            <>
                                                {/* <IonText color='horasyo' className='big'>{levanaResponse.molad[cual].month}</IonText> */}
                                                <IonText color='horasyo' className='big'>{levanaResponse.monthHeb}</IonText>
                                            </>
                                    }
                                </div>

                                <br />

                                {/* <b>Molad Israel:</b> {levanaResponse.molad[cual].date} {levanaResponse.molad[cual].time} */}
                                <b>Molad Israel:</b> {levanaResponse.molad}

                                <br /><br />

                                {/* <b>Comienza:</b> {levanaResponse.comienza[cual].time} */}
                                <b>Comienza:</b> {levanaResponse.comienza}

                                <br /><br />

                                {
                                    // levanaResponse.termina[cual].bediabad ?
                                    levanaResponse.termina.bediabad != null ?
                                        <>
                                            {/* <b>Termina Lejatejila:</b> {levanaResponse.termina[cual].lejatjila} */}
                                            <b>Termina Lejatejila:</b> {levanaResponse.termina.lejatjila}

                                            <br /><br />

                                            {/* <b>Termina Bediabad:</b> {levanaResponse.termina[cual].bediabad} */}
                                            <b>Termina Bediabad:</b> {levanaResponse.termina.bediabad}

                                            <br />
                                        </>

                                        :
                                        <>
                                            {/* <b>Termina:</b> {levanaResponse.termina[cual].lejatjila} */}
                                            <b>Termina:</b> {levanaResponse.termina.lejatjila}

                                            <br />
                                        </>
                                }

                                {/* <IonItem color='transparent' lines='none'></IonItem> */}

                            </>
                            : null
                    }

                </IonCardContent>
            </IonCard>
        </div>
    )
}

export default Levana