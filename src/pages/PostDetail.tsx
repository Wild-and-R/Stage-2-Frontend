import {useParams} from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

const posts = [
  { id: 1, title: "Tachyon's Transmigration", content: "In the year 3012 A.C, humanity had long since abandoned the idea of a single Earth. The stars were their playground, and the void between planets was their home. But for one person, Tachyon, the journey was far from over. This is my story, my journey." },
  { id: 2, title: "Thank You Letter", content: "Tachyon, Cafe, thank you for always being by my side. Though now I am confined to this hospital bed and your visits are limited, I will never forget the memories we made together." },
  { id: 3, title: "View From Zenith", content: "From the highest point of the Mountain Zenith located in the Planet Xarsc I can see the brightest star of this cluster. Unfortunately, the clouds below me hinders my view of the Xarsc's ground. Also unfortunate is that the story of a Panacea on top is just that, a story." },
]

export default function PostDetail() {
    const {postId} = useParams();
    const post = posts.find((p) => p.id === Number(postId))
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>Post #{post.id}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{post.content}</p>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground w-full text-center">
          Thanks for reading!
        </p>
      </CardFooter>
    </Card>
  )
}