import { priceFormatter } from "../../../../tools/formatter";

interface CoinInfosProps {
    data: CoinData
}

type CoinData = {
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap: number,
    total_volume: number
}

export function CoinInfos({ data }: CoinInfosProps) {
    return (
        <div className='flex flex-col gap-1 text-sm uppercase font-semibold'>
            <div className='flex gap-2'>
                <span>High 24h:</span>
                <span><span className={data.high_24h > 0 ? 'text-cl-light-success' : 'text-cl-light-danger'}>{priceFormatter.format(data.high_24h)}</span></span>
            </div>
            <div className='flex gap-1'>
                <span>Low 24h:</span>
                <span><span className={data.low_24h > 0 ? 'text-cl-light-success' : 'text-cl-light-danger'}>{priceFormatter.format(data.low_24h)}</span></span>
            </div>
            <div className='flex gap-1'>
                <span>Price Change 24h:</span>
                <span><span className={data.price_change_24h > 0 ? 'text-cl-light-success' : 'text-cl-light-danger'}>{priceFormatter.format(data.price_change_24h)}</span></span>
            </div>
            <div className='flex gap-1'>
                <span>Price Change % 24h:</span>
                <span><span className={data.price_change_percentage_24h > 0 ? 'text-cl-light-success' : 'text-cl-light-danger'}>{priceFormatter.format(data.price_change_percentage_24h)}</span></span>
            </div>
            <div className='flex gap-1'>
                <span>Market Cap:</span>
                <span><span className={data.market_cap > 0 ? 'text-cl-light-success' : 'text-cl-light-danger'}>{priceFormatter.format(data.market_cap)}</span></span>
            </div>
            <div className='flex gap-1'>
                <span>Total Volume:</span>
                <span><span className={data.total_volume > 0 ? 'text-cl-light-success' : 'text-cl-light-danger'}>{priceFormatter.format(data.total_volume)}</span></span>
            </div>
        </div>
    )
}