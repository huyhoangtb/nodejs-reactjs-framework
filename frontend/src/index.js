import React from "react";
import {render, hydrate} from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import "babel-polyfill";
import IntlProvider from 'i18n/I18nComponent';
import appRouters from "routes";
import {Switch} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import Store, {history} from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel);

window.rootAppContainer = document.getElementById('root');
//
// if (window.rootAppContainer.hasChildNodes()) {
//   hydrate(<Provider store={Store}>
//     <IntlProvider>
//       <ConnectedRouter history={history}>
//         <Switch>
//           {renderRoutes(appRouters)}
//         </Switch>
//       </ConnectedRouter>
//     </IntlProvider>
//   </Provider>, window.rootAppContainer);
// } else {
//   render(
//     <Provider store={Store}>
//       <IntlProvider>
//         <ConnectedRouter history={history}>
//           <Switch>
//             {renderRoutes(appRouters)}
//           </Switch>
//         </ConnectedRouter>
//       </IntlProvider>
//     </Provider>
//     ,
//     window.rootAppContainer,
//   );
//
// }
//


render(
  <Provider store={Store}>
    <IntlProvider>
      <ConnectedRouter history={history}>
        <Switch>
          {renderRoutes(appRouters)}
        </Switch>
      </ConnectedRouter>
    </IntlProvider>
  </Provider>
  ,
  window.rootAppContainer,
);