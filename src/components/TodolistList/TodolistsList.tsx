import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {TodolistType} from "../../redux/todolistsReducer";






export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolist)




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