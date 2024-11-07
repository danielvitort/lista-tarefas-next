import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { taskId } = req.query;

    switch (method) {
        case 'GET':
            try {
                const task = await prisma.task.findUnique({
                    where: { id: Number(taskId) }
                });
                if (!task) {
                    return res.status(404).json({ error: 'Tarefa não encontrada' });
                }
                res.status(200).json(task);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar tarefa' });
            }
            break;

        case 'PUT':
            const { updatedName, updatedCost, updatedDueDate } = req.body;

            try {
                // Imprimir os dados recebidos para depuração
                console.log("Atualizando tarefa com os seguintes dados:", { updatedName, updatedCost, updatedDueDate });

                // Verifique se todos os campos necessários estão presentes
                if (!updatedName || !updatedCost || !updatedDueDate) {
                    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
                }

                // Verifique se já existe uma tarefa com o mesmo nome (exceto a que está sendo editada)
                const existingTask = await prisma.task.findUnique({
                    where: { name: updatedName }
                });

                if (existingTask && existingTask.id !== Number(taskId)) {
                    console.log('Tarefa já existente com este nome');
                    return res.status(400).json({ error: 'Já existe uma tarefa com este nome' });
                }

                // Verifique se a data fornecida é válida
                let validDueDate = new Date(updatedDueDate);
                if (isNaN(validDueDate.getTime())) {
                    return res.status(400).json({ error: 'Data inválida' });
                }

                // Atualize a tarefa
                const updatedTask = await prisma.task.update({
                    where: { id: Number(taskId) },
                    data: {
                        name: updatedName,
                        cost: updatedCost,
                        dueDate: validDueDate // Atribuindo a data validada
                    }
                });

                // Retorne a tarefa atualizada
                res.status(200).json(updatedTask);
            } catch (error) {
                // Em caso de erro, log o erro completo para depuração
                console.error('Erro ao atualizar tarefa:', error);
                res.status(500).json({ error: 'Erro ao atualizar tarefa' });
            }
            break;

        case 'DELETE':
            try {
                await prisma.task.delete({ where: { id: Number(taskId) } });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: 'Erro ao excluir tarefa' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${method} não permitido`);
    }
}