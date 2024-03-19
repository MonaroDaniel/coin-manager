import { priceFormatter } from "../../tools/formatter";

interface RowTableProps {
    img: string;
    name: string;
    symble: string;
    current_price: number;
}

export function RowTable({ name, current_price, img, symble }: RowTableProps) {
    return (
        <div className="flex w-full gap-5">
            <div className="grid grid-cols-[1fr_1fr] gap-1 sm:grid-cols-[5rem_1fr_1fr_9rem] items-center w-full h-max bg-bg-01 rounded-lg p-2 cursor-pointer">
                <img className="w-11 h-11" src={img} alt="" />
                <span className="flex sm:justify-start justify-end font-bold">{name}</span>
                <span className="uppercase">{symble}</span>
                <span className="flex sm:justify-start justify-end">{priceFormatter.format(current_price)}</span>
            </div>
        </div>
    )
}