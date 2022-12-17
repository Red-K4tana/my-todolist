import React, {ChangeEvent, useState} from 'react';
import {useWebworker} from "./use-webworker";

export const Fibonacci = () => {
    const [title, setTitle] = useState<any>(0)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const fibo = (n: number):number => {
        if (n < 2) return n
        return fibo(n - 1) + fibo(n - 2)
    }

    const [res, setRes] = useState<number>()

    const {result, run} = useWebworker(fibo)

    const handlerClick = () => {
        run(title)
    }
    /*const fibonacciGo = () => {
        setRes(fibo(title))
    }*/

    console.log('render fibo')
    return (
        <div>
            <input type={'text'} value={title} onChange={changeTitle}/>
            <p>{result}</p>
            <button onClick={handlerClick}>GO!</button>
        </div>
    );
};

