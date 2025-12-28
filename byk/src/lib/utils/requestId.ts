import { uuidv7 } from "uuidv7";


export function generateRequestId(): string {
  const base = uuidv7();
  return `req-${base}`;
}
