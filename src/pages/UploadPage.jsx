import { useState } from "react"

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState("")

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setInsights(data.insights || data.error)
    setLoading(false)
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Upload your Spreadsheet</h2>
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {insights && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-2">Insights</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{insights}</pre>
        </div>
      )}
    </main>
  )
}
