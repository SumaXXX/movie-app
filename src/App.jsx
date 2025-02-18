import { Offline, Online } from 'react-detect-offline';
import './App.css';
import '../node_modules/antd/dist/reset.css';
import { Alert } from 'antd';
import { useState } from 'react';

import CardList from './components/CardList/CardList';

function App() {
  const [error, setError] = useState(false);
  const isErrors = (error) => {
    setError(true);
    console.log(error);
  };
  return (
    <>
      <Online>
        {error ? (
          <Alert style={{fontSize: 48}} message="Something went wrong..." type="error" />
        ) : (
          <CardList numberOfCards={20} page={1} isErrors={isErrors} />
        )}
      </Online>
      <Offline>
        <h1>Seems like you are offline -_-</h1>
      </Offline>
    </>
  );
}

export default App;
