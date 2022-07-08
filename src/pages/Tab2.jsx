import React, { useEffect, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonIcon, IonButton } from '@ionic/react';
import { calendarOutline, swapVerticalOutline, calendarNumberOutline } from "ionicons/icons";
import './Tab2.css';

import Cal2 from '../components/Cal2'

// import SimpleMaps from '../components/SimpleMaps.json'

function Tab2() {
  let mes = (new Date().getMonth() + 1).toString()
  let dia = new Date().getDate().toString()
  if (new Date().getMonth().toString().length < 2) { mes = '0' + mes }
  if (new Date().getDate().toString().length < 2) { dia = '0' + dia }
  let [datePicked, setDatePicked] = useState(`${new Date().getFullYear()}-${mes}-${dia}`)
  // let [datePicked, setDatePicked] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
  let [dateForCal, setDateForCal] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
  let [cal, setCal] = useState()

  function repaint() {
    if (cal) { setCal(); setTimeout(() => { setCal(<><Cal2 propFecha={dateForCal} /></>) }, 100) }
    else { setCal(<><Cal2 propFecha={dateForCal} /></>) }
  }

  function setToday() {
    // setDatePicked(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)

    setDatePicked(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
  }

  // useEffect(() => {
  //   for(let i in SimpleMaps){

  //   }
  // }, [])

  return (
    <IonPage>
      <IonToolbar color='tertiary' className='ion-text-center'>
        <IonLabel className='titulo'>Calendario Ateret Yosef</IonLabel>
      </IonToolbar>

      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Convertidor Fechas</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <br />

        <div className='center'>
          <h1 align='center'>Buscador de fechas</h1>
        </div>

        <br />

        <div className='wrapper'>
          <div className='selector'>
            <IonLabel><IonIcon icon={calendarOutline}></IonIcon></IonLabel>
            {/* <IonDatetime min="1900-01-01" max="2999-12-31" value={datePicked} onIonChange={e => setDatePicked(e.detail.value)}></IonDatetime> */}
            <IonDatetime min="1900-01-01" max="2999-12-31" value={datePicked} onIonChange={e => {
              // setDatePicked(new Date(Number(e.detail.value.slice(0, 4)), Number(e.detail.value.slice(5, 7)) - 1, Number(e.detail.value.slice(8, 10))))
              setDateForCal(new Date(Number(e.detail.value.slice(0, 4)), Number(e.detail.value.slice(5, 7) - 1), Number(e.detail.value.slice(8, 10))))
              setDatePicked(e.detail.value)
            }
            }></IonDatetime>
          </div>
          {/* <IonButton fill='outline' onClick={setToday}>Hoy<IonIcon icon={calendarNumberOutline}></IonIcon></IonButton> */}
          <IonButton onClick={repaint} fill='outline'>Buscar Fecha</IonButton>
        </div>

        {cal}

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
