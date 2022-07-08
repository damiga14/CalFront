import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';

import Cal from '../components/Cal'


// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';


function Tab1() {
  // const [value, onChange] = useState(new Date());

  // function dateClicked(value) {
  //   console.log(value)
  // }

  return (
    <IonPage>
      <IonToolbar color='tertiary' className='ion-text-center'>
        <IonLabel className='titulo'>Calendario Ateret Yosef</IonLabel>
      </IonToolbar>

      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <br /><br />

        {/* <Calendar
          onChange={onChange}
          value={value}
          calendarType='Hebrew'
          onClickDay={dateClicked(value)}
        /> */}

        <Cal />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
