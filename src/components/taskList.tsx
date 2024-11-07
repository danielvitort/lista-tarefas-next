'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './taskForm';
import TaskTable from './taskTable';

interface Task {
    id: number;
    name: string;
    cost: number;
    dueDate: string;
    order: number;
}

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', cost: 0, dueDate: '' });
    const [editTaskId, setEditTaskId] = useState<number | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            const tasksWithFormattedDate = response.data.map((task: Task) => ({
                ...task,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
            }));
            setTasks(tasksWithFormattedDate);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const handleFormSubmit = async (formData: { name: string; cost: number; dueDate: string }) => {
        const formattedDueDate = new Date(formData.dueDate).toISOString().split('T')[0];
        const updatedEditData = {
            updatedName: formData.name,
            updatedCost: formData.cost,
            updatedDueDate: formattedDueDate
        };

        const updatedFormData = {
            name: formData.name,
            cost: formData.cost,
            dueDate: formattedDueDate || formData.dueDate
        };

        try {
            if (editTaskId !== null) {
                await axios.put(`/api/tasks/${editTaskId}`, updatedEditData);
            } else {
                await axios.post('/api/tasks', updatedFormData);
            }
            setIsFormVisible(false);
            fetchTasks();
        } catch (error) {
            console.error("Erro ao salvar a tarefa:", error);
            alert('Erro ao salvar a tarefa');
        }
    };

    const handleEditTask = (task: Task) => {
        setEditTaskId(task.id);
        setFormData({ name: task.name, cost: task.cost, dueDate: task.dueDate });
        setIsFormVisible(true);
    };

    const handleDeleteTask = async (taskId: number) => {
        if (confirm('Deseja excluir esta tarefa?')) {
            await axios.delete(`/api/tasks/${taskId}`);
            fetchTasks();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
            <button
                onClick={() => {
                    setIsFormVisible(true);
                    setEditTaskId(null);
                    setFormData({ name: '', cost: 0, dueDate: '' });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Incluir Nova Tarefa
            </button>

            {isFormVisible && (
                <TaskForm
                    onSubmit={handleFormSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    onCancel={() => setIsFormVisible(false)}
                    isEditing={editTaskId !== null}
                />
            )}

            <TaskTable tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
        </div>
    );
};

export default TaskList;