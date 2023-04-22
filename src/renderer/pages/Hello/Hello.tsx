import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OSApi from '../../os-api';
import DashboardLayout from '../../layouts/dashboard';

export default function Hello() {
  const [state, setState] = useState<unknown>([]);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<unknown | null>(null);

  OSApi.ipcRenderer.myPing();

  const fetch = async () => {
    const r = await OSApi.prisma().user.findMany();
    setState(r);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const rand = (length: number) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const add = async () => {
    const e = {
      data: {
        name: rand(5),
        email: rand(10),
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    };

    await OSApi.prisma().user.create(e);

    fetch();
  };

  const loginUser = async (email: string) => {
    const data = await OSApi.prisma().user.findMany({
      where: {
        email,
      },
    });
    if (data.length > 0) {
      setCurrentUser(data);
    }
  };

  const loginUserAlt = async (email: string) => {
    const data: undefined | unknown[] = await OSApi.ipcRenderer.loginUser(
      email
    );

    setCurrentUser(data?.length > 0 ? data : null);
  };

  return (
    <DashboardLayout title="Hello Page">
      <div>
        <h1>Data | Current User: {JSON.stringify(currentUser)}</h1>
        <Link to="/">Hello</Link>
        <Link to="/Home">Home</Link>
        <button type="button" onClick={() => add()}>
          ADD
        </button>
        <input
          type="text"
          onChange={(e) => setLoginEmail(e.currentTarget.value)}
        />
        <button type="button" onClick={() => loginUser(loginEmail)}>
          LOGIN
        </button>
        <button type="button" onClick={() => loginUserAlt(loginEmail)}>
          LOGIN2
        </button>
        <pre>{JSON.stringify(state, null, 3)}</pre>
      </div>
    </DashboardLayout>
  );
}
