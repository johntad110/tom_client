import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MarketHeader from '../components/market/MarketHeader';
import PriceChart from '../components/market/PriceChart';
import PositionSection from '../components/market/PositionSection';
import TradePanel from '../components/market/TradePanel';
import { useMarketStore } from '../stores/marketStore';
import { useTelegram } from '../hooks/useTelegram';
import type { Market } from '../types/market';
import { useFactoryStore } from '../stores/factoryStore';
import { useTelegramStore } from '../stores/telegramStore';
import AboutSection from '../components/market/AboutSection';
import OverviewSection from '../components/market/OverviewSection';
import ContractLinks from '../components/market/ContractLinks';
import CountdownTimer from '../components/market/CountdownTimer';
import TradeModal from '../components/TradeModal';
import { ScaleLoader } from 'react-spinners';

const MarketDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getMarketById } = useMarketStore();
    const { marketAddresses } = useFactoryStore();
    const marketAddress = marketAddresses[(id !== undefined) ? Number(id) : 0]
    const [market, setMarket] = useState<Market | null>(null);
    const { backButton } = useTelegram();

    const { webApp } = useTelegramStore();
    const mainButton = webApp?.MainButton;
    const secondaryButton = webApp?.SecondaryButton;

    const [isModalOpen, setModalOpen] = useState(false);
    const [userIntent, setUserIntent] = useState<'BUY_YES' | 'BUY_NO' | 'SELL_YES' | 'SELL_NO'>("BUY_YES");

    useEffect(() => {
        mainButton?.setParams({ text: "Buy YES", has_shine_effect: true });
        if (market?.status !== "open") { mainButton?.disable(); }
        else { mainButton?.enable(); }
        mainButton?.onClick(() => { setUserIntent("BUY_YES"); setModalOpen(true); });
        mainButton?.show();

        secondaryButton?.setParams({ text: "Buy NO", has_shine_effect: true, position: "right", color: webApp?.themeParams.secondary_bg_color });
        if (market?.status !== "open") { secondaryButton?.disable(); }
        else { secondaryButton?.enable(); }
        secondaryButton?.onClick(() => { setUserIntent("BUY_NO"); setModalOpen(true); });
        secondaryButton?.show();

        if (id) {
            const foundMarket = getMarketById(id);
            if (foundMarket) {
                setMarket(foundMarket);
            }
        }

        backButton.show();
        backButton.onClick(() => navigate("/"));

        return () => {
            backButton.hide();
            mainButton?.hide()
            secondaryButton?.hide()
        }
    }, [id, getMarketById, backButton, marketAddress]);

    if (!market) {
        return (
            <div
                className='h-[80vh] w-[95%] flex justify-center items-center'
            >
                <ScaleLoader color={webApp?.themeParams.hint_color} />
            </div>
        );
    }
    if (!id) { return <code>Brooooo, U in the wrong place!</code> }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
            style={{ backgroundColor: webApp?.themeParams.secondary_bg_color }}
        >
            <div className="max-w-md mx-auto space-y-2">
                <MarketHeader market={market} isNew={true} />
                {market.resolutionDate && <CountdownTimer resolutionDate={market.resolutionDate} marketStatus={market.status} />}
                <PriceChart history={market.history} priceNow={market.probabilities.yes} />
                <PositionSection marketId={market.id} setUserIntent={setUserIntent} setModalOpen={setModalOpen} marketOpen={market.status === "open"} />
                {market.status === 'open' && <TradePanel market={market} />}
                <AboutSection description={market.description} />
                <OverviewSection market={market} />
                <ContractLinks marketAddress={marketAddress} oracleAddress={market.oracleAddr.toString()} />
            </div>

            <TradeModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                action={userIntent}
                marketId={market.id}
                currentYesPrice={market.probabilities.yes}
                currentNoPrice={market.probabilities.no}
            />
        </motion.div>
    );
};

export default MarketDetailPage;