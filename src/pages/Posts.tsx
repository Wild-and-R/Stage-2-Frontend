import { Link, Outlet } from "react-router-dom"

const posts = [
  { id: 1, title: "Tachyon's Transmigration"},
  { id: 2, title: "Thank You Letter"},
  { id: 3, title: "View From Zenith"},
]

export default function Posts() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold underline">Posts Page</h1>
      <ul className="mb-4">
        {posts.map((post) => (
            <li key={post.id}>
                <Link to={post.id.toString()} className="text-blue-500 hover:underline">{post.title}</Link>
            </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}