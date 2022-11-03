import styles from "./AllCards.module.css";
import React from "react";
import OneCard from "./OneCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCardsFetch } from "../../helpers/getAllCardsFetch";
import { Layout } from "antd";
import { Pagination } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export default function AllCards() {
  const [allItems, setAllItems] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      (async function () {
        const allItems = await getAllCardsFetch(id);
        setAllItems(allItems);
      })();
    }
  }, [id]);

  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <div className={styles.mainDiv}>
            {allItems?.map((el) => (
              <OneCard el={el} key={el["Items.id"]} />
            ))}
          </div>
        </Content>
        <Footer>
          <Pagination defaultCurrent={1} total={50} />
        </Footer>
      </Layout>
    </Layout>
  );
}
