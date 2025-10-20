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
        const flowchart = await import("flowchart.js")

        if (ref && "current" in ref && ref.current) {
          ref.current.innerHTML = ""

          // Helper: safely read CSS variables (HSL or HEX)
          const getColor = (name: string) =>
            getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
            "0 0% 0%" // fallback to black if missing

          // Converts HSL ("210 100% 50%") -> HEX
          const hslToHex = (hslString: string) => {
            if (hslString.startsWith("#")) return hslString // already hex
            const [h, s, l] = hslString
              .split(" ")
              .map((v, i) => (i === 0 ? parseFloat(v) : parseFloat(v) / 100))
            const a = s * Math.min(l, 1 - l)
            const f = (n: number) => {
              const k = (n + h / 30) % 12
              const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
              return Math.round(255 * color)
                .toString(16)
                .padStart(2, "0")
            }
            return `#${f(0)}${f(8)}${f(4)}`
          }

          const diagram = flowchart.parse(code)

          // ✅ match doc ID + ensure visibility
          const containerId = "diagram-container"
          ref.current.id = containerId

          diagram.drawSVG(containerId, {
            x: 0,
            y: 0,
            "line-width": 3,
            "line-length": 50,
            "text-margin": 10,
            "font-size": 14,
            "font-family": "Geist, sans-serif",
            "font-color": hslToHex(getColor("--foreground")),
            "line-color": hslToHex(getColor("--foreground")),
            "element-color": hslToHex(getColor("--border")),
            fill: hslToHex(getColor("--background")),
            "yes-text": "yes",
            "no-text": "no",
            "arrow-end": "block",
            scale: 1,
            symbols: {
              start: {
                "font-color": hslToHex(getColor("--primary-foreground")),
                "element-color": hslToHex(getColor("--primary")),
                fill: hslToHex(getColor("--primary")),
              },
              end: {
                "font-color": hslToHex(getColor("--primary-foreground")),
                "element-color": hslToHex(getColor("--primary")),
                fill: hslToHex(getColor("--primary")),
              },
              operation: {
                "font-color": hslToHex(getColor("--foreground")),
                "element-color": hslToHex(getColor("--border")),
                fill: hslToHex(getColor("--muted")),
              },
              inputoutput: {
                "font-color": hslToHex(getColor("--foreground")),
                "element-color": hslToHex(getColor("--border")),
                fill: hslToHex(getColor("--muted")),
              },
              decision: {
                "font-color": hslToHex(getColor("--foreground")),
                "element-color": hslToHex(getColor("--border")),
                fill: hslToHex(getColor("--muted")),
              },
            },
            flowstate: {
              past: { fill: "#CCCCCC", "font-size": 12 },
              current: { fill: "#FFFF99", "font-color": "red", "font-weight": "bold" },
              future: { fill: "#FFFF99" },
              request: { fill: "#58C4A3" },
              invalid: { fill: "#444444" },
              approved: { fill: "#58C4A3", "font-size": 12, "yes-text": "APPROVED", "no-text": "n/a" },
              rejected: { fill: "#C45879", "font-size": 12, "yes-text": "n/a", "no-text": "REJECTED" },
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
        <p className="text-muted-foreground text-sm">Enter DSL code and click Render to see your flowchart</p>
      </div>
    </div>
  )
})

FlowchartPreview.displayName = "FlowchartPreview"

export default FlowchartPreview
