
import './App.css';
import '../node_modules/antd/dist/reset.css';
import { Space } from 'antd';

import _Card from './components/Card/Card';

function App() {
  let cardsCount = 6;

  return (
    <>
      <div className="centered">
        <Space
          size={[32, 32]}
          style={{
            display: 'flex',
          }}
          wrap
          className="cards"
        >
          <_Card id={0} />
          <_Card id={1} />
          <_Card id={2} />
          <_Card id={3} />
          <_Card id={4} />
          <_Card id={5} />

          <_Card id={6} />
          <_Card id={7} />
          <_Card id={8} />
          <_Card id={9} />
          <_Card id={10} />
          <_Card id={11} />
        </Space>
      </div>
    </>
  );
}

export default App;
