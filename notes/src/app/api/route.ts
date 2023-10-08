import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


//Connect to Database Client
const prisma = new PrismaClient(); 

//Gets all notes from DB
export async function GET(request: NextRequest) {
    try {
        const notes =  await prisma.notes.findMany({orderBy: {date_modified: "desc"}});
        return NextResponse.json({ notes })
    } catch (err){
        console.log("There is an error insize the get /api route ", err)
        return NextResponse.json({error: err}, {status: 500})
    }

};

//Inserts note into DB
export async function POST(request: NextRequest) {
    try {
        const {noteText} : {noteText: string} = await request.json();
        //Throws Error if less than 20 characters long
        if (noteText.length < 20 ) {
            return NextResponse.json({error: "Note length must be longer than 20 characters"}, {status:500})
        }
        //Throws Error if greater than 300 characters long
        if (noteText.length > 300) {
            return NextResponse.json({error: "Note length must not exceed 3000 characters"}, {status: 500})
        }
        const newNote = await prisma.notes.create({
            data: {
                note: noteText
            }
        })
        return NextResponse.json({newNote})
    } catch (err) {
        console.log("There is an error in POST /api route ", err )
        return NextResponse.json({error: err}, {status: 500})
    }
};

//Updates Note on DB
export async function PUT(request: NextRequest) {
    try{
        const {id, note} : {id: number, note:string} = await request.json()
        //Throws Error if less than 20 characters long
        if (note.length < 20 ) {
            return NextResponse.json({error: "Note length must be longer than 20 characters"}, {status:500})
        }
        //Throws Error if greater than 300 characters long
        if (note.length > 300) {
            return NextResponse.json({error: "Note length must not exceed 3000 characters"}, {status: 500})
        }
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
        return NextResponse.json({error: err},{status:500})
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
        return NextResponse.json({error: err}, {status: 500})
    }
}
