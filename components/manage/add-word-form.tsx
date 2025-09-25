"use client"

import { useState } from "react"
import { CustomVocabularyManager } from "@/lib/custom-vocabulary"
import { Button } from "@/components/ui/button"

interface AddWordFormProps {
  onWordAdded: () => void
}

export function AddWordForm({ onWordAdded }: AddWordFormProps) {
  const [word, setWord] = useState("")
  const [definition, setDefinition] = useState("")
  const [exampleSentence, setExampleSentence] = useState("")
  const [notes, setNotes] = useState("") // 新しく追加

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!word || !definition || !exampleSentence) return

    const manager = CustomVocabularyManager.getInstance()
    manager.addWord({
      word,
      definition,
      exampleSentence,
      notes, // ここにメモも保存
      blankPosition: 0,
      difficulty: "intermediate",
      category: "daily",
      partOfSpeech: "noun",
    })

    setWord("")
    setDefinition("")
    setExampleSentence("")
    setNotes("")
    onWordAdded()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Word</label>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Definition</label>
        <input
          type="text"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Example Sentence</label>
        <input
          type="text"
          value={exampleSentence}
          onChange={(e) => setExampleSentence(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Memo (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          rows={3}
        />
      </div>
      <Button type="submit">Add Word</Button>
    </form>
  )
}
