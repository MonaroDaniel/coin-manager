import { useEffect, useState } from 'react'
import { RowTable } from '../../components/RowTable'
import { api } from '../../axios'
import { PacmanLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
}

export function Home() {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    api
      .get('coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      })
      .then((response) => {
        const currentCoins: Coin[] = []

        response.data.forEach((coin: Coin) => {
          currentCoins.push({
            id: coin.id,
            image: coin.image,
            name: coin.name,
            symbol: coin.symbol,
            current_price: coin.current_price,
          })
        })
        setCoins(currentCoins)
      })
      .catch((error) => {
        setCoins([])
        console.log(error)
      })

    // Usar data abaixo se a API exceder as requisições
    /* const data = [
            {
                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
                "current_price": 68263,
                "market_cap": 1342479776016,
                "market_cap_rank": 1,
                "fully_diluted_valuation": 1434149739562,
                "total_volume": 35432926789,
                "high_24h": 68834,
                "low_24h": 66849,
                "price_change_24h": 1012.37,
                "price_change_percentage_24h": 1.50537,
                "market_cap_change_24h": 24791283188,
                "market_cap_change_percentage_24h": 1.88142,
                "circulating_supply": 19657693.0,
                "total_supply": 21000000.0,
                "max_supply": 21000000.0,
                "ath": 73738,
                "ath_change_percentage": -7.08526,
                "ath_date": "2024-03-14T07:10:36.635Z",
                "atl": 67.81,
                "atl_change_percentage": 100938.82028,
                "atl_date": "2013-07-06T00:00:00.000Z",
                "roi": null,
                "last_updated": "2024-03-18T13:16:27.860Z"
            },
            {
                "id": "ethereum",
                "symbol": "eth",
                "name": "Ethereum",
                "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
                "current_price": 3576.88,
                "market_cap": 430300692181,
                "market_cap_rank": 2,
                "fully_diluted_valuation": 430300692181,
                "total_volume": 19423537545,
                "high_24h": 3672.92,
                "low_24h": 3554.12,
                "price_change_24h": 3.56,
                "price_change_percentage_24h": 0.0995,
                "market_cap_change_24h": 2283905514,
                "market_cap_change_percentage_24h": 0.5336,
                "circulating_supply": 120078892.260554,
                "total_supply": 120078892.260554,
                "max_supply": null,
                "ath": 4878.26,
                "ath_change_percentage": -26.23155,
                "ath_date": "2021-11-10T14:24:19.604Z",
                "atl": 0.432979,
                "atl_change_percentage": 831030.02994,
                "atl_date": "2015-10-20T00:00:00.000Z",
                "roi": {
                    "times": 69.06264939809618,
                    "currency": "btc",
                    "percentage": 6906.264939809618
                },
                "last_updated": "2024-03-18T13:16:10.109Z"
            }
        ]
        const currentCoins: Coin[] = []

        data.forEach((coin: Coin) => {
            currentCoins.push({
                id: coin.id,
                image: coin.image,
                name: coin.name,
                symbol: coin.symbol,
                current_price: coin.current_price
            })
        });
        setCoins(currentCoins) */
  }, [])

  function renderCoinsRow(dataCoins: Coin[]) {
    return dataCoins.map((coin) => (
      <Link key={coin.id} to={`/coin/${coin.id}`}>
        <RowTable
          name={coin.name}
          currentPrice={coin.current_price}
          img={coin.image}
          symble={coin.symbol}
        />
      </Link>
    ))
  }

  return (
    <div className="flex flex-col m-auto max-w-3xl h-full gap-2 p-2">
      <span className="text-center text-2xl font-bold text-txt-00 my-3">
        Top 10 Cryptocurrencies by Market Capitalization
      </span>
      {coins.length > 0 ? (
        renderCoinsRow(coins)
      ) : (
        <div className="w-full flex justify-center h-screen">
          <PacmanLoader color="#C4C4CC" />
        </div>
      )}
    </div>
  )
}
