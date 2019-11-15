import { parentTask } from './parentTask';

export class task
{
    // constructor( ,,, ){

    // }
   /*  constructor( intiDate: Date)
    {
                this.startDate=intiDate;
    } */
    public taskname:string;
    public parentTask: parentTask;
    public priority: number;
    public startDate: Date;
    public endDate: Date;
    public selectedProjectName: string;
    public taskOwner: string;



}