import React, { useLayoutEffect, useState } from 'react'
import { IonContent, IonIcon, IonPage, useIonViewDidEnter, IonHeader, IonButton, IonToolbar, IonTitle, IonLabel, IonButtons, IonSearchbar, IonSegmentButton, IonSegment, IonItem, IonText, IonToggle, } from "@ionic/react";
import { useHistory } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import './Splash.css'

function Splash() {
    const history = useHistory();
    let [donador, setDonador] = useState()

    let [display, setDisplay] = useState()
    let [motive, setMotive] = useState()
    let [name, setName] = useState()

    useLayoutEffect(() => {
        axios.get(`https://calateret.herokuapp.com/api/v1/donadores`)
            .then((response) => {
                setDonador(response.data.data[0])
                setDisplay(response.data.data[0].display)
                setMotive(response.data.data[0].motive)
                setName(response.data.data[0].name)
            })
            .catch((err) => { console.log(err) })
    }, [])

    useIonViewDidEnter(() => {
        const tabBar = document.getElementById('myTabBar');
        tabBar.style.display = 'none';

        setTimeout(() => {
            history.push('/tab1')
        }, 5000);
    })

    return (
        <>
            <IonPage>
                <IonContent>
                    <div className='logoSplash fuenteSplash ion-text-center'>
                        <img src={logo} alt="" width={'80%'} />

                        <br /><br /><br />

                        <IonText className='textSplash'>Calendario Ateret Yosef</IonText>

                        {
                            display ?
                                <>
                                    <br /><br /><br />

                                    <IonText className='textSplashChico lineUp1'>{motive}</IonText>
                                    <br />
                                    <IonText className='textSplash lineUp2'>{name}</IonText>
                                </>
                                : null
                        }
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Splash