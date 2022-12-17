import {useState} from "react";
import {Worker} from "worker_threads";


const workerHandler = (fn: any) => {

    onmessage = (event: any) => {
        postMessage(fn(event.data))
    }
}

export const useWebworker = (fn: any) => {
    const [result, setResult] = useState<any>(null)

    const run = (value: any) => {
        const worker = new Worker(
            URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
        )
        worker.on("message", (event: any) => {
            setResult(event.data)
            worker.terminate()
        })
        worker.postMessage(value)
    }
    return {
        result,
        run,
    }
}