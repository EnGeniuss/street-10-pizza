import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import FlyingButton from "updated-react-flying-item";
import { resolve } from "styled-jsx/css";

export default function MenuItem(menuItem) {
    const {
        image, 
        name, 
        description,
        category,  
        basePrice, 
        sizes, 
        toppingsPrice
    } = menuItem;
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const {addToCart} = useContext(CartContext);
    
    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedToppings?.length > 0) {
        for (const topping of selectedToppings) {
            selectedPrice += topping.price;
        }
    }
    async function handleAddToCartButtonClick() {
            const hasOptions = sizes.length > 0 && toppingsPrice.length > 0;
            if (hasOptions && !showPopUp) {
                setShowPopUp(true);
                return;
            }
                addToCart(menuItem, selectedSize, selectedToppings);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setShowPopUp(false);
                reset();

            };
    function reset() {
        setSelectedSize(sizes?.[0] || null);
        setSelectedToppings([]);
    }
    function handleToppings(ev, Toppings) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedToppings(prev => [...prev, Toppings]);
        } else {
            setSelectedToppings(prev => {
               return prev.filter(e => e.name !== Toppings.name);
            });
        }
    }
    

    return (
        <>
            {showPopUp && (
                <div 
                    onClick={() => (setShowPopUp(false), reset())}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div 
                        onClick={ev => ev.stopPropagation()}
                        className="my-8 bg-white p-4 rounded-lg max-w-md">
                        <div 
                            className="overflow-y-scroll p-2"
                            style={{maxHeight: 'calc(100vh - 100px'}}>
                            <button
                                className="max-w-1 border-0 p-0 max-h-1"
                                onClick={() => (setShowPopUp(false), reset())}>x
                            </button>
                            <Image
                                src = {image} 
                                alt={name} 
                                width={300} 
                                height={300} 
                                className="mx-auto"/>
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="p-1">
                                    <h3 className="font-bold">Choose Size</h3>
                                    {sizes.map(size => (
                                        <label className="flex items-center gap-1 mt-1 mb-1 p-3">
                                            <input 
                                                type="radio" 
                                                onClick={() =>setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                name="size"/>
                                                {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div> 
                            )}
                            {toppingsPrice?.length > 0 && (
                                <div className="p-1">
                                    <h3 className="font-bold">Choose Toppings</h3>
                                    {/* {JSON.stringify(selectedToppings)} */}
                                    {toppingsPrice.map(Toppings => (
                                        <label className="flex items-center gap-1 mt-1 mb-1 p-3">
                                            <input 
                                                type="checkbox" 
                                                onClick={ev => handleToppings(ev, Toppings)}
                                                name={Toppings.name}/>
                                                {Toppings.name} +${Toppings.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <FlyingButton
                                targetTop={'10%'}
                                targetLeft={'95%'}
                                src={image}>
                                <div 
                                    onClick={handleAddToCartButtonClick}
                                    className="primary sticky bottom-2"
                                    >
                                        Add to cart ${selectedPrice}
                                </div>
                            </FlyingButton>

                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile 
                onAddToCart={handleAddToCartButtonClick} 
                {...menuItem}/>
        </>
    );
}