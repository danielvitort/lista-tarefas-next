import TaskList from "@/components/taskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-4">
        <TaskList />
      </div>
    </div>
  )
}

