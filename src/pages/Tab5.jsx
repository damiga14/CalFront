import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import './Tab5.css';
import axios from 'axios'
import Loading from '../components/Loading'
import Levana from '../components/Levana'

function Tab5() {
  let [cuantas, setCuantas] = useState([])
  let [levanaResponse2, setLevanaResponse2] = useState([])
  let [loading, setLoading] = useState(true)

  async function levanaCall() {
    axios.get(`${process.env.REACT_APP_BackURL}/api/v1/getLevana`)
      .then((response) => {
        setLevanaResponse2(response.data.data[0].json)
        setLoading(false)

        if (response.data.data[0].json.molad.length == 13) { setCuantas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) }
        else { setCuantas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) }
      })
      .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    levanaCall()
  }, [])

  return (
    <IonPage>
      <IonToolbar color='tertiary' className='ion-text-center'>
        <IonLabel className='titulo'>Calendario Ateret Yosef</IonLabel>
      </IonToolbar>

      <IonContent fullscreen color='background'>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <br /><br />

        <div className='backgrsoundColor'>
          <div className='ion-text-center ion-margin levanaTitle'>
            <IonText>Fechas y horarios de Bircat Halebana para el año en curso</IonText>
          </div>

          {loading ? <Loading /> : null}

          {
            cuantas.map((i) => {
              return <><Levana month={i} key={i} /> </>
            })
          }
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab5;
