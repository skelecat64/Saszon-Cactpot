import './MgpDisplay.scss';

const MgpDisplay = ({ amount }) => {
  return <span className="mgpDisplay">{Math.round(amount * 10) / 10} MGP</span>;
};

export default MgpDisplay;
