import { startTransition, useEffect, useEffectEvent, useState } from 'react';
import './pinky-playground.css';

type RunResult = {
    success: boolean;
    source: string;
    tokens: string[];
    ast: string;
    output: string;
    errorType: string | null;
    errorMessage: string | null;
    errorLine: number;
};

type RuntimeModule = {
    runSource(source: string, includeDebug: boolean): string;
};

const SAMPLE_PROGRAM = 'println 1 + 2';

async function loadRuntime(): Promise<RuntimeModule> {
    return import(/* @vite-ignore */ `${import.meta.env.BASE_URL}generated/js/jpinky-runtime.js`);
}

export default function PinkyPlayground() {
    const [source, setSource] = useState(SAMPLE_PROGRAM);
    const [result, setResult] = useState<RunResult | null>(null);
    const [busy, setBusy] = useState(false);
    const [runtimeError, setRuntimeError] = useState<string | null>(null);

    const runProgram = useEffectEvent(async (nextSource: string) => {
        setBusy(true);
        setRuntimeError(null);

        try {
            const runtime = await loadRuntime();
            const nextResult = JSON.parse(runtime.runSource(nextSource, true)) as RunResult;
            startTransition(() => {
                setResult(nextResult);
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? `${error.message} The portfolio repo is source-only; generate the runtime from jpinky or use the deploy workflow.`
                    : 'Failed to load the jpinky browser runtime. Generate the runtime from jpinky or use the deploy workflow.';
            setRuntimeError(message);
            setResult(null);
        } finally {
            setBusy(false);
        }
    });

    useEffect(() => {
        void runProgram(SAMPLE_PROGRAM);
    }, []);

    return (
        <section className="playground">
            <div className="playground__header">
                <div>
                    <p className="eyebrow">Live demo</p>
                    <h2 className="playground__title">The sample program runs in the browser through TeaVM.</h2>
                </div>
                <button className="button button-primary" type="button" onClick={() => void runProgram(source)} disabled={busy}>
                    {busy ? 'Running...' : 'Run jpinky'}
                </button>
            </div>

            <div className="playground__grid">
                <label className="playground__panel">
                    <span className="playground__label">Source</span>
                    <textarea value={source} onChange={(event) => setSource(event.target.value)} spellCheck={false} />
                </label>

                <div className="playground__panel playground__panel--output">
                    <span className="playground__label">Output</span>
                    {runtimeError ? <pre>{runtimeError}</pre> : <pre>{result?.success ? result.output || '(no output)' : result?.errorMessage || 'Loading runtime...'}</pre>}
                    {result && !result.success ? <p className="playground__error">{result.errorType} error on line {result.errorLine}</p> : null}
                </div>
            </div>

            <div className="playground__details">
                <div className="playground__panel">
                    <span className="playground__label">Tokens</span>
                    <pre>{result?.tokens.join('\n') || 'No tokens yet.'}</pre>
                </div>
                <div className="playground__panel">
                    <span className="playground__label">AST</span>
                    <pre>{result?.ast || 'No AST yet.'}</pre>
                </div>
            </div>
        </section>
    );
}