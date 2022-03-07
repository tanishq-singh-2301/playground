import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import classNames from '@lib/classNames';

const CodeMirror = dynamic(() => { //@ts-ignore
  import('codemirror/mode/htmlmixed/htmlmixed')//@ts-ignore
  import('codemirror/theme/yonce.css')//@ts-ignore
  import('codemirror/keymap/sublime');//@ts-ignore
  import('codemirror/addon/edit/closebrackets');//@ts-ignore
  import('codemirror/addon/edit/closetag');//@ts-ignore
  import('codemirror/addon/edit/matchbrackets');//@ts-ignore
  return import('react-codemirror')
}, { ssr: false });


type Home = {};
type blocks = "code" | "iframe";
const size_of_svg: number = 28;

const Home: NextPage<Home> = ({ }) => {
  const [tab, setTab] = useState<blocks>("code");
  const [code, setCode] = useState<string>(`<html>
  
    <head>
      <style>
        html {
          background-color: pink;
          min-height: 100vh;
        }
        
        body {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
  
    <body>
      <button onclick="button_pressed()" style="padding: 10px; color: white; background-color: purple; outline: none; border: 1px solid purple; border-radius: 2px;">Button</button>
    </body>
    
    <script>
      const button_pressed = () => {
        alert("Button Pressed")
      }
    </script>
      
  </html>`);

  return (
    <div className='h-full max-w-screen flex justify-start items-center flex-col relative'>
      <Head>
        <title>Playground</title>
        <link rel="icon" href="/logo.svg" />
        <meta name="title" content="HTML, CSS, Javascript playground" />
      </Head>

      <main className='h-full w-full flex justify-between items-center flex-col'>

        <section className='flex h-[calc(100%-5rem)] lg:h-full w-full'>
          {<CodeMirror
            className={classNames(
              "h-full w-full lg:w-1/2",
              tab === "code" ? "" : "hidden lg:flex"
            )}
            value={code}
            options={{
              theme: 'yonce', // ayu-mirage
              mode: {
                name: "htmlmixed"
              },
              lineWrapping: false,
              smartIndent: true,
              lineNumbers: true,
              autoCloseTags: true,
              keyMap: 'sublime',
              matchBrackets: true,
              autoCloseBrackets: true,
            }}
            onChange={value => setCode(value)}
          />}

          {<section className={classNames(
            'h-full w-full lg:w-1/2',
            tab === "iframe" ? "" : "hidden lg:flex"
          )}>
            <iframe className='h-full w-full' src={`data:text/html;charset=utf-8,${encodeURI(code)}`}></iframe>
          </section>}

        </section>

        <nav className='flex lg:hidden h-20 bg-slate-100 w-full justify-center items-center'>
          <ul className='w-full px-10 flex justify-around items-center max-w-xl'>
            <li className={classNames('rounded-md p-2', tab === "code" ? "bg-slate-200" : "")} onClick={() => setTab("code")}>
              <svg xmlns="http://www.w3.org/2000/svg" width={size_of_svg} height={size_of_svg} fill="#000" className="bi bi-code-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
              </svg>
            </li>
            <li className={classNames('rounded-md p-2', tab === "iframe" ? "bg-slate-200" : "")} onClick={() => setTab("iframe")}>
              <svg xmlns="http://www.w3.org/2000/svg" width={size_of_svg} height={size_of_svg} fill="#000" className="bi bi-tv" viewBox="0 0 16 16">
                <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" />
              </svg>
            </li>
          </ul>
        </nav>

      </main>

    </div >
  );
};

export default Home;