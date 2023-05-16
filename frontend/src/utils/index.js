import { surpriseMePrompts } from "../constants";

import FileSaver from "file-saver";

export function getRandomePrompt(prompt) {
  const randomeIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomePrompt = surpriseMePrompts[randomeIndex];

  if (randomePrompt === prompt) return getRandomePrompt(prompt);

  return randomePrompt;
}

export async function downloadImage(_id, photo, name) {
  FileSaver.saveAs(photo, `ISHU-AI-GENERATED-${_id}.jpg`);
}
