import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { swapHorizontalOutline, calendarNumberOutline, informationCircleOutline, searchCircleOutline, moonOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1.jsx';
import Tab2 from './pages/Tab2.jsx';
import Tab3 from './pages/Tab3.jsx';
import Tab5 from './pages/Tab5.jsx';
import Tab6 from './pages/Tab6.jsx';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/tab5">
            <Tab5 />
          </Route>
          <Route path="/tab6">
            <Tab6 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={calendarNumberOutline} />
            <IonLabel>Cal</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={searchCircleOutline} />
            <IonLabel>Buscador</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={swapHorizontalOutline} />
            <IonLabel>Convertir</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/tab5">
            <IonIcon icon={moonOutline} />
            <IonLabel>Lebana</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab6" href="/tab6">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>Info</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
