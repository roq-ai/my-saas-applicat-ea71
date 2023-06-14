import { LearningGroupInterface } from 'interfaces/learning-group';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FlashcardDeckInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  learning_group_id: string;
  content_creator_id: string;
  created_at?: any;
  updated_at?: any;

  learning_group?: LearningGroupInterface;
  user?: UserInterface;
  _count?: {};
}

export interface FlashcardDeckGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  learning_group_id?: string;
  content_creator_id?: string;
}
