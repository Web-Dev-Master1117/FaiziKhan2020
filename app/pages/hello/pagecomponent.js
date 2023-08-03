"use client";
import Axios from "axios";
import { useState, useEffect } from "react";
const HtmlToReact = require("html-to-react").Parser;

const PageComponent = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const htmlToReactParser = new HtmlToReact();

  useEffect(() => {
    const currentURL = window.location.href;
    const searchParams = new URLSearchParams(window.location.search);
    const itemId = searchParams.get("itemId");
    setId(itemId);
  }, []);

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await Axios.get(
          // `https://netglow-be-c3c31450198f.herokuapp.com/api/gmail/getAllEmails`
          `http://localhost:4000/api/gmail/getAllEmails`
        );
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBags();
  }, []);

  return (
    <div>
      {data
        .filter((item) => item.id === id)
        .map((filteredItem, index) => (
          <>
            {" "}
            <iframe
              title="Embedded HTML"
              srcDoc={filteredItem.content}
              style={{
                width: "100%",
                height: "100vh",
              }}
            />
          </>
        ))}
    </div>
  );
};

export default PageComponent;
