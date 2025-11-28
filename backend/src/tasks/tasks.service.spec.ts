import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';

// Mock do PrismaService
const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      // Arrange
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'to-do' as const,
      };

      const mockCreatedTask = {
        id: 'uuid-123',
        title: 'Test Task',
        description: 'Test Description',
        status: 'to-do',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      mockPrismaService.task.create.mockResolvedValue(mockCreatedTask);

      // Act
      const result = await service.create(createTaskDto);

      // Assert
      expect(result).toEqual(mockCreatedTask);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: createTaskDto,
      });
      expect(mockPrismaService.task.create).toHaveBeenCalledTimes(1);
    });

    it('should create a task without description', async () => {
      // Arrange
      const createTaskDto = {
        title: 'Task without description',
        status: 'doing' as const,
      };

      const mockCreatedTask = {
        id: 'uuid-456',
        title: 'Task without description',
        description: null,
        status: 'doing',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      mockPrismaService.task.create.mockResolvedValue(mockCreatedTask);

      // Act
      const result = await service.create(createTaskDto);

      // Assert
      expect(result.title).toBe('Task without description');
      expect(result.description).toBeNull();
      expect(result.status).toBe('doing');
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      // Arrange
      const mockTasks = [
        {
          id: 'uuid-1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'to-do',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: 'uuid-2',
          title: 'Task 2',
          description: 'Description 2',
          status: 'done',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      mockPrismaService.task.findMany.mockResolvedValue(mockTasks);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockTasks);
      expect(result).toHaveLength(2);
      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(mockPrismaService.task.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no tasks exist', async () => {
      // Arrange
      mockPrismaService.task.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should call findMany with correct orderBy parameter', async () => {
      // Arrange
      mockPrismaService.task.findMany.mockResolvedValue([]);

      // Act
      await service.findAll();

      // Assert
      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  });
});