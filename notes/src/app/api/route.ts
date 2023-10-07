import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


//Connect to Database Client
const prisma = new PrismaClient(); 

//Gets all notes from DB
export async function GET(request: NextRequest) {
    try {
        const notes =  await prisma.notes.findMany();
        return NextResponse.json({ notes })
    } catch (err){
        console.log("There is an error insize the get /api route ", err)
        return NextResponse.json({err})
    }

};

//Inserts note into DB
export async function POST(request: NextRequest) {
    try {
        const {noteText} : {noteText: string} = await request.json();
        const newNote = await prisma.notes.create({
            data: {
                note: noteText
            }
        })
        console.log(newNote)
        return NextResponse.json({newNote})
    } catch (err) {
        console.log("There is an error in POST /api route ", err )
        return NextResponse.json({err})
    }
};

//Updates Note on DB
export async function PUT(request: NextRequest) {
    try{
        const {id, note} : {id: number, note:string} = await request.json()
        const updatedNote = await prisma.notes.update({
            where: {
                id: id
            },
            data: {
                note: note
            },
        })
        return NextResponse.json({updatedNote})
    } catch (err) {
        console.log("There is an error in UPDATE /api route ", err)
        return NextResponse.json({err})
    }
}


//Delete Note from DB
export async function DELETE(request: NextRequest){
    try{
        const {note} = await request.json()
        const deletedNote = await prisma.notes.delete({
            where: {
                id: note.id
            }
        })
        return NextResponse.json({deletedNote})
    } catch (err) {
        console.log("There is an error in DELETE /api route ", err)
        return NextResponse.json({err})
    }
}
