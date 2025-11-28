import { type Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
  if (isLoading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>⏳ Carregando tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div style={styles.container}>
        <p style={styles.empty}>📭 Nenhuma task cadastrada ainda!</p>
      </div>
    );
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'to-do': return '📋';
      case 'doing': return '⚡';
      case 'done': return '✅';
      default: return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'to-do': return '#2196F3';
      case 'doing': return '#FF9800';
      case 'done': return '#4CAF50';
      default: return '#999';
    }
  };

  return (
    <div style={styles.container}>
      <h2>📋 Lista de Tasks ({tasks.length})</h2>
      <div style={styles.grid}>
        {tasks.map((task) => (
          <div key={task.id} style={styles.card}>
            <div style={styles.header}>
              <h3 style={styles.title}>{task.title}</h3>
              <span 
                style={{
                  ...styles.badge,
                  backgroundColor: getStatusColor(task.status),
                }}
              >
                {getStatusEmoji(task.status)} {task.status}
              </span>
            </div>
            
            {task.description && (
              <p style={styles.description}>{task.description}</p>
            )}
            
            <div style={styles.footer}>
              <small style={styles.date}>
                🕐 {new Date(task.createdAt).toLocaleString('pt-BR')}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  loading: {
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '18px',
  },
  empty: {
    textAlign: 'center' as const,
    color: '#999',
    fontSize: '18px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    marginTop: '16px',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fafafa',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase' as const,
  },
  description: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '12px',
  },
  footer: {
    borderTop: '1px solid #e0e0e0',
    paddingTop: '8px',
  },
  date: {
    color: '#999',
    fontSize: '12px',
  },
};