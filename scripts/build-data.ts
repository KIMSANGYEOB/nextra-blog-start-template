import fs from "fs";
import path from "path";
import frontMatter from 'front-matter';
import { getReadingTime, sortMetaContent, validateFrontMatter } from "./utils";

type MetaData = {
    [key: string]: { title: string }
}

export type LatestPost = {
    path: string;
    title: string;
    description: string;
    category: string;
    date: string;
    readingTime: number;
    thumbnail: string;
}

export interface FrontMatter {
    title?: string;
    description?: string;
    date?: string;
    thumbnail?: string;
}

export interface MetaContent extends FrontMatter {
    key: string;
}

export const META_FILE_NAME: string = '_meta.json';
export const LATEST_DATA_PATH: string = 'public/data/latest-post.json';
export const MAX_LATEST_POST_LENGTH = 6;

const rootDir: string = process.cwd();
const pageDir: string = path.join(rootDir, "pages");
const rootFiles: string[] = fs.readdirSync(pageDir);
const latestPostContents: LatestPost[] = [];

/**
 * 폴더별로 _metaData 및 최근 글 데이터 생성
 */
rootFiles.forEach((rootFile) => {
    const rootFileDir = path.join(pageDir, rootFile);

    if (fs.lstatSync(rootFileDir).isDirectory()) {
        const metaContents: MetaContent[] = [];
        const metaDataContent: MetaData = {};
        const contentFiles = fs.readdirSync(rootFileDir);

        contentFiles.forEach((contentFile) => {
            const contentFileDir = path.join(rootFileDir, contentFile);
            const ext = path.extname(contentFile);

            if (ext === ".mdx") {
                const fileInfo = frontMatter<FrontMatter>(fs.readFileSync(contentFileDir, { encoding: 'utf-8' }).toString());
                const { attributes } = fileInfo;
                const key = path.basename(contentFile, ".mdx");

                if (metaContents.some((sortContent) => sortContent[key])) throw new Error(`같은 파일명이 존재합니다 -> ${rootFile}/${key}.mdx`);

                validateFrontMatter(contentFile, attributes);

                // _meta.json 정보
                metaContents.push({ key, title: attributes.title, date: attributes.date });

                // 최신글 정보 데이터
                latestPostContents.push({
                    path: `/${rootFile}/${key}`,
                    title: attributes.title,
                    description: attributes.description,
                    category: rootFile,
                    date: attributes.date,
                    readingTime: getReadingTime(fileInfo.body),
                    thumbnail: attributes.thumbnail
                })
            }
        });

        sortMetaContent(metaContents);

        metaContents.forEach((sortContent) => {
            metaDataContent[sortContent.key] = {
                title: sortContent.title
            }
        });

        fs.writeFileSync(path.join(rootFileDir, META_FILE_NAME), JSON.stringify(metaDataContent), 'utf-8')
    }
});

sortMetaContent(latestPostContents);

// 최근 글 데이터 생성
fs.writeFileSync(
    path.join(LATEST_DATA_PATH),
    JSON.stringify(latestPostContents.slice(0, MAX_LATEST_POST_LENGTH))
    , 'utf-8'
);
