import { Link } from 'react-router-dom'
import logo from '/assets/logo.svg'
import { SmartWallet } from './components/SmartWallet.tsx'

export function Header() {
    return (
        <header className="h-[10.93rem] sm:h-[7.93rem] bg-bg-02 text-xl font-semibold uppercase p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between m-auto items-center h-full max-w-[74rem]">
                <Link to='/'>
                    <div className="flex gap-5">
                        <img src={logo} alt="" />
                        Coin manager
                    </div>
                </Link>
                <SmartWallet />
            </div>
        </header>
    )
}