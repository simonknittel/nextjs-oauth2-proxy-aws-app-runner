import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { userService } from '../services/user'
import styles from '../styles/Home.module.css'
import { useCallback, useEffect } from 'react'
import CreateUserForm from '../components/CreateUserForm'

export const getServerSideProps: GetServerSideProps = async () => {
  const allUsers = await userService.findAll()

  return {
    props: {
      allUsers
    }
  }
}

const Home: NextPage = ({ allUsers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const refreshPage = useCallback(() => {
    router.replace(router.asPath)
  }, [ router ])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshPage()
    }, 10000)

    return () => clearInterval(interval)
  }, [ refreshPage ])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CreateUserForm submitCallback={ refreshPage } />

        <div>
          <pre><code>{ JSON.stringify(allUsers, null, 2) }</code></pre>
        </div>
      </main>
    </div>
  )
}

export default Home
