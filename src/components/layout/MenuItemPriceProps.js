import Delete from "../icons/Delete";
import Add from "../icons/Add";
import ChevronDown from "../icons/ChevronDown";
import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({title, name,addLabel,props,setProps}){

    const [toggleOn,setToggleOn] = useState(false);

    function addProps() {
        setProps(oldProps =>{
            return [...oldProps, {name:'', price:0}];
        });
    }

    function editProps(ev, index, prop) {
        const newValue=ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProps(indexToBeRemoved) {
        setProps(prev =>prev.filter((v,index) => index !== indexToBeRemoved));
    }
     return(
        <div className="bg-gray-200 p-2 rounded-md mb-2">
                <button
                    onClick={() => setToggleOn(prev => !prev)}
                    className="inline-flex p-1 border-0 justify-start gap-1"
                    type="button">
                    {toggleOn && (
                        <ChevronUp/>
                    )}
                    {!toggleOn && (
                        <ChevronDown/>
                    )}
                    <span>{title}</span>
                    <span>({props?.length})</span>
                </button>
                <div className={toggleOn ? 'block' : 'hidden'}>
                    {props?.length > 0 && props.map((size, index) =>(
                    <div className="flex gap-2 items-end">
                        <div>
                        <label>{name}</label>
                            <input 
                                type="text" 
                                placeholder="Size name" 
                                value={size.name}
                                onChange={ev => editProps(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input className="rounded-md"
                                type="text" 
                                placeholder="price" 
                                value={size.price}
                                onChange={ev => editProps(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button 
                                type="button"
                                className="bg-white mb-2 px-2"
                                onClick={() =>removeProps(index)}
                            ><Delete/>
                            </button>
                        </div>
                    </div>
                    ))}
                    <button 
                        type="button"
                        onClick={addProps}
                        className="bg-white flex items-center">
                        <Add/><span>{addLabel}</span>
                    </button>
                </div>
        </div>
     );
}