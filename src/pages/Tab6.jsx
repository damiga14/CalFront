import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonLabel, IonTitle, IonImg, IonToolbar } from '@ionic/react';
import './Tab6.css';
import logoAteret from '../assets/logo.png'
import logoActive from "../assets/LogoActiveAnimated.gif";
import mario from '../assets/mario.png'
import useSound from "use-sound";
import marioJump from "../sounds/marioJump.mp3";

function Tab6() {
  let [count, setCount] = useState(1)
  const [play] = useSound(marioJump);

  function logoHandler() {
    let temp = count

    if (count == 14) {
      play()
      document.getElementById('mario').classList.add("mario")
      setTimeout(() => { document.getElementById('mario').classList.remove("mario") }, 600);
      setCount(1)
    }
    else { temp++; setCount(temp) }
  }

  return (
    <IonPage>
      <IonToolbar color='tertiary' className='ion-text-center'>
        <IonLabel className='titulo'>Calendario Ateret Yosef</IonLabel>
      </IonToolbar>

      <IonContent fullscreen>

        <br />

        <div className='arriba'>
          <img src={logoAteret} alt="" width={'50%'} />
        </div>

        <br />

        <div className='ion-padding ion-text-justify' style={{ "fontWeight": "bold" }}>
          <IonText>El cálculo de los horarios de este calendario están basados de acuerdo a cómo se aplican en la mayoría de los calendarios reconocidos en el mundo.</IonText>
          <br />
          <IonText>Esta app toma las coordenadas del lugar donde se encuentre para que el cálculo sea lo más exacto posible.</IonText>
          <br />
          <IonText>Cabe recalcar que por este motivo, puede haber una pequeña diferencia de acuerdo al calendario impreso.</IonText>

          <br /><br />

          <IonText>Para dudas o comentarios, puedes contactarnos a este correo <a href="mailto:activecodejd@gmail.com">activecodejd@gmail.com</a>.</IonText>
          <br /><br />

          <center>
            <div className="container_row">
              <div className="layer1">
                <IonImg id='mario' src={mario} alt={"Active Code"} style={{ 'width': "10%", "height": "auto" }} />
              </div>
              <div className="layer2">
                <IonImg src={logoActive} alt={"Active Code"} onClick={logoHandler} style={{ 'width': "30%", "height": "auto" }} />
              </div>
            </div>
          </center>
          {/* <IonImg src={logoActive} alt={"Active Code"} style={{ 'width': "40%", "height": "auto", "margin": "auto" }} /> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab6;
