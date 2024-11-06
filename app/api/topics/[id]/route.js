import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
    try {
    const {id}= params;
    const {newTitle: title, newDescription: description}= await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title,description});
    return NextResponse.json({"message":"Topic updated"}, {status:200});
    } catch (error) {
        return NextResponse.json({ message: "Error in updating topic", error: error.message }, { status: 500 });
    }
}



export async function GET(request,{params}){
    try {
        const {id}= params;
        await connectMongoDB();
        const topic=await Topic.findOne({ _id :id });
        return NextResponse.json({topic},{status:200});
    } catch (error) {
        return NextResponse.json({ message: "Error in finding topic", error: error.message }, { status: 500 });
    }
}



