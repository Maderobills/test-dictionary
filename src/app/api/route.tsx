
export interface Definition {
    definition: string;
    example?: string;
  }
  
  export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
  }
  
  export interface DictionaryEntry {
    word: string;
    phonetic?: string;
    meanings: Meaning[];
  }
  
  export async function fetchDefinition(word: string): Promise<DictionaryEntry | null> {
    if (!word) return null;
  
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data && Array.isArray(data) && data[0]) {
        return data[0] as DictionaryEntry;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      return null;
    }
  }