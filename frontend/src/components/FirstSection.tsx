import Introduction from './Intro'
import Description from './description'

export default function FirstSection() {
  return (
    <main
      className="md:flex flex-col md:flex-row justify-between items-start w-full min-h-screen p-4 bg-[var(--bg-clr)]"
      style={{
        backgroundImage: 'url("/wave-haikei-dark.svg")',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'top',
        backgroundSize: 'auto',
      }}
    >
      <Introduction />
      <Description />
    </main>

  );
}
