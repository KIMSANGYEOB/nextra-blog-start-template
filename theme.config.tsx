import React from 'react';
import { useRouter } from 'next/router';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import dayjs from 'dayjs';
import { main } from './config/themeConfig';

const config: DocsThemeConfig = {
  logo: <span style={{ fontSize: "20px", fontWeight: "bold" }}>my.blog</span>,
  project: {
    link: 'https://github.com/KIMSANGYEOB/nextra-blog-start-template',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – my blog'
    }
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      `${process.env.NEXT_PUBLIC_URL}${(defaultLocale === locale ? asPath : `/${locale}${asPath}`)}`;
    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'my blog'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'The next site builder'}
        />
      </>
    )
  },
  search: {
    placeholder: "검색할 문구를 입력해주세요..."
  },
  footer: {
    text: `my blog © 2022~${dayjs().format('YYYY')}`,
  },
  main,
  themeSwitch: {
    useOptions() {
      return {
        light: '라이트',
        dark: '다크',
        system: '시스템'
      }
    }
  },
  editLink: {
    text: ''
  },
  feedback: {
    content: null
  }
}

export default config;
