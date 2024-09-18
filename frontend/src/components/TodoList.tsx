'use client'

import { useEffect, useState } from 'react'
import { Plus, X, Edit2, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios'

type Task = {
    id: number
    text: string
    completed: boolean
    created: string
}

type TodoListProps = {
    darkMode: boolean
}

const API_URL = 'http://localhost:8000/api/';

export function TodoList({ darkMode }: TodoListProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [editedTaskText, setEditedTaskText] = useState('')

    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.get(`${API_URL}todo/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setTasks(response.data);
        } catch (error) {
            console.error('An error occurred while fetching todos:', error);
        }
    };

    const addTask = async () => {
        if (newTask.trim() !== '') {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No access token found');
                    return;
                }
                const response = await axios.post(`${API_URL}todo/`,
                    { text: newTask },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setTasks([...tasks, response.data]);
                setNewTask('');
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    }

    const toggleTask = async (id: number) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No access token found');
                    return;
                }
                const response = await axios.patch(`${API_URL}todo/${id}/`,
                    { completed: !task.completed },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    }
                );
                setTasks(tasks.map(task =>
                    task.id === id ? response.data : task
                ));
            } catch (error) {
                console.error('Failed to toggle task:', error);
            }
        }
    };

    const deleteTask = async (id: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No access token found');
                return;
            }

            await axios.delete(`${API_URL}todo/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const startEditingTask = (task: Task) => {
        setEditingTask(task)
        setEditedTaskText(task.text)
    }

    const saveEditedTask = async () => {
        if (editingTask && editedTaskText.trim() !== '' && editingTask.text !== editedTaskText.trim()) {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No access token found');
                    return;
                }

                const response = await axios.patch(`${API_URL}todo/${editingTask.id}/`,
                    { text: editedTaskText.trim() },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                setTasks(tasks.map(task =>
                    task.id === editingTask.id ? response.data : task
                ));
                setEditingTask(null);
                setEditedTaskText('');
            } catch (error) {
                console.error('Failed to save edited task:', error);
            }
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
            {tasks.length === 0 ? (
                <div className="text-center">
                    <ClipboardList className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                    <p className="text-xl font-semibold">No tasks yet. Add one to get started!</p>
                </div>
            ) : (
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
            )}

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