import Stake from "@/components/Stake";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import useTokenStore from "@/store/tokens";
export default function Home() {
  const getData = useTokenStore((state) => state.getData);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [getData]);
  return (
    <div className={styles.container}>
      <Stake />
    </div>
  );
}
