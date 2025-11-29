import { useState } from 'react';
import { type CreateTaskDto } from '../types/task';

interface TaskFormProps {
  onSubmit: (task: CreateTaskDto) => void;
  isLoading: boolean;
}

export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'to-do' | 'doing' | 'done'>('to-do');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('O título é obrigatório!');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    });

    setTitle('');
    setDescription('');
    setStatus('to-do');
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      marginBottom: '32px',
      border: '1px solid #E5E7EB',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
      }}>       
        <h2 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: '700',
          color: '#1F2937',
        }}>
          Nova Task
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

          <div style={{ flex: '1 1 300px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
            }}>
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Implementar autenticação"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: isLoading ? '#F9FAFB' : 'white',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3B82F6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ flex: '0 1 200px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
            }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'to-do' | 'doing' | 'done')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer',
                backgroundColor: isLoading ? '#F9FAFB' : 'white',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3B82F6';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
              }}
            >
              <option value="to-do">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',            
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
          }}>
            Descrição (opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione detalhes sobre a task..."
            disabled={isLoading}
            rows={3}
            style={{
              width: '100%',
              fontSize: '15px',
              paddingLeft: '16px',
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
              backgroundColor: isLoading ? '#F9FAFB' : 'white',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: isLoading ? '#9CA3AF' : '#3B82F6',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#2563EB';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
            }
          }}
        >
          {isLoading ? '⏳ Criando...' : '➕ Criar Task'}
        </button>
      </form>
    </div>
  );
};