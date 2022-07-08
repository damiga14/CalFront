import React, { useState } from 'react';
import { IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonPage, IonText } from '@ionic/react';

function Settings() {
    let [selection, setSelection] = useState('mi ubicacion')

    return (
        <>
            <IonPage>
                <IonContent>
                    <br /><br /><br />
                    <div className='ion-text-center'>
                        <IonText >Para calcular los horarios, selecciona si quieres utilizar tu ubicacion actual o una de las opciones predeterminadas</IonText>
                    </div>

                    <IonItem>
                        <IonLabel>Seleccion</IonLabel>
                        <IonSelect value={selection} onIonChange={(e) => { setSelection(e.target.value) }}>
                            <IonSelectOption value="mi ubicacion">Mi ubicacion</IonSelectOption>
                            <IonSelectOption value="Mexico">Mexico</IonSelectOption>
                            <IonSelectOption value="Option 2">Option 2</IonSelectOption>
                            <IonSelectOption value="Option 3">Option 3</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Settings
