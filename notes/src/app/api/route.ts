import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient(); 

//Gets all notes from DB
export async function GET(request: NextRequest) {
    try {
        const notes =  await prisma.notes.findMany();
        console.log("Notes");
        return NextResponse.json({ notes })
    } catch (err){
        console.log("There is an error insize the get /api route ", err)
        return NextResponse.json({err})
    }

};

//Inserts not to DB
export async function POST(request: NextRequest) {
    try {
        const newNote = await prisma.notes.create({
            data: {
                note: `Hello this is my note! ${Date.now()}`
            }
        })
        return NextResponse.json({newNote})
    } catch (err) {
        console.log("There is an error in POST /api route")
        return NextResponse.json({err})
    }
};
