import Image from 'next/image'

export default function Description() {
  return (
    <div
      className="hidden md:flex min-h-screen bg-[#101020] items-center justify-center p-4 w-1/2"
      style={{
        backgroundImage: 'url("/wave-haikei.svg")',
        backgroundRepeat: 'repeat-x',   // repeat horizontally only
        backgroundPosition: 'top',
        backgroundSize: 'auto',   
      }}
    >
      <div className="relative w-full max-w-sm h-[500px] bg-[var(--bg-clr)] rounded-xl overflow-hidden">
        <Image
          src="/larks.png"
          alt="Larks Podcast"
          fill
          quality={100}
          className="object-cover"
          placeholder="blur"
          blurDataURL="/larks-blur.png"
        />
      </div>
    </div>
  )
}
