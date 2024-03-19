import { useEffect, useState } from 'react';
import { api } from '../../axios';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { useNavigate, useParams } from 'react-router-dom';
import { CoinInfos } from './components/CoinInfos';
import { priceFormatter } from '../../tools/formatter';

type CoinDetailData = {
    description: string,
    img: string,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap: number,
    total_volume: number
}

export function CoinDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [coinData, setCoinData] = useState<CoinDetailData>();

    useEffect(() => {
        loadCoinData();
    }, []);

    function loadCoinData() {
        api.get(`coins/${id}`, {
            params: {
                localization: false,
                tickers: false,
                market_data: true,
                community_data: false,
                developer_data: false,
                sparkline: false
            }
        }).then(response => {
            const market_data = response.data.market_data

            setCoinData({
                description: response.data.description.en,
                img: response.data.image.small,
                high_24h: market_data.high_24h.usd,
                market_cap: market_data.market_cap.usd,
                low_24h: market_data.low_24h.usd,
                price_change_24h: market_data.price_change_24h,
                price_change_percentage_24h: market_data.price_change_percentage_24h,
                total_volume: market_data.total_volume.usd,
            })
        }).catch(error => {
            navigate('/', { replace: true })
            console.log(error);
        })
    }

    const options: ApexOptions = {
        chart: {
            height: 350,
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: ['High 24h', 'Low 24h', 'Price Change 24h', 'Price Change % 24h', 'Market Cap', 'Total Volume']
        },
        yaxis: {
            labels: {
                formatter: function (value: number) {
                    return priceFormatter.format(value);
                }
            }
        },
        theme: {
            mode: 'dark'
        },
        colors: ['#00B37E'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };

    const series = [{
        name: id,
        data: [
            coinData?.high_24h || 0,
            coinData?.low_24h || 0,
            coinData?.price_change_24h || 0,
            coinData?.price_change_percentage_24h || 0,
            coinData?.market_cap || 0,
            coinData?.total_volume || 0
        ]
    }];

    function renderGraph() {
        return <ReactApexChart options={options} series={series} type="area" height={350} />;
    }

    return (
        <>
            {coinData ?
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center justify-center w-full mt-5'>
                        <img src={coinData.img} alt="" />
                        <span className='font-bold uppercase text-2xl text-txt-00'>{id}</span>
                    </div>
                    <div className='flex md:flex-row flex-col gap-5 my-5 px-2 justify-center items-center w-full'>
                        <CoinInfos data={coinData} />
                        <div className='px-10 max-h-72 max-w-[50rem] overflow-y-auto' dangerouslySetInnerHTML={{ __html: coinData.description }}></div>
                    </div>
                    {renderGraph()}

                </div>
                : (
                    <div className='h-[100vh] w-full flex justify-center mt-5'>
                        <p>Loading...</p>
                    </div>
                )}
        </>
    );
}