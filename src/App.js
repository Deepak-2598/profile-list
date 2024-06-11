import React from 'react';
import ProfileData from './components/profileData'
import { Provider } from 'react-redux';
import store from './redux/store';
import '../src/styles/Grid.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <ProfileData />
        </Provider>
      </header>
    </div>
  );
}

export default App;
