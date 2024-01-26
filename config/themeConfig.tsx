import React, { Children, ReactElement } from "react";
import dayjs from "dayjs";
import { useConfig } from "nextra-theme-docs";

const main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { frontMatter } = useConfig();
  const writeTime = dayjs(frontMatter.date).format('YYYY년 MM월 DD일');

  // gitTimestamp를 써도 작성일이 안나오는 페이지들이 있어서 직접 넣도록 구성
  const cloneChildren = Children.map(Children.toArray(children), (child, index) => {
    child = (child as ReactElement).props.children.map((propChild, propIndex) => {
      if (propIndex === 1) {
        if (!frontMatter.date) return;

        propChild = React.createElement(
          "div",
          { className: "nx-mt-12 nx-mb-8 nx-block nx-text-xs nx-text-gray-500 ltr:nx-text-right rtl:nx-text-left dark:nx-text-gray-400" },
          React.createElement("time", { dateTime: frontMatter.date }),
          `작성일 ${writeTime}`
        )
      }

      return propChild;
    })

    return child;
  });

  return <>
    {cloneChildren}
  </>
}

export {
  main
}