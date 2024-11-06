import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";


export async function POST(request) {
    try {
        const { title, description } = await request.json();
        
        await connectMongoDB();
        
        await Topic.create({ title, description });
        
        return NextResponse.json({ message: "Topic Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating topic", error: error.message }, { status: 500 });
    }
}

export async function GET(){
    try{
        await connectMongoDB();
        const topics=await Topic.find();
        return NextResponse.json({topics});
    } catch(error){
        return NextResponse.json({message: " Error in fetching topics", error:error.message},{status:500});
    }
}
export async function DELETE(request){
    try{
        const id = request.nextUrl.searchParams.get("id");
        await connectMongoDB();
        await Topic.findByIdAndDelete(id);
        return NextResponse.json({ message: "Topic deleted" }, { status: 201 })
    }
    catch(error){
        return NextResponse.json({ message: "Error in deleting topic", error: error.message }, { status: 500 });
    }
}