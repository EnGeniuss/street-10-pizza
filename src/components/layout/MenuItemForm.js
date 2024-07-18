import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    // State to manage the list of pizza sizes
    const [sizes, setSizes] = useState([menuItem?.sizes || []]);

    function addSize() {
        setSizes(oldSizes =>{
            return [...oldSizes, {name:'', price:0}];
        });
    }

    function editSize(ev, index, prop) {
        const newValue=ev.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeSize(indexToBeRemoved) {
        setSizes(prev =>prev.filter((v,index) => index !== indexToBeRemoved));
    }

    return (
        <form 
            onSubmit={ev =>onSubmit(ev,{image, name, description, basePrice, sizes})} 
            className="mt-8 max-w-md mx-auto">
                <div
                    className="grid items-start gap-4"
                    style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={ev =>setName(ev.target.value)}
                        />
                        <label>Description</label>
                        <input 
                            type="text"
                            value={description}
                            onChange={ev =>setDescription(ev.target.value)}
                        />
                        <label>Base price</label>
                        <input 
                            type="text"
                            value={basePrice}
                            onChange={ev =>setBasePrice(ev.target.value)}
                        />
                        <div className="bg-gray-200 p-2 rounded-md mb-2">
                            <label>Choose Size</label>
                            {sizes?.length > 0 && sizes.map(size, index =>(
                                <div className="flex gap-2 items-end">
                                    <div>
                                    <label>Size</label>
                                        <input 
                                            type="text" 
                                            placeholder="Size name" 
                                            value={size.name}
                                            onChange={ev => editSize(ev, index, 'name')}
                                        />
                                    </div>
                                    <div>
                                        <label>Price</label>
                                        <input className="rounded-md"
                                            type="text" 
                                            placeholder="price" 
                                            value={size.price}
                                            onChange={ev => editSize(ev, index, 'name')}
                                        />
                                    </div>
                                    <div>
                                        <button 
                                            type="button"
                                            className="bg-white mb-2"
                                            onClick={() =>removeSize(index)}
                                        >X
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={addSize}
                                className="bg-white">
                                Add size(M/L)
                            </button>
                        </div>
                        <button type="submit">Save</button>
                    </div>
                </div>

            </form>
    )
}