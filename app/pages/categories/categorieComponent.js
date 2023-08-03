"use client";
import Axios from "axios";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment, TextField, Grid } from "@mui/material";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

import { useState, useEffect } from "react";
const HtmlToReact = require("html-to-react").Parser;

const PageComponent = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const htmlToReactParser = new HtmlToReact();

  useEffect(() => {
    const currentURL = window.location.href;
    const searchParams = new URLSearchParams(window.location.search);
    const itemId = searchParams.get("itemId");
    setId(itemId);
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await Axios.get(
          `https://netglow-be-c3c31450198f.herokuapp.com/api/gmail/getAllEmails`
          // `http://localhost:4000/api/gmail/getAllEmails`
        );
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBags();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
          background: "white",
        }}
      >
        <div>
          <Link style={{ textDecoration: "none" }} href={"/"}>
            <h4>Netglow</h4>
          </Link>
        </div>
        <div>
          <TextField
            style={{ width: "20rem" }}
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <Container>
        {" "}
        <h3>The Latest Emails from Netglow</h3>
      </Container>

      <Card
        style={{
          boxShadow: "none",
          maxWidth: "100%",
          background: "transparent",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <div style={{ marginTop: "10rem" }}>
              <ClipLoader
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <Grid container spacing={2} maxWidth="lg">
              {data
                .filter(
                  (item) =>
                    item.categoryId === id &&
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((filteredItem, index) => (
                  <Grid item key={index} xs={12} md={6} lg={4}>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={{
                        pathname: "/pages/hello",
                        query: { itemId: filteredItem.id },
                      }}
                    >
                      <Card sx={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            margin: "auto",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h3"
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              textAlign: "center",
                              marginTop: "12px",
                            }}
                          >
                            {filteredItem.senderName}
                          </Typography>
                          <Typography
                            variant="h5"
                            style={{
                              fontSize: "15px",
                              fontWeight: "700",
                              textAlign: "center",
                              marginTop: "12px",
                            }}
                          >
                            {filteredItem.title}
                          </Typography>
                        </div>

                        <CardContent>
                          {filteredItem.image ? (
                            <Image
                              src={filteredItem.image}
                              width={380}
                              height={450}
                              alt="Picture of the author"
                            />
                          ) : (
                            <div>
                              {/* Alternative content or a placeholder image */}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageComponent;
