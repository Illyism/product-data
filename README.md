# solar-data-api
this code exposes an api for past/future data 

## Installation

```
git clone ...
copy config/index.js.sample to config/index.js
npm i
npm start

# Development: Runs the server in memory without exposing a http server and tests all the endpoints
npm test
```

# stock_data_daily must be re-populated after inserting data in stock_data!
INSERT into stock_data_daily (date, average, timestamp_start, symbol)
SELECT date, avg( ((open+close)/2) ) as average, MIN(timestamp) as timestamp_start, symbol FROM solar.stock_data GROUP by 
symbol, date

## Functions

<dl>
<dt><a href="#past">/service/stock/past</a></dt>
<dd><p>Get known stock data for a specific symbol in the past</p>
</dd>
<dt><a href="#future">/service/stock/future</a></dt>
<dd><p>Get known stock data for a specific symbol in the future</p>
</dd>
</dl>

<a name="past"></a>

## /service/stock/past
Get known stock data for a specific symbol in the past

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>Number</code> | unix timestamp |
| symbol | <code>String</code> | symbol to look up |
| limit | <code>Number</code> | [1000] The amount of items to get |
| offset | <code>Number</code> | [0] Start from this offset |

<a name="future"></a>

## /service/stock/future
Get known stock data for a specific symbol in the future 

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>Number</code> | unix timestamp |
| symbol | <code>String</code> | symbol to look up |
| horizon_seconds | <code>Number</code> | [Optional] Restrict lookup to X seconds in the future |
| limit | <code>Number</code> | [1000] The amount of items to get |
| offset | <code>Number</code> | [0] Start from this offset |
