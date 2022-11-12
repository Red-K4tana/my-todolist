import React from 'react';
import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksStateType = {
    [todolist_id: string]: [TaskType]
}




export const TodolistsList = () => {





    return (
        <div>
            {todolists.map(tl => {

                return (
                    <div key={tl.id} className={'todolistItem'}>
                        {tl.title}
                    </div>
                )
            })
            }
        </div>
    );
};