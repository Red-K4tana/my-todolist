import React, {ChangeEvent, useState} from 'react';

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
    const fibonacciGo = () => {
        setRes(fibo(title))
    }

    console.log('render fibo')
    return (
        <div>
            <input type={'text'} value={title} onChange={changeTitle}/>
            <p>{res}</p>
            <button onClick={fibonacciGo}>GO!</button>
        </div>
    );
};

