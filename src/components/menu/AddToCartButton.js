export default function AddToCartButton({
    hasSizesOrToppings, onClick, basePrice,
}) {
    return (
        <button 
            type="button"
            onClick={onClick}
            className="mt-4 bg-primary text-white rounded-full px-8 py-2 hover:shadow-md hover:text-black transition-all">
            {hasSizesOrToppings? (
                <span>From ${basePrice}</span>
            ) : (
                <span>Add to cart ${basePrice} </span>
            )} 
        </button>
         
    )
}