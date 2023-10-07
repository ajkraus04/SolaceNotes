import NavBar from "@/components/NavBar"
import NotesContainer from "@/containers/NotesContainer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
     <NavBar />
     <NotesContainer />
    </main>
  )
}
