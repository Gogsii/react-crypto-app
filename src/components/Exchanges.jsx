import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';

import { useGetExchangesQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Title } = Collapse;
const { Panel } = Collapse;

const Exchanges = () => {
  const {data, isFetching} = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges;

  if(!exchanges) return <Loader />;

    return (
      <>
        <Row>
          <Col span={6}>Exchanges</Col>
          <Col span={6}>24h Trading Volume</Col>
          <Col span={6}>Markets</Col>
          <Col span={6}>Change</Col>
        </Row>
        <Row>
          {exchanges.map((exchange) => ( 
          <Col span={24}>
            <Collapse>
              <Panel 
                showArrow={false}
                key={exchange.id}
                header={`${exchange.name} ${millify(exchange.volume)} ${millify(exchange.numberOfMarkets)}`}
              >
                {HTMLReactParser(`${exchange.description}`)}
              </Panel>
            </Collapse>
            
          </Col>
          ))}
        </Row>
      </>
    )
}

export default Exchanges;
