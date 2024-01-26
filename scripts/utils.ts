import dayjs from "dayjs";
import { FrontMatter, LatestPost, MetaContent } from "./build-data";

export function getReadingTime(content: string): number {
    const AVERAGE_WORD_LENGTH = 4; // 평균 단어 길이
    const WORDS_PER_MINUTE = 210 // 분당 읽는 단어

    return Math.round(content.replace(/\s/g, "").length / AVERAGE_WORD_LENGTH / WORDS_PER_MINUTE);
}

export function validateFrontMatter(fileName: string, attributes: FrontMatter) {
    if (!attributes.title) throw new Error(`${fileName} 파일에 title(제목) 속성이 정의되지 않았습니다.`);
    if (!attributes.date) throw new Error(`${fileName} 파일에 date(작성일자) 속성이 정의되지 않았습니다.`);
}

export function sortMetaContent(content: LatestPost[] | MetaContent[]) {
    content.sort((first, second) => {
        const diffMillisecond = dayjs(first.date).diff(dayjs(second.date));

        if (diffMillisecond < 0) return 1;
        if (diffMillisecond > 0) return -1;

        return 0;
    });
}
