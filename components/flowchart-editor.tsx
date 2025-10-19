"use client"

import { useEffect, useRef } from "react"

interface FlowchartEditorProps {
  code: string
  setCode: (code: string) => void
}

export default function FlowchartEditor({ code, setCode }: FlowchartEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">DSL Code</p>
        <p className="text-xs text-muted-foreground mt-1">Enter flowchart.js DSL syntax</p>
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 p-4 font-mono text-sm bg-card text-foreground border-0 outline-none resize-none placeholder-muted-foreground"
        placeholder="st=>start: Start&#10;e=>end: End&#10;st->e"
        spellCheck="false"
      />
    </div>
  )
}
