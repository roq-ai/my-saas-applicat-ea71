import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LearningScheduleInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  start_date: any;
  end_date: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface LearningScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
}
