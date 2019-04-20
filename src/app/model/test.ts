export class TestCreate {
    test_name:string;
    date:string;
    athlete_id:number;
    coach_id:number;
    pattern_id:number;
}

export class TestModel {
    id:number;
    test_name:string;
    date:string;
    athlete_id:number;
    coach_id:number;
    createdAt:string;
    updatedAt:string;
}

export class LapModel {
    lap:number;
    time:string;
    from:string;
    to:string;
}

export interface Style {
    value: number;
    viewValue: string;
  }