export interface TaskArea {
  tasksId?: number;
  title: string;
  description: string;
  recurrence: string;
  priority: Priority;
}

enum Priority {
  TRIVIAL = 'TRIVIAL',
  LOW = 'LOW', 
  AVERAGE = 'AVERAGE',
  HIGH = 'HIGH',
}