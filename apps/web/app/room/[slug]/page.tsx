import axios from "axios";
import { BACKEND_URL } from "../../config";

async function getRoom(slug1:string)
{
    const response=await axios.get(BACKEND_URL+"/room/"+slug1)
    return response.data.id;
}


export default async function ChatRoom({
    params
}:{
    params: Promise<{
        slug: string
    }>
}
){
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const roomId = await getRoom(slug);

    



}