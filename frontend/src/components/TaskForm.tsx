import { useState, type FormEvent } from 'react';
import { type CreateTaskDto } from '../types/task';

interface TaskFormProps {
  onSubmit: (task: CreateTaskDto) => void;
  isLoading: boolean;
}

export function TaskForm({ onSubmit, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'to-do' | 'doing' | 'done'>('to-do');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('O título é obrigatório!');
      return;
    }

    onSubmit({
      title,
      description: description.trim() || undefined,
      status,
    });

    setTitle('');
    setDescription('');
    setStatus('to-do');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>📝 Criar Nova Task</h2>
      
      <div style={styles.field}>
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da task..."
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição (opcional)..."
          style={styles.textarea}
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'to-do' | 'doing' | 'done')}
          style={styles.select}
          disabled={isLoading}
        >
          <option value="to-do">📋 To Do</option>
          <option value="doing">⚡ Doing</option>
          <option value="done">✅ Done</option>
        </select>
      </div>

      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? '⏳ Criando...' : '➕ Criar Task'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px',
  },
  field: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '4px',
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '4px',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
  },
  select: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '4px',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
  },
};