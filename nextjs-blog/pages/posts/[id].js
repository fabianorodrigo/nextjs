import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            {/*dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. In general, 
            setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack.
             So, you can set HTML directly from React, but you have to type out dangerouslySetInnerHTML and pass an object with 
             a __html key, to remind yourself that it’s dangerous.*/}
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}
