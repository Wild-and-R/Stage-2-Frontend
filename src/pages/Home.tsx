export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <p><span className="text-2xl">Hahaha!</span> Welcome to TCF! The personal blog for Tachyon, Cafe, and Firefly.</p>
      <p>If you're not one of the three, then please kindly <span className="text-2xl text-red-500">LEAVE.</span></p>
    </div>
  )
}