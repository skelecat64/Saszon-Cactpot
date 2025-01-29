import { css } from '@emotion/react';
import Widget from './components/Widget';
import Solver from './cactpot/components/Solver';
import DonationCalculator from './donation/components/DonationCalculator';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Widget title="Mini Cactpot">
        <Solver />
      </Widget>
      <Widget title={'Donation'}>
        <DonationCalculator />
      </Widget>
    </div>
  );
};

export default App;
