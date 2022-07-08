import { IonContent, IonHeader, IonPage, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

import Converter from '../components/Converter.jsx'


function Tab3() {
  return (
    <IonPage>
      <IonToolbar color='tertiary' className='ion-text-center'>
        <IonLabel className='titulo'>Calendario Ateret Yosef</IonLabel>
      </IonToolbar>

      <IonContent fullscreen>

        <Converter />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
