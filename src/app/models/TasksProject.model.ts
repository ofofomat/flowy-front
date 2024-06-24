export interface  TaskProject {
  tasksProjectId?: number;
  title: string;
  description: string;
  date: Date;
  priority: Priority;
}

enum Priority {
  TRIVIAL = 'TRIVIAL',
  LOW = 'LOW', 
  AVERAGE = 'AVERAGE',
  HIGH = 'HIGH',
}