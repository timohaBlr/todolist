import React from 'react';
type SuperButtonPropsType = {
    title:string
    callBack: ()=> void
}
export const SuperButton = (props: SuperButtonPropsType) => {
    const onClickHandler = () => {
      props.callBack()
    }
    return (
        <div>
            <button onClick={onClickHandler}>{props.title}</button>
        </div>
    );
};

