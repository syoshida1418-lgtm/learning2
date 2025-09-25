"use client"

import { useState, useEffect } from "react"
import { CustomVocabularyManager, CustomWord } from "@/lib/custom-vocabulary"
import { Button } from "@/components/ui/button"

export default function QuizPage() {
  const [words, setWords] = useState<CustomWord[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    const manager = CustomVocabularyManager.getInstance()
    setWords(manager.getCustomWords())
  }, [])

  const handleStartQuiz = () => {
    if (words.length === 0) return
    setQuizStarted(true)
    setCurrentIndex(0)
    setUserAnswer("")
    setFeedback(null)
  }

  const handleSubmitAnswer = () => {
    const correctDefinition = words[currentIndex].definition.toLowerCase().trim()
    if (userAnswer.toLowerCase().trim() === correctDefinition) {
      setFeedback("✅ Correct!")
    } else {
      setFeedback(`❌ Incorrect. Correct answer: ${words[currentIndex].definition}`)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < words.length ? prev + 1 : 0))
    setUserAnswer("")
    setFeedback(null)
  }

  if (words.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Quiz</h1>
        <p>No custom words available. Please add words first.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>

      {!quizStarted ? (
        <Button onClick={handleStartQuiz} className="mt-6">
          Start Quiz
        </Button>
      ) : (
        <div className="mt-4 p-4 border rounded space-y-4">
          <div className="text-xl font-bold">{words[currentIndex].word}</div>

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter the definition"
            className="w-full border rounded px-2 py-1"
          />

          {!feedback ? (
            <Button onClick={handleSubmitAnswer} className="mt-2">
              Submit
            </Button>
          ) : (
            <div className="space-y-2">
              <div>{feedback}</div>
              <Button onClick={handleNext}>Next</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
