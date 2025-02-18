import './CardList.css';
import { fillArray, simpleHash } from '../../usefullFunctions';
import _Card from '../Card/Card';
import { Space } from 'antd';

export default function CardList({ numberOfCards, page, isErrors }) {


  return (
    <div className="centered">
      <Space
        size={[32, 32]}
        style={{
          display: 'flex',
        }}
        wrap
        className="cards"
      >
        {fillArray(numberOfCards).map((id) => (
          <_Card id={id} page={page} isErrors={isErrors} key={simpleHash(`${Math.random()}`)} />
        ))}
      </Space>
    </div>
  );
}
