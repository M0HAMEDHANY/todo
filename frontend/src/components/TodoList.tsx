'use client'

import { useEffect, useState } from 'react'
import { Plus, X, Edit2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
    id: number
    text: string
    completed: boolean
    created: string // New field for creation date
}

type TodoListProps = {
    darkMode: boolean
}

export function TodoList({ darkMode }: TodoListProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [editedTaskText, setEditedTaskText] = useState('')

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/todo/')
        const data = await response.json()
        setTasks(data)
    }

    const addTask = async () => {
        if (newTask.trim() !== '') {
            const response = await fetch('http://127.0.0.1:8000/api/todo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newTask })
            })
            const data = await response.json()
            setTasks([...tasks, data])
            setNewTask('')
        }
    }

    const toggleTask = async (id: number) => {
        const task = tasks.find(task => task.id === id)
        if (task) {
            const response = await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: !task.completed })
            })
            const data = await response.json()
            setTasks(tasks.map(task =>
                task.id === id ? data : task
            ))
        }
    }

    const deleteTask = async (id: number) => {
        const response = await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            setTasks(tasks.filter(task => task.id !== id))
        }
    }

    const startEditingTask = (task: Task) => {
        setEditingTask(task)
        setEditedTaskText(task.text)
    }

    const saveEditedTask = async () => {
        if (editingTask && editedTaskText.trim() !== '' && editingTask.text !== editedTaskText.trim()) {
            const response = await fetch(`http://127.0.0.1:8000/api/todo/${editingTask.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: editedTaskText.trim() })
            });
            const data = await response.json();
            setTasks(tasks.map(task =>
                task.id === editingTask.id ? data : task
            ));
            setEditingTask(null);
        }
    };

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
    const [expanded, setExpanded] = useState(false)

    return (
        <Card className={`p-2 ${task.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-grow">
                    <Checkbox checked={task.completed} onCheckedChange={onToggle} />
                    <p className={`${task.completed ? 'line-through' : ''} text-sm break-words flex-grow mr-2`}>{task.text}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>
            {expanded && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Created: {new Date(task.created).toLocaleString()}</p>
                        <div className="flex space-x-1">
                            <Button size="icon" onClick={onEdit}>
                                <Edit2 className="h-3 w-3 mr-1" /> Edit
                            </Button>
                            <Button size="icon" variant="destructive" onClick={onDelete}>
                                <X className="h-3 w-3 mr-1" /> Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
}