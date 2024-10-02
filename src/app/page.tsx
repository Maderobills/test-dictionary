"use client";
import { useState } from "react";

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  meanings: Meaning[];
}

export default function Home() {
  const [word, setWord] = useState("");
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState("");

  const fetchDefinition = async () => {
    if (!word) return;
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      if (data && Array.isArray(data) && data[0]) {
        setEntry(data[0]);
        setError("");
      } else {
        setEntry(null);
        setError("Word not found");
      }
    } catch (error) {
      setEntry(null);
      setError("Error fetching definition");
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
            onClick={fetchDefinition}
            className="rounded-md bg-slate-700 p-2 px-6 text-white font-semibold"
          >
            Find
          </button>
        </div>
      </div>
      <div className="m-10 p-6 bg-slate-100 w-full h-full rounded-md">
        {entry ? (
          <div className="flex flex-col">
            <h1>{entry.word} <span>{entry.phonetic}</span></h1>
            {entry.meanings.map((meaning, index) => (
              <div key={index}>
                <span>{meaning.partOfSpeech}</span>
                <h3>Definition(s)</h3>
                <ul className="list-disc ml-5 space-y-2">
                  {meaning.definitions.map((def, defIndex) => (
                    <li key={defIndex}>
                      {def.definition}
                      {def.example && <p className="italic mt-1">Example: {def.example}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Answer Box</p>
        )}
      </div>
    </main>
  );
}