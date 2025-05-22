import Image from 'next/image'

export default function Description() {
  return (
    <div
      className="hidden md:flex min-h-screen bg-transparent items-center justify-center p-4 w-1/2"
    >
      <div className=" border relative w-full max-w-sm h-[500px] bg-[var(--bg-clr)] rounded-xl overflow-hidden">
        <Image
          src="/larks-dark.png"
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
