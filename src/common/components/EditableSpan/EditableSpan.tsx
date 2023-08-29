import {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import sl from 'common/components/EditableSpan/EditableSpan.module.css';
import {appActions} from 'app/appReducer';
import {useAppDispatch} from 'common/hooks';

type EditableSpanProps = {
    title: string
    callback: (newTitle:string) => void
}


export const EditableSpan: FC<EditableSpanProps> = memo(({
                                 title,
                                 callback,
                             }) => {
    const [editMode, setEditMode] = useState(false)
    // =================================================================================================================
    const dispatch = useAppDispatch()
    const [valueTitle, setValueTitle] = useState(title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValueTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        if (valueTitle.length > 30) {
            dispatch(appActions.setAppError({error: 'Title`s length should be less than 27 chars.'}))
        } else if (valueTitle.length <= 0) {
            dispatch(appActions.setAppError({error: 'Title should not be empty.'}))
        } else {
            dispatch(appActions.setAppError({error: null}))
            callback(valueTitle)
            setEditMode(false)
        }
    }
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return (
        editMode
            ?
            <input className={sl.inputEdit}
                   value={valueTitle}
                   onChange={changeTitle}
                   onBlur={activateViewMode}
                   onKeyPress={pressEnter}
                   autoFocus={true}
            />
            :
            <span onDoubleClick={()=>setEditMode(true)}>
                {title}
            </span>
    );
});