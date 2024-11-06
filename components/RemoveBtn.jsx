'use client'
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";



export default function RemoveBtn({id}){
    const router=useRouter();
    const removeHandler=async()=>{
        const confirmed=confirm('are you confirm');
        if(confirmed){
            const res= await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(res.ok){
                router.refresh();
            }
        }
        
        
    };
    return(
        <button onClick={removeHandler} className="text-red-400">
            <HiOutlineTrash size={24}/>
        </button>
    );
}