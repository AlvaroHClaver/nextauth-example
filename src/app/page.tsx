"use client";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const router = useRouter();
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    console.log({ username, password });
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result);
      return;
    }

    router.replace("/");
  }

  return (
    <main className={styles.main}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.textContainer}>
          <h1>Back to your digital life</h1>
          <p>Login to continue</p>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
