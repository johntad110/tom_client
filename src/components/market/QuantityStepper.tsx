const QuantityStepper = ({ quantity, setQuantity }: {
    quantity: number;
    setQuantity: (quantity: number) => void;
}) => {
    const increment = () => setQuantity(quantity + 1);
    const decrement = () => quantity > 1 && setQuantity(quantity - 1);

    return (
        <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
            <button
                onClick={decrement}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
            >
                -
            </button>

            <div className="flex-1 text-center">
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-transparent text-center py-3 focus:outline-none"
                    min={1}
                />
            </div>

            <button
                onClick={increment}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
            >
                +
            </button>
        </div>
    );
};

export default QuantityStepper;