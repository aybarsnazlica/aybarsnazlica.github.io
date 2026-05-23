import type { editor, languages } from 'monaco-editor';

const LANGUAGE_ID = 'pinky';
const THEME_ID = 'pinky-vscode-light';

let configured = false;

const keywords = ['if', 'else', 'then', 'true', 'false', 'and', 'or', 'local', 'while', 'do', 'for', 'func', 'null', 'end', 'print', 'println', 'ret'];
const typeKeywords = ['true', 'false', 'null'];

export function configurePinkyMonaco(monaco: typeof import('monaco-editor')) {
    if (configured) {
        return;
    }

    configured = true;

    monaco.languages.register({ id: LANGUAGE_ID });
    monaco.languages.setLanguageConfiguration(LANGUAGE_ID, {
        comments: {
            lineComment: '--',
        },
        brackets: [
            ['(', ')'],
            ['[', ']'],
            ['{', '}'],
        ],
        autoClosingPairs: [
            { open: '(', close: ')' },
            { open: '[', close: ']' },
            { open: '{', close: '}' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
        ],
        surroundingPairs: [
            { open: '(', close: ')' },
            { open: '[', close: ']' },
            { open: '{', close: '}' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
        ],
    });

    monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, pinkyTokenizer);

    monaco.editor.defineTheme(THEME_ID, {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '008000', fontStyle: 'italic' },
            { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
            { token: 'keyword.flow', foreground: '0000FF', fontStyle: 'bold' },
            { token: 'keyword.constant', foreground: '0000FF' },
            { token: 'identifier.function', foreground: '795E26' },
            { token: 'identifier.definition', foreground: '795E26', fontStyle: 'bold' },
            { token: 'number', foreground: '098658' },
            { token: 'number.float', foreground: '098658' },
            { token: 'string', foreground: 'A31515' },
            { token: 'operator', foreground: '000000' },
            { token: 'delimiter', foreground: '000000' },
        ],
        colors: {
            'editor.background': '#FFFFFF',
            'editor.foreground': '#000000',
            'editor.lineHighlightBackground': '#F3F3F3',
            'editorLineNumber.foreground': '#237893',
            'editorLineNumber.activeForeground': '#0B216F',
            'editorIndentGuide.background1': '#D3D3D3',
            'editorIndentGuide.activeBackground1': '#939393',
            'editor.selectionBackground': '#ADD6FF',
            'editor.inactiveSelectionBackground': '#E5EBF1',
            'editorCursor.foreground': '#000000',
        },
    });
}

export const pinkyLanguageId = LANGUAGE_ID;
export const pinkyThemeId = THEME_ID;

const pinkyTokenizer: languages.IMonarchLanguage = {
    defaultToken: '',
    keywords,
    typeKeywords,
    tokenizer: {
        root: [
            [/--.*$/, 'comment'],
            [/\b(func)(\s+)([A-Za-z_][\w]*)/, ['keyword', '', 'identifier.definition']],
            [/\b(true|false|null)\b/, 'keyword.constant'],
            [/\b(if|else|then|and|or|local|while|do|for|func|end|print|println|ret)\b/, 'keyword.flow'],
            [/\b[A-Za-z_][\w]*(?=\s*\()/, 'identifier.function'],
            [/\b[A-Za-z_][\w]*\b/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier',
                },
            }],
            [/\d+\.\d+/, 'number.float'],
            [/\d+/, 'number'],
            [/'([^'\\]|\\.)*'/, 'string'],
            [/"([^"\\]|\\.)*"/, 'string'],
            [/:=|==|~=|<=|>=|[=<>+\-*\/\^%?:]/, 'operator'],
            [/[(){}\[\],.;]/, 'delimiter'],
        ],
    },
};

export type PinkyEditorInstance = editor.IStandaloneCodeEditor;