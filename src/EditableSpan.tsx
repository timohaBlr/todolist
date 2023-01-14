import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useCallback, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan from:', props.value)
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = useCallback( () => {
        setEditMode(true);
        setTitle(props.value);
    },[props.value])

    const activateViewMode = useCallback(() => {
        setEditMode(false);
            props.onChange(title);
    },[props.onChange,title])

    const changeTitle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        },[])

    return editMode
        ? <TextField variant="outlined"
                     autoFocus
                     value={title}
                     onChange={changeTitle}
                     onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})

