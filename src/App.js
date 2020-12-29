import './App.css';
import Sidebar from './Sidebar';

function App() {
  return (
    //BEM naming convetion
    <div className="app">
      <h1>Lets build a whats app clone</h1>
      <div className="app_body">
        <Sidebar/>
        {/* Chat */}
      </div>
    </div>
  );
}

export default App;
