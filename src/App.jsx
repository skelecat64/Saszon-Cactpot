import Widget from './components/Widget';
import Solver from './cactpot/components/Solver';
import DonationCalculator from './donation/components/DonationCalculator';
import FeteNumbers from './components/FeteNumbers';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Widget title="Mini Cactpot">
        <Solver />
      </Widget>
      <Widget title="Donation">
        <DonationCalculator />
      </Widget>
      <Widget title="Fête Points">
        <FeteNumbers />
      </Widget>
    </div>
  );
};

export default App;
