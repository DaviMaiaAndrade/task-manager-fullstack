import { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskColumn } from './components/TaskColumn';
import { taskService } from './services/api';
import { type Task, type CreateTaskDto } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tasks:', error);
      alert('Erro ao carregar tasks. Verifique se o backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      setIsLoading(true);
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      alert('✅ Task criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar task:', error);
      alert('❌ Erro ao criar task. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F3F4F6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>

      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <span style={{ fontSize: '40px' }}>📊</span>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '32px',
                fontWeight: '700',
              }}>
                Task Manager
              </h1>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                opacity: 0.9,
              }}>
                Organize suas tarefas de forma eficiente
              </p>
            </div>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px',
      }}>

        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />

        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          overflowX: 'auto',
          paddingBottom: '24px',
        }}>
          <TaskColumn
            title="To Do"
            status="to-do"
            tasks={tasks}
            color="#3B82F6"            
          />
          <TaskColumn
            title="Doing"
            status="doing"
            tasks={tasks}
            color="#F59E0B"            
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={tasks}
            color="#10B981"            
          />
        </div>

        {tasks.length === 0 && !isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: 'white',
            borderRadius: '16px',
            marginTop: '32px',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              color: '#1F2937',
            }}>
              Nenhuma task cadastrada
            </h2>
            <p style={{
              margin: 0,
              fontSize: '16px',
              color: '#6B7280',
            }}>
              Crie sua primeira task usando o formulário acima!
            </p>
          </div>
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: '#6B7280',
        fontSize: '14px',
      }}>       
      </footer>
    </div>
  );
}

export default App;