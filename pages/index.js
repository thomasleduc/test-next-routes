import React, { useState } from 'react';
import { withProps } from 'recompose';
import { compose } from 'lodash/fp';
import { withRouter } from 'next/router';
import { Router } from '../routes.js';

const App = ({ addQueryParam }) => {
  const [param, setParam] = useState('');

  const handleChange = (event) => setParam(event.target.value);

  return (
    <div>
      <input type='text' value={param} onChange={handleChange}/>
      <button onClick={() => addQueryParam({ newQueryParam: param })}>Update query</button>
    </div>
  );
};


const AppContainer = compose(
  withRouter,
  withProps(({ router }) => ({
    addQueryParam: (queryParams) => {
      console.log('Router.router.asPath', Router.router.asPath);
      console.log('router.query', router.query);
      console.log('queryParams', queryParams);
      Router.replaceRoute(Router.router.asPath, {
        ...router.query,
        ...queryParams,
      });
    }
  })),
)(App);

export default AppContainer;
