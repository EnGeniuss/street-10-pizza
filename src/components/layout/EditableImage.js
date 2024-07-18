import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link,setLink}) {
   
    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
                
            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body:data,
            }).then (async response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link)
                    })
                }
                throw new Error('Something went wrong!');
            });
               

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete!',
                error: 'Upload error!',
            });
        }
    }
    return(
        <>
            {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={150} height={150} alt={'avatar'}/>
            )}
            {!link && (
                <div className="bg-gray-200 p-4 text-gray-500 rounded-lg">
                    No image
                </div>
            )}
            
            <label>
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <span className="block border border-gray-100 cursor-pointer rounded-lg text-center mt-1 bg-primary text-white underline">Edit</span>
            </label>
        </>
    );
}