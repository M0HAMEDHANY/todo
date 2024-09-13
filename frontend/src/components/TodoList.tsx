'use client'

import { useState } from 'react'
import { Plus, X, Check, Edit2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type Task = {
    id: number
    text: string
    completed: boolean
}

type TodoListProps = {
    darkMode: boolean
}

export function TodoList({ darkMode }: TodoListProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [editedTaskText, setEditedTaskText] = useState('')

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
            setNewTask('')
        }
    }

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const startEditingTask = (task: Task) => {
        setEditingTask(task)
        setEditedTaskText(task.text)
    }

    const saveEditedTask = () => {
        if (editingTask && editedTaskText.trim() !== '') {
            setTasks(tasks.map(task =>
                task.id === editingTask.id ? { ...task, text: editedTaskText } : task
            ))
            setEditingTask(null)
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-grow dark:bg-gray-700 dark:text-white"
                />
                <Button onClick={addTask} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" /> Add Task</Button>
            </div>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        darkMode={darkMode}
                        onToggle={() => toggleTask(task.id)}
                        onEdit={() => startEditingTask(task)}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}
            </div>

            <Dialog open={editingTask !== null} onOpenChange={() => setEditingTask(null)}>
                <DialogContent className={darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <Input
                        value={editedTaskText}
                        onChange={(e) => setEditedTaskText(e.target.value)}
                        placeholder="Edit your task"
                        className={darkMode ? 'dark:bg-gray-700 dark:text-white' : ''}
                    />
                    <DialogFooter>
                        <Button onClick={saveEditedTask}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function TaskCard({ task, darkMode, onToggle, onEdit, onDelete }: { task: Task, darkMode: boolean, onToggle: () => void, onEdit: () => void, onDelete: () => void }) {
    return (
        <Card className={`p-2 ${task.completed ? 'bg-green-500 dark:bg-green-700' : 'bg-white dark:bg-gray-800'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center justify-between">
                <p className={`${task.completed ? 'line-through' : ''} text-sm break-words flex-grow mr-2`}>{task.text}</p>
                <div className='flex space-x-1'>
                    <Button size="sm" onClick={onToggle}>
                        <Check className="h-3 w-3" />
                    </Button>
                    <Button size="sm" onClick={onEdit}>
                        <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={onDelete}>
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}