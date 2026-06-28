import Editor from '@monaco-editor/react';
import { startTransition, useEffect, useEffectEvent, useState } from 'react';
import { SAMPLE_PROGRAM } from 'tspinky/sample';
import type { RunResult } from 'tspinky/browser';
import './pinky-playground.css';
import { configurePinkyMonaco, pinkyLanguageId, pinkyThemeId } from './pinkyMonaco';

type RuntimeModule = {
    runSource(source: string, includeDebug: boolean): RunResult;
};

async function loadRuntime(): Promise<RuntimeModule> {
    return import('tspinky/browser');
}

export default function TspinkyPlayground() {
    const [source, setSource] = useState(SAMPLE_PROGRAM);
    const [result, setResult] = useState<RunResult | null>(null);
    const [busy, setBusy] = useState(false);
    const [runtimeError, setRuntimeError] = useState<string | null>(null);

    const output = result?.success ? result.output : result?.errorMessage || 'Loading runtime...';
    const svgMarkup = result?.success ? getSvgMarkup(result.output) : null;
    const svgPreviewSrc = svgMarkup ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}` : null;

    const runProgram = useEffectEvent(async (nextSource: string) => {
        setBusy(true);
        setRuntimeError(null);

        try {
            const runtime = await loadRuntime();
            const nextResult = runtime.runSource(nextSource, true);
            startTransition(() => {
                setResult(nextResult);
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load the tspinky browser runtime.';
            setRuntimeError(message);
            setResult(null);
        } finally {
            setBusy(false);
        }
    });

    useEffect(() => {
        void runProgram(SAMPLE_PROGRAM);
    }, []);

    const handleEditorMount = useEffectEvent((editor, monaco) => {
        configurePinkyMonaco(monaco);
        editor.updateOptions({ tabSize: 4 });
    });

    return (
        <section className="playground">
            <div className="playground__header">
                <div>
                    <p className="eyebrow">Live demo</p>
                    <h2 className="playground__title">The sample program runs in the browser through the TypeScript interpreter.</h2>
                </div>
                <button className="button button-primary" type="button" onClick={() => void runProgram(source)} disabled={busy}>
                    {busy ? 'Running...' : 'Run'}
                </button>
            </div>

            <div className="playground__grid">
                <div className="playground__panel">
                    <span className="playground__label">Source</span>
                    <div className="playground__editor">
                        <Editor
                            defaultLanguage={pinkyLanguageId}
                            defaultValue={SAMPLE_PROGRAM}
                            language={pinkyLanguageId}
                            theme={pinkyThemeId}
                            value={source}
                            beforeMount={configurePinkyMonaco}
                            onMount={handleEditorMount}
                            onChange={(value) => setSource(value ?? '')}
                            options={{
                                automaticLayout: true,
                                fontFamily: 'var(--font-mono)',
                                fontLigatures: false,
                                fontSize: 15,
                                lineNumbersMinChars: 3,
                                minimap: { enabled: false },
                                padding: { top: 16, bottom: 16 },
                                scrollBeyondLastLine: false,
                                tabSize: 4,
                                wordWrap: 'off',
                            }}
                        />
                    </div>
                    <div className="playground__actions">
                        <button className="button button-secondary playground__clear-button" type="button" onClick={() => setSource('')} disabled={!source}>
                            Clear
                        </button>
                    </div>
                </div>

                <div className="playground__panel playground__panel--output">
                    <span className="playground__label">Output</span>
                    {runtimeError ? <pre>{runtimeError}</pre> : svgPreviewSrc ? <div className="playground__preview"><img src={svgPreviewSrc} alt="Program SVG output" /></div> : <pre>{output || '(no output)'}</pre>}
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

function getSvgMarkup(output: string) {
    const trimmedOutput = output.trim();

    if (!trimmedOutput.startsWith('<svg') || !trimmedOutput.endsWith('</svg>')) {
        return null;
    }

    return trimmedOutput;
}