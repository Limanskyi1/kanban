// Main
export interface ISubtask {
    title:string;
    isCompleted: boolean;
}
// ===================>
export interface ITask {
    title:string;
    description: string;
    status: string;
    id: number | string;
    subtasks: ISubtask[];
}
// ===================>
export interface IColumn{
    id: string | number;
    name: string;
    tasks: ITask[];
}
// ===================>
export interface IBoard{
    name: string;
    id: number;
    columns: IColumn[];
}
//

