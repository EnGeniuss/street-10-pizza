import Image from "next/image";
import Right from "../icons/Right";
import Up from "../icons/Up";
export default function Hero(){
    return(
        <section className="Hero mt-5">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything <br/>
                    is better<br/>
                     with a&nbsp; 
                    <span className="text-primary">
                        Pizza
                    </span>.
                </h1>
                <p className="my-6 text-gray-500 text-sm">Pizza is the missing piece that makes everyday complete, a simple yet delicious joy in life.</p>
                
                <div className="flex gap-4 text-sm">
                    <button className="flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2 ">
                        Order Now
                        <Right/>
                    </button>
                    <button className="flex items-center gap-2 py-2 text-gray-600 border-0">
                         Learn More
                         <Up/>
                    </button>
                </div>
            </div>
            <div className="relative">
            <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'Pizza'}/>
            </div>
        </section>
    );
}