import { motion } from 'framer-motion';
import { useTelegramStore } from '../../stores/telegramStore';

type AboutSectionProps = {
    description: string;
}

const AboutSection = ({ description }: AboutSectionProps) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4"
        style={{ backgroundColor: theme?.bg_color}}
    >
        <div className=''>
            <h3
                className="mb-4 text-sm font-bold"
                style={{ color: theme?.accent_text_color }}
            >
                About this market
            </h3>
            <p
                className="text-sm"
                style={{ color: theme?.text_color }}
            >{description}</p>
        </div>
    </motion.div >
}

export default AboutSection