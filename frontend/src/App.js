import logo from './logo.svg';
import './App.css';
import FontUploadComponent from './components/fontUploadComponent';

function App() {
  return (
    <div className="App">
      <header className="container m-10">
        <h2 className='flex flex-row text-blue-400 font-bold text-2xl'>
          Font Wallet
        </h2>
      </header>

      <div className="container m-10">
        <FontUploadComponent />
      </div>
    </div>
  );
}

export default App;
