import './App.scss';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Login/>
      <div className='footer'>
        <span className='footer__text'>created by Bryn Frayne</span>
        <span className='footer__text'>devChallenges.io</span>
      </div>
    </div>
  );
}

export default App;
