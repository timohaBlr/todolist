import React, {ChangeEvent, KeyboardEvent} from 'react';
type SuperInputPropsType = {
    title: string
    onChangeCallBack: (title: string) => void
    onKeyPressCallBack: (event: KeyboardEvent<HTMLInputElement>)=> void
}

export const SuperInput = (props: SuperInputPropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCallBack(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      props.onKeyPressCallBack(event)
    }
    return (
        <div>
            <input value={props.title} onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>
        </div>
    );
};

