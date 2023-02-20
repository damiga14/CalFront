import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonLabel, IonTitle, IonImg, IonToolbar, IonButton } from '@ionic/react';

import Jaguim from '../components/Jaguim'

function Tab7() {
  return (
    <IonPage>
      <IonToolbar color='tertiary' className='ion-text-center'>
        <IonLabel className='titulo'>Calendario Ateret Yosef</IonLabel>
      </IonToolbar>

      <IonContent fullscreen>

        <Jaguim />
        
      </IonContent>
    </IonPage>
  );
};

export default Tab7;
