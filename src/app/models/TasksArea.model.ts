export interface TaskArea {
  tasksId?: number;
  title: string;
  description: string;
  recurrence: string;
  priority: Priority;
  areasId?: number;
}

enum Priority {
  TRIVIAL = 'TRIVIAL',
  LOW = 'LOW', 
  AVERAGE = 'AVERAGE',
  HIGH = 'HIGH',
}