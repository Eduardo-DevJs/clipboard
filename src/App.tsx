import { ChangeEvent, useRef, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [changeTextButton, setChangeTextButton] = useState<string>("Copiar");
  const copyClip = useRef<HTMLDivElement>(null);

  function handleTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  async function copyText() {
    if (copyClip.current) {
      try {
        await navigator.clipboard.writeText(copyClip.current.innerText);
        setTimeout(() => {
          setChangeTextButton("Copiar");
        }, 1500);
        setChangeTextButton("Copiado ✓");
      } catch (err) {
        console.error(
          "Erro ao copiar texto para a área de transferência:",
          err
        );
      }
    }
  }

  return (
    <div className="h-screen flex items-center flex-col p-10 justify-center">
      <div className="bg-slate-100 shadow gap-4 grid grid-cols-2 p-4 max-w-7xl w-full">
        <textarea
          className="border outline-none rounded-md border-slate-200 resize-none text-slate-700 font-semibold p-4 text-xl"
          cols={30}
          onChange={handleTextArea}
          rows={10}
        ></textarea>

        <div
          ref={copyClip}
          className="bg-slate-800 overflow-y-scroll max-h-96 rounded-md p-4 text-xl text-white"
        >
          <p className="max-w-full break-words">{text}</p>
        </div>
      </div>

      <button
        disabled={!text}
        onClick={copyText}
        style={{ cursor: text === "" ? "not-allowed" : "pointer" }}
        className="mt-4 bg-slate-800 py-3 px-10 hover:opacity-85 transition-all rounded text-slate-200"
      >
        {changeTextButton}
      </button>
    </div>
  );
}
