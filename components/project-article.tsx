"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

export default function ArticleTable() {
  const [search, setSearch] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [articles, setArticles] = useState<string[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await axios.post("/api/fetch-ai-article", { token })
        if (res.data.success) {
          setArticles(res.data.aiArticles || [])
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to fetch articles")
      }
    }

    fetchArticles()
  }, [])

  // Filtered articles (safe string handling)
  const filteredData = articles.filter((item) =>
    typeof item === "string" &&
    item.toLowerCase().includes(search.toLowerCase())
  )

  // Return the first 3-4 words
  const getPreview = (text: string, wordCount: number = 4) => {
    return text.split(" ").slice(0, wordCount).join(" ") + "..."
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Search bar */}
      <div className="mb-4">
        <Input
          placeholder="Search titles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Preview</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{getPreview(item)}</td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(item)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied === item ? "Copied!" : "Copy"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
