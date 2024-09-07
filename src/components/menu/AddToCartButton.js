import FlyingButton from 'updated-react-flying-item'

export default function AddToCartButton({
    hasSizesOrToppings, onClick, basePrice, image,
}) {
    if (!hasSizesOrToppings) {
        return (
            <div className="flying-button-parent mt-4">
                <FlyingButton 
                    targetTop={'5%'}
                    targetLeft={'85%'}
                    src={image}>
                    <div onClick={onClick}>
                        Add to cart ${basePrice}
                    </div>
                </FlyingButton>
            </div>
        );
    }
    return (
        <button 
            type="button"
            onClick={onClick}
            className="mt-4 bg-primary text-white rounded-full px-8 py-2 hover:shadow-md hover:text-black transition-all">
            <span>From ${basePrice}</span>
        </button>
         
    )
}