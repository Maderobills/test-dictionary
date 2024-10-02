"use client";
import { useState } from "react";
import { fetchDefinition, DictionaryEntry } from "./api/route";

export default function Home() {
  const [word, setWord] = useState("");
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    const result = await fetchDefinition(word);
    if (result) {
      setEntry(result);
    } else {
      setEntry(null);
      setError("Word not found or error occurred while fetching");
    }
  };

  return (
    <main className="h-screen p-10 flex flex-col items-center">
      <div className="text-center space-y-4">
        <h1 className="font-bold text-6xl">Dictionary</h1>
        <p className="text-lg">
          Let's help you find the meaning to your confusion
        </p>
        <div className="space-x-6">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word here"
            className="rounded-md bg-slate-100 p-2 px-4 w-64 outline-1	outline-slate-200"
          />
          <button
            onClick={handleSearch}
            className="rounded-md bg-slate-700 p-2 px-6 text-white font-semibold"
          >
            Find
          </button>
        </div>
      </div>
      <div className="m-10 p-10 bg-slate-100 w-full h-full rounded-md">
        {entry ? (
          <div className="flex flex-col space-y-6">
            <h1 className="font-bold text-3xl flex flex-col"><span>{entry.word}:</span> <span className="text-slate-700 text-2xl font-semibold ml-10">{entry.phonetic}</span></h1>
            {entry.meanings.map((meaning, index) => (
              <div key={index}>
                <span className="font-semibold">{meaning.partOfSpeech}</span>
                <h3 className="text-slate-700">Definition(s)</h3>
                <ul className="ml-5 space-y-2">
                  {meaning.definitions.map((def, defIndex) => (
                    <li key={defIndex}>
                      {def.definition}
                      {def.example && <p className="italic mt-1 text-amber-800">Example: {def.example}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p></p>
        )}
      </div>
    </main>
  );
}