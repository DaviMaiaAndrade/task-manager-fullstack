import { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { taskService } from './services/api';
import { type Task, type CreateTaskDto } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Carregar tasks ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsFetching(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tasks:', error);
      alert('Erro ao carregar tasks! Verifique se o backend está rodando.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      setIsLoading(true);
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]); // Adiciona no início
      alert('✅ Task criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar task:', error);
      alert('❌ Erro ao criar task!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>✅ Task Manager</h1>
        <p>Gerencie suas tarefas de forma simples e eficiente</p>
      </header>

      <main style={styles.main}>
        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
        <TaskList tasks={tasks} isLoading={isFetching} />
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '32px 24px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
};

export default App;