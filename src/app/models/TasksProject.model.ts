export interface  TaskProject {
  id?: number;
  tasksProjectId?: number;
  title: string;
  description: string;
  date: Date;
  priority: Priority;
  projectId?: number;
}

enum Priority {
  TRIVIAL = 'TRIVIAL',
  LOW = 'LOW', 
  AVERAGE = 'AVERAGE',
  HIGH = 'HIGH',
}