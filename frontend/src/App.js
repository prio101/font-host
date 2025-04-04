import './App.css';
import FontUploadComponent from './components/fontUploadComponent';
import FontListComponent from './components/fontListComponent';
import FontGroupComponent from './components/fontGroupComponent';

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

      <div className='flex flex-col items-center justify-center w-full'>
        <h2 className='flex flex-row text-blue-400 font-bold text-2xl'>
          Font List
        </h2>
        <FontListComponent />
      </div>

      <div className='my-20 flex flex-col items-center justify-center w-full'>
        <h2 className='flex flex-row text-blue-400 font-bold text-2xl'>
          Font Groups
        </h2>
        <FontGroupComponent />
      </div>
    </div>
  );
}

export default App;
