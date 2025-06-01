// components/ui/loader.tsx
export default function DotsLoader() {
    return (
      <div className="flex space-x-1 justify-center items-center mt-1 scale-90">
        <span className="w-2 h-2 bg-[var(--txt-clr)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-[var(--txt-clr)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-[var(--txt-clr)] rounded-full animate-bounce"></span>
      </div>
    );
}
  