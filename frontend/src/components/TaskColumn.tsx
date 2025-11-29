import { type Task } from '../types/task';

interface TaskColumnProps {
  title: string;
  status: 'to-do' | 'doing' | 'done';
  tasks: Task[];
  color: string;
}

export const TaskColumn = ({ title, status, tasks, color }: TaskColumnProps) => {
  const filteredTasks = tasks.filter(task => task.status === status);

  const getStatusBadgeColor = () => {
    switch (status) {
      case 'to-do':
        return '#3B82F6';
      case 'doing':
        return '#F59E0B';
      case 'done':
        return '#10B981';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{
      flex: 1,
      minWidth: '320px',
      backgroundColor: '#F9FAFB',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '12px',
        borderBottom: `3px solid ${color}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>          
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#1F2937',
          }}>
            {title}
          </h2>
        </div>
        <span style={{
          backgroundColor: color,
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
        }}>
          {filteredTasks.length}
        </span>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minHeight: '400px',
        maxHeight: '600px',
        overflowY: 'auto',
        paddingRight: '4px',
      }}>
        {filteredTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#9CA3AF',
            fontSize: '14px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>📭</div>
            Nenhuma task aqui
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E5E7EB',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >

              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: '#1F2937',
                lineHeight: '1.4',
              }}>
                {task.title}
              </h3>

              {task.description && (
                <p style={{
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  color: '#6B7280',
                  lineHeight: '1.5',
                }}>
                  {task.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid #F3F4F6',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#9CA3AF',
                }}>
                  <span>🕐</span>
                  <span>{formatDate(task.createdAt)}</span>
                </div>
                <div style={{
                  backgroundColor: `${getStatusBadgeColor()}15`,
                  color: getStatusBadgeColor(),
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}>
                  {status === 'to-do' && 'To Do'}
                  {status === 'doing' && 'Doing'}
                  {status === 'done' && 'Done'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};