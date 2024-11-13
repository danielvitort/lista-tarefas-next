import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const tasks = await prisma.task.findMany({
                    orderBy: { presentationOrder: 'asc' }
                });
                res.status(200).json(tasks);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar tarefas' });
            }
            break;

        case 'POST':
            const { name, cost, dueDate } = req.body;
            try {
                console.log("Criando tarefa com os seguintes dados:", { name, cost, dueDate });
                const existingTask = await prisma.task.findUnique({
                    where: { name }
                });
                if (existingTask) {
                    return res.status(400).json({ error: 'Já existe uma tarefa com este nome' });
                }

                const lastTask = await prisma.task.findFirst({
                    orderBy: { presentationOrder: 'desc' }
                });
                const newOrder = lastTask ? lastTask.presentationOrder + 1 : 1;

                const newTask = await prisma.task.create({
                    data: {
                        name,
                        cost,
                        dueDate: dueDate && new Date(dueDate).toString() !== 'Invalid Date' ? new Date(dueDate) : '',
                        presentationOrder: newOrder
                    }
                });
                res.status(201).json(newTask);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao criar tarefa' });
            }
            break;

        case 'PATCH':
            const { taskOrder } = req.body;
            try {
                for (let i = 0; i < taskOrder.length; i++) {
                    await prisma.task.update({
                        where: { id: taskOrder[i] },
                        data: { presentationOrder: i + 1 }
                    });
                }
                res.status(200).json({ message: 'Ordem atualizada com sucesso' });
            } catch (error) {
                res.status(500).json({ error: 'Erro ao reordenar tarefas' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
            res.status(405).end(`Método ${method} não permitido`);
    }
}