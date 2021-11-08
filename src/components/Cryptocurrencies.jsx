import React, {useState, useEffect} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100; //set to show only 10 if the component has a simplified property
  const { data: cryptosList, isFetching} = useGetCryptosQuery(count); //with this call we also rename data to cryptosList
  const [cryptos, setCryptos] = useState([]); //leaving as blank array because useEffect runs on component mount and sets state
  const [searchTerm, setSearchTerm] = useState('');

  //useEffect is a combo of componentDidMount and componentDidUpdate, which makes it always run at least once upon mount
  useEffect(() => {
    const filteredCoins = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredCoins);

  }, [cryptosList, searchTerm])

  if(isFetching) return 'Loading ...';

  return (
    <>
      {!simplified && (
             <div className='search-crypto'>
        <Input placeholder='Search coins' onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      )}
 
      <Row gutter={ [30, 30] } className='crypto-card-container'>
        {cryptos?.map((coin) => (
           <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.id}>
             <Link to={`/crypto/${coin.id}`}>
               <Card 
                  title={`${coin.rank}. ${coin.name}`}
                  extra={<img className='crypto-image' src={coin.iconUrl} />}
                  hoverable
                >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}%</p>
               </Card>
             </Link>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
