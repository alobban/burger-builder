import React from 'react';

import Aux from '../../hoc/Auxill';

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
      {props.children}
    </main>
  </Aux>
);
