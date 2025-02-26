import './CardList.css';
import { fillArray, simpleHash } from '../../usefullFunctions';
import _Card from '../Card/Card';
import { Space, Pagination, Input, Alert } from 'antd';
import { useState, useEffect } from 'react';
import MovieDBService from '../../movie-service';
import { debounce } from 'lodash';

export default function CardList({ numberOfCards, isErrors }) {
  const [_page, setPage] = useState(1);
  const [_totalPages, setTotalPages] = useState(50);
  const [isnothingWasFound, setIsNothingWasFound] = useState(false);

  const [search, setSearch] = useState('');

  const changePage = (page) => {
    setPage(page);
    console.log(page);
  };

  const nothinWasfound = () => {
    setIsNothingWasFound(true);
  };

  const movieDBService = new MovieDBService();

  const getTotalPages = (value) => {
    if (value) {
      movieDBService.getSearchResult(1, search).then((res) => {
        setTotalPages(res.total_pages);
        console.log(_totalPages);
      });
    } else {
      movieDBService.getResource(1).then((res) => {
        setTotalPages(res.total_pages);
        console.log(res.total_pages);
      });
    }
  };
  useEffect(() => {
    getTotalPages();
  }, []);

  const goToSearch = (value) => {
    console.log(value);
    setSearch(value);
    getTotalPages(value);
    setIsNothingWasFound(false)
  };

  if (isnothingWasFound) {
    return (
      <>
        <Input
          className="search"
          placeholder="Type to search..."
          onChange={debounce((e) => goToSearch(e.target.value), 700)}
          
        />
        <Alert className='alert-not-found' message="Nothing was found" type="warning" showIcon/>
      </>
    );
  }
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
          <Input
            className="search"
            placeholder="Type to search..."
            onChange={debounce((e) => goToSearch(e.target.value), 700)}
          />

          {fillArray(numberOfCards).map((id) => (
            <_Card
              id={id}
              page={_page}
              isErrors={isErrors}
              key={simpleHash(`${Math.random()}`)}
              search={search}
              nothinWasfound={nothinWasfound}
            />
          ))}
        </Space>
      </div>
      <Pagination
        className="pagination"
        align="center"
        defaultCurrent={_page}
        total={_totalPages}
        showSizeChanger={false}
        onChange={changePage}
      />
    </>
  );
}
