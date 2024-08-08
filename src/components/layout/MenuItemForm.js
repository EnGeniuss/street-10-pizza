import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";

import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    // State to manage the list of pizza sizes
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [selectCat, setSelectCat] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [toppingsPrice,setToppingsPrice] = useState(menuItem?.toppingsPrice || [])
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    return (
        <form 
            onSubmit={ev =>
                onSubmit(ev,{
                    image, name, description, selectCat, basePrice, sizes,toppingsPrice
                })
            } 
            className="mt-8 max-w-2xl mx-auto">
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
                        <label>Category</label>
                        <select value={selectCat} onChange={ev => setSelectCat(ev.target.value)}>
                            {categories?.length > 0 && categories.map(c =>(
                                <option value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <label>Base price</label>
                        <input 
                            type="text"
                            value={basePrice}
                            onChange={ev =>setBasePrice(ev.target.value)}
                        />
                        <MenuItemPriceProps
                            title={'Size'} 
                            name={'Size'} 
                            addLabel={'Add size(M/L)'}
                            props={sizes} 
                            setProps={setSizes}/>
                        <MenuItemPriceProps
                            title={'Toppings'}
                            name={'Extra Toppings'}
                            addLabel={'Add toppings'}
                            props={toppingsPrice}
                            setProps={setToppingsPrice}/>
                        <button type="submit">Save</button>
                    </div>
                </div>

            </form>
    )
}