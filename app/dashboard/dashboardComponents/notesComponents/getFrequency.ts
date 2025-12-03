// notesComponents/getFrequency.ts
export function normalizeAccidental(s: string) {
  return s.replace("♯", "#").replace("♭", "b");
}

/**
 * Convert a note like "C4", "C#4", "C♯4", "Db4" into frequency in Hz.
 * Returns null on invalid input.
 */
export function getFrequency(note: string | null): number | null {
  if (!note) return null;
  const normalized = normalizeAccidental(note.trim());
  const m = normalized.match(/^([A-Ga-g])([#b]?)(-?\d+)$/);
  if (!m) return null;

  const letter = m[1].toUpperCase();
  const acc = m[2];
  const octave = parseInt(m[3], 10);

  const noteIndexMap: Record<string, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };

  let index = noteIndexMap[letter];
  if (acc === "#") index += 1;
  if (acc === "b") index -= 1;

  // MIDI number: (octave + 1) * 12 + index
  const midi = (octave + 1) * 12 + index;
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  return freq;
}
