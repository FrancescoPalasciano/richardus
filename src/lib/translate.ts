export type Messages = Record<string, string>;
export type Translator = (text: string) => string;
export function createTranslator(messages: Messages): Translator {
  return (text) => {
    const key = text.replace(/\s+/g, " ").trim();
    const translated = messages[key];
    return translated ? text.replace(/\S[\s\S]*\S|\S/, translated) : text;
  };
}
