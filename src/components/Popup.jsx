import React, { useEffect, useState } from 'react'
import { IonText, useIonLoading, IonItem, IonIcon, IonButton, IonPopover } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, closeCircleOutline } from "ionicons/icons";
import './Popup.css'

import ZmanimView from './ZmanimView'

function Popup(props) {
    useEffect(() => {
        if (props.trigger) {
            document.getElementById('popup2').addEventListener('click', (e) => {
                props.setTrigger(false)
            })

            document.getElementById('inner').addEventListener('click', (e) => {
                e.stopPropagation()
            })
        }
    }, [props.trigger])

    return (props.trigger) ? (
        <>
            <div className='popup' id='popup2'>
                <div className="popup-inner">
                    <div className='ion-text-right close-btn'>
                        <IonButton fill='clear' onClick={() => { props.setTrigger(false) }}><IonIcon icon={closeCircleOutline} slot='icon-only'></IonIcon></IonButton>
                    </div>

                    <div className='ion-text-center' id='inner'>
                        <IonText className='fuentePopover'>
                            <ZmanimView date={props.horarios} a={props.APIresponse} a2={props.APIresponse2} calStructureHebrew={props.calStructureHebrew} lat={props.lat} long={props.long} validaDST={props.validaDST} />
                        </IonText>
                    </div>

                    {/* <button className='close-btn' onClick={() => { props.setTrigger(false) }}>close</button> */}
                </div>
            </div>
        </>
    ) : null
}

export default Popup