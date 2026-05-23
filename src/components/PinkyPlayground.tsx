import Editor from '@monaco-editor/react';
import { startTransition, useEffect, useEffectEvent, useState } from 'react';
import './pinky-playground.css';
import { configurePinkyMonaco, pinkyLanguageId, pinkyThemeId } from './pinkyMonaco';

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

const SAMPLE_PROGRAM = `angle := 0
x := 25
y := 60

func pow(base, exponent)
    ret base ^ exponent
end

func factorial(n)
    res := 1.0
    for i := 1, n do
        res := res * i
    end
    ret res
end

func cos(a)
    a := a % 360
    if a == 0   then ret  1.0 end
    if a == 90  then ret  0.0 end
    if a == 180 then ret -1.0 end
    if a == 270 then ret  0.0 end
    if a == 360 then ret  1.0 end
    ret -99999
end

func sin(a)
    a := a % 360
    if a == 0   then ret  0.0 end
    if a == 90  then ret  1.0 end
    if a == 180 then ret  0.0 end
    if a == 270 then ret -1.0 end
    if a == 360 then ret  0.0 end
    ret -99999
end

func dragon(size, level, d)
    if level == 0 then
        x := x - cos(angle) * size
        y := y + sin(angle) * size
        println '    L ' + x + ' ' + y
    else
        dragon(size / 1.4142135624, level - 1, 1)
        angle := angle - d * 90
        dragon(size / 1.4142135624, level - 1, -1)
    end
end

println '<svg'
println '    xmlns="http://www.w3.org/2000/svg"'
println '    width="800"'
println '    height="800"'
println '    viewBox="-50 -50 200 200"'
println '    style="background-color:black">'
println ''
println '  <path'
println '    d="'
println '      M 25 60'
dragon(80, 12, 1)
println '    "'
println '    stroke="red"'
println '    stroke-width="0.5"'
println '    fill="none" />'
println '</svg>'`;

async function loadRuntime(): Promise<RuntimeModule> {
    return import(/* @vite-ignore */ `${import.meta.env.BASE_URL}generated/js/jpinky-runtime.js`);
}

export default function PinkyPlayground() {
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

    const handleEditorMount = useEffectEvent((editor, monaco) => {
        configurePinkyMonaco(monaco);
        editor.updateOptions({ tabSize: 4 });
    });

    return (
        <section className="playground">
            <div className="playground__header">
                <div>
                    <p className="eyebrow">Live demo</p>
                    <h2 className="playground__title">The sample program runs in the browser through TeaVM.</h2>
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