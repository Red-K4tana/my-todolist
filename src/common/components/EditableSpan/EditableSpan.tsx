import {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import sl from 'common/components/EditableSpan/EditableSpan.module.css';
import {appActions} from 'app/appReducer';
import {useActions, useAppDispatch} from 'common/hooks';

type EditableSpanProps = {
    title: string
    callback: (newTitle:string) => void
}


export const EditableSpan: FC<EditableSpanProps> = memo(({
                                 title,
                                 callback,
                             }) => {
    console.log('EditableSpan render')
    const [editMode, setEditMode] = useState(false)
    // =================================================================================================================
    const dispatch = useAppDispatch()
    const { setAppError } = useActions(appActions)
    const [valueTitle, setValueTitle] = useState(title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValueTitle(e.currentTarget.value)
    }
    const maxLengthChars: number = 30
    const activateViewMode = () => {
        if (valueTitle.length > maxLengthChars) {
            setAppError({error: 'Title`s length should be less than ' + maxLengthChars + ' chars.'})
        } else if (valueTitle.length <= 0) {
            setAppError({error: 'Title should not be empty.'})
        } else {
            setAppError({error: null})
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