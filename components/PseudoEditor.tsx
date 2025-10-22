"use client"

import { useEffect, useRef, useState } from "react"
import Editor, { useMonaco } from "@monaco-editor/react"

interface PseudoEditorProps {
    code: string
    onChange: (value: string) => void
}

export default function PseudoEditor({ code, onChange }: PseudoEditorProps) {
    const monaco = useMonaco()
    const editorRef = useRef<any>(null)
    const [theme, setTheme] = useState<"vs-dark" | "vs-light">("vs-light")

    // Detect theme after mount (avoid SSR issue)
    useEffect(() => {
        if (typeof document !== "undefined") {
            const isDark = document.documentElement.classList.contains("dark")
            setTheme(isDark ? "vs-dark" : "vs-light")
        }
    }, [])

    // Register pseudocode language + autocomplete
    useEffect(() => {
        if (!monaco) return

        monaco.languages.register({ id: "pseudocode" })

        monaco.languages.setMonarchTokensProvider("pseudocode", {
            tokenizer: {
                root: [
                    [/\b(if|else|then|endif|while|do|endwhile|for|to|next|repeat|until|function|return|begin|end|print|input|output)\b/, "keyword"],
                    [/\b(true|false)\b/, "boolean"],
                    [/[0-9]+/, "number"],
                    [/"[^"]*"/, "string"],
                    [/'.*$/, "comment"],
                    [/[a-zA-Z_][a-zA-Z0-9_]*/, "identifier"],
                    [/[\+\-\*\/\=<>!]+/, "operator"],
                ],
            },
        })
        monaco.languages.registerCompletionItemProvider("pseudocode", {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position)
                const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
                }

                return {
                suggestions: [
                    {
                    label: "if",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "if CONDITION then\n    \nendif",
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "If statement block",
                    range,
                    },
                    {
                    label: "while",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "while CONDITION do\n    \nendwhile",
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "While loop block",
                    range,
                    },
                    {
                    label: "for",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "for i = 1 to N do\n    \nnext i",
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "For loop block",
                    range,
                    },
                    {
                    label: "function",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "function name(params)\n    \nendfunction",
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Function definition",
                    range,
                    },
                    {
                    label: "print",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'print("message")',
                    documentation: "Print output",
                    range,
                    },
                ],
                }
            },
        })
    }, [monaco])

    return (
        <div className="h-full w-full border-border border rounded-lg overflow-hidden">
            <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-medium text-foreground">DSL Code</p>
                <p className="text-xs text-muted-foreground mt-1">Enter flowchart.js DSL syntax</p>
            </div>
            <Editor
                height="100%"
                language="pseudocode"
                value={code}
                onChange={(v) => onChange(v ?? "")}
                theme={theme}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    fontFamily: "JetBrains Mono, monospace",
                    wordWrap: "on",
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 10 },
                    renderLineHighlight: "all",
                }}
                onMount={(editor) => (editorRef.current = editor)}
            />
        </div>
    )
}
