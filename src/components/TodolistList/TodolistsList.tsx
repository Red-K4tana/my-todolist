import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {TodolistType} from "../../redux/todolistsReducer";
import {Todolist} from "../Todolist/Todolist";






export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)




    return (
        <div className={'todolistList'}>
            {todolists.map(tl => {

                return (
                    <div key={tl.id}>
                        <Todolist
                            todolistID = {tl.id}
                        />
                    </div>
                )
            })
            }
        </div>
    );
};