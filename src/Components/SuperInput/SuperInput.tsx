import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './SuperInput.module.css'

type SuperInputPropsType = {
    title: string
    onChangeCallBack: (title: string) => void
    onKeyPressCallBack: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const SuperInput = (props: SuperInputPropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCallBack(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        props.onKeyPressCallBack(event)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.inputBox}>
                <input type={'text'} className={props.title ? s.active : ''} value={props.title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <span>Your text...</span>
            </div>
        </div>
    );
};

