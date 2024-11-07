interface TaskFormProps {
    onSubmit: (formData: { name: string; cost: number; dueDate: string }) => void;
    formData: { name: string; cost: number; dueDate: string };
    setFormData: React.Dispatch<React.SetStateAction<{ name: string; cost: number; dueDate: string }>>;
    onCancel: () => void;
    isEditing: boolean;
}

const TaskForm = ({ onSubmit, formData, setFormData, onCancel, isEditing }: TaskFormProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: name === 'cost' ? parseFloat(value) : value }));
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="mb-4 p-4 border rounded">
            <h2 className="text-xl mb-2">{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <div className="mb-2">
                <label className="block">Nome da Tarefa</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border rounded w-full p-2"
                />
            </div>
            <div className="mb-2">
                <label className="block">Custo (R$)</label>
                <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    required
                    className="border rounded w-full p-2"
                />
            </div>
            <div className="mb-2">
                <label className="block">Data Limite</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate ? formData.dueDate : ''}
                    onChange={handleInputChange}
                    required
                    className="border rounded w-full p-2"
                />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                {isEditing ? 'Salvar Alterações' : 'Adicionar Tarefa'}
            </button>
            <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancelar
            </button>
        </form>
    );
};

export default TaskForm;