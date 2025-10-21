"use client"

import { useEffect, forwardRef } from "react"

interface FlowchartPreviewProps {
  code: string
  renderTrigger: number
}

const FlowchartPreview = forwardRef<HTMLDivElement, FlowchartPreviewProps>(
  ({ code, renderTrigger }, ref) => {
    useEffect(() => {
      const renderFlowchart = async () => {
        if (!code.trim()) {
          if (ref && "current" in ref && ref.current) {
            ref.current.innerHTML = ""
          }
          return
        }

        try {
          const flowchart = await import("flowchart.js")

          if (ref && "current" in ref && ref.current) {
            ref.current.innerHTML = ""

            const diagram = flowchart.parse(code)
            const containerId = "diagram-container"
            ref.current.id = containerId

            // 🎨 Manually define all colors here
            const COLORS = {
              foreground: "#1a1a1a",
              border: "#333333",
              background: "#ffffff",
              primary: "#2563eb",
              primaryForeground: "#000000",
              muted: "#f4f4f5",
            }

            diagram.drawSVG(containerId, {
              x: 0,
              y: 0,
              "line-width": 3,
              "line-length": 50,
              "text-margin": 10,
              "font-size": 14,
              "font-family": "Geist, sans-serif",
              "font-color": COLORS.foreground,
              "line-color": COLORS.foreground,
              "element-color": COLORS.border,
              fill: COLORS.background,
              "yes-text": "yes",
              "no-text": "no",
              "arrow-end": "block",
              scale: 1,

              symbols: {
                start: {
                  "font-color": COLORS.primaryForeground,
                  "element-color": COLORS.primary,
                  fill: COLORS.primary,
                },
                end: {
                  "font-color": COLORS.primaryForeground,
                  "element-color": COLORS.primary,
                  fill: COLORS.primary,
                },
                operation: {
                  "font-color": COLORS.foreground,
                  "element-color": COLORS.border,
                  fill: COLORS.muted,
                },
                inputoutput: {
                  "font-color": COLORS.foreground,
                  "element-color": COLORS.border,
                  fill: COLORS.muted,
                },
                decision: {
                  "font-color": COLORS.foreground,
                  "element-color": COLORS.border,
                  fill: COLORS.muted,
                },
              },

              flowstate: {
                past: { fill: "#CCCCCC", "font-size": 12 },
                current: {
                  fill: "#FFFFFF",
                  "font-color": "red",
                  "font-weight": "bold",
                },
                future: { fill: "#FFFFFF" },
                request: { fill: "#58C4A3" },
                invalid: { fill: "#444444" },
                approved: {
                  fill: "#58C4A3",
                  "font-size": 12,
                  "yes-text": "APPROVED",
                  "no-text": "n/a",
                },
                rejected: {
                  fill: "#C45879",
                  "font-size": 12,
                  "yes-text": "n/a",
                  "no-text": "REJECTED",
                },
              },
            })
          }
        } catch (error) {
          console.error("Flowchart rendering error:", error)
          if (ref && "current" in ref && ref.current) {
            ref.current.innerHTML = `<div class="p-4 text-destructive text-sm"><strong>Error:</strong> ${
              error instanceof Error ? error.message : "Failed to parse flowchart"
            }</div>`
          }
        }
      }

      renderFlowchart()
    }, [code, renderTrigger, ref])

    return (
      <div className="h-full flex flex-col bg-muted/30">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-medium text-foreground">Preview</p>
        </div>
        <div
          ref={ref}
          id="diagram-container"
          className="flex-1 overflow-auto p-4 flex items-center justify-center text-foreground"
        >
          <p className="text-muted-foreground text-sm">
            Enter DSL code and click Render to see your flowchart
          </p>
        </div>
      </div>
    )
  }
)

FlowchartPreview.displayName = "FlowchartPreview"

export default FlowchartPreview
