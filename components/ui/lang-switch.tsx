"use client"

import { useState } from "react"

export default function LangSwitch() {

  const [lang, setLang] = useState("en")

  function toggleLang() {
    setLang(lang === "en" ? "ar" : "en")
  }

  return (

    <button
      onClick={toggleLang}
      className="flex items-center gap-2 p-2 rounded hover:bg-slate-800"
      aria-label="Change language"
    >

      🌍

      <span className="text-sm">
        {lang.toUpperCase()}
      </span>

    </button>

  )
}