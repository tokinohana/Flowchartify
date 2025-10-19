"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import FlowchartEditor from "@/components/flowchart-editor"
import FlowchartPreview from "@/components/flowchart-preview"

export default function Home() {
  const [code, setCode] = useState("st=>start: Start\ne=>end: End\nst->e")
  const [renderTrigger, setRenderTrigger] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleRender = () => {
    setRenderTrigger((prev) => prev + 1)
  }

  const handleClear = () => {
    setCode("")
    setRenderTrigger((prev) => prev + 1)
  }

  const handleDownloadPNG = async () => {
    if (!previewRef.current) return

    const svg = previewRef.current.querySelector("svg")
    if (!svg) {
      alert("No flowchart to download. Please render a flowchart first.")
      return
    }

    try {
      const { toPng } = await import("html-to-image")
      const dataUrl = await toPng(svg)
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = "flowchart.png"
      link.click()
    } catch (error) {
      console.error("Error downloading PNG:", error)
      alert("Failed to download PNG")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              F
            </div>
            <h1 className="text-xl font-bold text-foreground">Flowchartify</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRender} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Render
            </Button>
            <Button
              onClick={handleDownloadPNG}
              variant="outline"
              className="border-border hover:bg-muted bg-transparent"
            >
              Download PNG
            </Button>
            <Button onClick={handleClear} variant="outline" className="border-border hover:bg-muted bg-transparent">
              Clear
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex-1 border-r border-border overflow-hidden">
          <FlowchartEditor code={code} setCode={setCode} />
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 overflow-hidden bg-muted/30">
          <FlowchartPreview ref={previewRef} code={code} renderTrigger={renderTrigger} />
        </div>
      </div>
    </div>
  )
}
