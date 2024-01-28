import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '../../Tag';
import React, { ReactNode, createContext, useContext } from 'react';
import { LatestPost } from '../../../types';

export type PostsProps = {
    children: ReactNode;
}

export type PostContainerProps = {
    children: ReactNode;
    post: LatestPost;
}

type PostContext = {
    post: LatestPost
}

const PostsContext = createContext<PostContext>(null);

const PostRoot: React.FC<PostsProps> = ({ children }) => {
    return (
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {children}
        </div>
    )
}

const PostContainer: React.FC<PostContainerProps> = ({ children, post }) => {
    return (
        <PostsContext.Provider value={{ post }}>
            <Link href={post.path} key={post.path}>
                <article className="flex flex-col items-start justify-between p-2 rounded-md duration-200 hover:scale-105">
                    {children}
                </article>
            </Link>
        </PostsContext.Provider>
    )
}

const PostImage: React.FC = () => {
    const { post } = useContext(PostsContext);

    return (
        <div className="relative w-full text-neutral-500">
            <Image
                priority={true}
                src={post.thumbnail}
                width={500}
                height={500}
                alt={post.title}
                className="p-1 aspect-[16/9] w-full rounded-2xl bg-slate-100 opacity-90 object-contain sm:aspect-[2/1] lg:aspect-[3/2]"
            />
            <div className="absolute top-2 right-2">
                <Tag name={post.category} />
            </div>
        </div>
    )
}

const PostContent: React.FC = () => {
    const { post } = useContext(PostsContext);

    return (
        <div className="w-full mt-2">
            <div className="flex items-center text-sm">
                <div className="w-full flex items-center justify-between text-sm text-gray-500 dark:text-neutral-400">
                    <time dateTime={post.date}>
                        {dayjs(post.date).format("YYYY년 MM월 DD일")}
                    </time>
                    <span>
                        ⏱ {post.readingTime <= 1 ? "1분 미만" : `${post.readingTime}분이면 읽어요`}
                    </span>
                </div>
            </div>
            <div className="mt-2 flex flex-col items-start justify-center gap-y-2 group relative">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-200">
                    {post.title}
                </h3>
                <p>
                    {post.description}
                </p>
            </div>
        </div>
    )
}

const Posts = Object.assign(PostRoot, {
    Container: PostContainer,
    Image: PostImage,
    Content: PostContent,
});

export default Posts;
