"use client"

import { useEffect, forwardRef } from "react"

interface FlowchartPreviewProps {
  code: string
  renderTrigger: number
}

const FlowchartPreview = forwardRef<HTMLDivElement, FlowchartPreviewProps>(({ code, renderTrigger }, ref) => {
  useEffect(() => {
    const renderFlowchart = async () => {
      if (!code.trim()) {
        if (ref && "current" in ref && ref.current) {
          ref.current.innerHTML = ""
        }
        return
      }

      try {
        // Dynamically import flowchart.js
        const flowchart = await import("flowchart.js")

        if (ref && "current" in ref && ref.current) {
          ref.current.innerHTML = ""

          // Parse and render the flowchart
          const diagram = flowchart.parse(code)
          diagram.drawSVG("flowchart-container", {
            x: 0,
            y: 0,
            "line-width": 3,
            "line-length": 50,
            "text-margin": 10,
            "font-size": 14,
            "font-family": "Geist, sans-serif",
            "font-color": "hsl(var(--foreground))",
            "line-color": "hsl(var(--primary))",
            "element-color": "hsl(var(--card))",
            fill: "hsl(var(--muted))",
            "yes-text": "yes",
            "no-text": "no",
            "arrow-end": "block",
            scale: 1,
            symbols: {
              start: {
                "font-color": "hsl(var(--primary-foreground))",
                "element-color": "hsl(var(--primary))",
                fill: "hsl(var(--primary))",
              },
              end: {
                "font-color": "hsl(var(--primary-foreground))",
                "element-color": "hsl(var(--primary))",
                fill: "hsl(var(--primary))",
              },
              operation: {
                "font-color": "hsl(var(--foreground))",
                "element-color": "hsl(var(--card))",
                fill: "hsl(var(--muted))",
              },
              inputoutput: {
                "font-color": "hsl(var(--foreground))",
                "element-color": "hsl(var(--card))",
                fill: "hsl(var(--muted))",
              },
              decision: {
                "font-color": "hsl(var(--foreground))",
                "element-color": "hsl(var(--card))",
                fill: "hsl(var(--muted))",
              },
            },
          })
        }
      } catch (error) {
        if (ref && "current" in ref && ref.current) {
          ref.current.innerHTML = `<div class="p-4 text-destructive text-sm"><strong>Error:</strong> ${error instanceof Error ? error.message : "Failed to parse flowchart"}</div>`
        }
        console.error("Flowchart rendering error:", error)
      }
    }

    renderFlowchart()
  }, [code, renderTrigger, ref])

  return (
    <div className="h-full flex flex-col bg-muted/30">
      <div className="border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">Preview</p>
      </div>
      <div ref={ref} id="flowchart-container" className="flex-1 overflow-auto p-4 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Enter DSL code and click Render to see your flowchart</p>
      </div>
    </div>
  )
})

FlowchartPreview.displayName = "FlowchartPreview"

export default FlowchartPreview
