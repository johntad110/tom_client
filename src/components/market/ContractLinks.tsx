import { motion } from 'framer-motion';
import { useTelegramStore } from '../../stores/telegramStore';
import { tonScanUrl } from '../../helpers/RPCEndpoints';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const ContractLinks = ({
    marketAddress,
    oracleAddress,
}: {
    marketAddress: string
    oracleAddress: string
}) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    console.log(oracleAddress);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4"
            style={{ backgroundColor: theme?.bg_color }}
        >
            <h3
                className="mb-4 text-sm font-bold"
                style={{ color: theme?.accent_text_color }}
            >
                Contract Links
            </h3>

            <div className="space-y-3">
                <a
                    href={`${tonScanUrl()}/address/${marketAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg transition-colors hover:opacity-90"
                    style={{
                        backgroundColor: theme?.secondary_bg_color,
                        color: theme?.text_color
                    }}
                >
                    <span className="text-sm">Market Contract</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-70" />
                </a>

                {/* <a
                    href={`${tonScanUrl()}/address/${oracleAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg transition-colors hover:opacity-90"
                    style={{
                        backgroundColor: theme?.secondary_bg_color,
                        color: theme?.text_color
                    }}
                >
                    <span className="text-sm">Oracle Contract</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-70" />
                </a> */}
            </div>

            <p className="text-xs mt-3 text-center" style={{ color: theme?.hint_color }}>
                View on TON Scan
            </p>
        </motion.div>
    );
};

export default ContractLinks;