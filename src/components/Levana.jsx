import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import './Levana.css'
import Loading from '../components/Loading'

function Levana(props) {
    let [levanaResponse, setLevanaResponse] = useState([])
    let [cual, setCual] = useState(0)
    let [loading, setLoading] = useState(true)

    async function levanaCall() {
        axios.get(`https://app-tahara.herokuapp.com/api/v1/getLevana`)
            .then((response) => { setLevanaResponse(response.data.data[0].json); setLoading(false) })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {
        levanaCall()

        if (props.month) {
            setCual(props.month)
        }
        else {
            switch (props.nombre) {
                case 'Enero':
                    setCual(4)
                    break;
                case 'Febrero':
                    setCual(5)
                    break;
                case 'Marzo':
                    setCual(6)
                    break;
                case 'Abril':
                    setCual(7)
                    break;
                case 'Mayo':
                    setCual(8)
                    break;
                case 'Junio':
                    setCual(9)
                    break;
                case 'Julio':
                    setCual(10)
                    break;
                case 'Agosto':
                    setCual(11)
                    break;
                case 'Septiembre':
                    setCual(0)
                    break;
                case 'Octubre':
                    setCual(1)
                    break;
                case 'Noviembre':
                    setCual(2)
                    break;
                case 'Diciembre':
                    setCual(3)
                    break;
                default:
                    break;
            }
        }
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
                                                <IonText color='horasyo' className='big'>Bircat Halebana Jodesh {levanaResponse.molad[cual].month}</IonText>
                                            </>
                                            :
                                            <>
                                                <IonText color='horasyo' className='big'>{levanaResponse.molad[cual].month}</IonText>
                                            </>
                                    }
                                </div>

                                <br />

                                <b>Molad Israel:</b> {levanaResponse.molad[cual].date} {levanaResponse.molad[cual].time}

                                <br /><br />

                                <b>Comienza:</b> {levanaResponse.comienza[cual].time}

                                <br /><br />

                                {
                                    levanaResponse.termina[cual].bediabad ?
                                        <>
                                            <b>Termina Lejatejila:</b> {levanaResponse.termina[cual].lejatjila}

                                            <br /><br />

                                            <b>Termina Bediabad:</b> {levanaResponse.termina[cual].bediabad}

                                            <br />
                                        </>
                                        :
                                        <>
                                            <b>Termina:</b> {levanaResponse.termina[cual].lejatjila}

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