import { Modules } from './module';
import { Student } from './student';

export interface ValidateModule {
    module: Modules;
    student: Student;
    status: string;
}