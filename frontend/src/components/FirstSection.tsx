import Introduction from './Intro'
import Description from './description'

export default function FirstSection() {
  return (
    <main className="flex flex-col md:flex-row justify-between items-start w-full min-h-screen">
      <Introduction />
      <Description />
    </main>
  );
}
