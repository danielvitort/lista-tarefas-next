'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Task {
    id: number;
    name: string;
    cost: number;
    dueDate: string;
    order: number;
}

interface TaskTableProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: number) => void;
}

const TaskTable = ({ tasks, onEditTask, onDeleteTask }: TaskTableProps) => {
    const formatDateToDisplay = (date: string | Date): string => {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(parsedDate.getTime())) return '';
        const day = String(parsedDate.getUTCDate()).padStart(2, '0');
        const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
        const year = parsedDate.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <table className="w-full border-separate border-spacing-y-2">
            <thead>
                <tr className="text-center">
                    <th className="p-2">Nome</th>
                    <th className="p-2">Custo (R$)</th>
                    <th className="p-2">Data Limite</th>
                    <th className="p-2">Ações</th>
                </tr>
            </thead>
            <tbody>
                {tasks.sort((a, b) => a.order - b.order).map((task) => (
                    <tr key={task.id} className={`text-center ${task.cost >= 1000 ? 'bg-yellow-400' : 'bg-gray-100'}`}>
                        <td className="p-4">{task.name}</td>
                        <td className="p-4">R$ {task.cost.toFixed(2)}</td>
                        <td className="p-4">{formatDateToDisplay(task.dueDate)}</td>
                        <td className="p-4 flex space-x-4 justify-center">
                            <FaEdit className="text-blue-500 cursor-pointer" onClick={() => onEditTask(task)} />
                            <FaTrash className="text-red-500 cursor-pointer" onClick={() => onDeleteTask(task.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;