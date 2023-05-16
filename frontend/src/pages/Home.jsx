import React, { useState, useEffect } from "react";

import { Card, FromField, Loder } from "../components";

const RenderCard = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  // Create two state
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchReasult, setSearchReasult] = useState(null);
  const [searchTimeout, setsearchTimeout] = useState(null);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mernaiapp.onrender.com/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        setAllPost(result.data.reverse());
      }
    } catch (error) {
      // alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setsearchTimeout(
      setTimeout(() => {
        const searchReasult = allPost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchReasult(searchReasult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Browse through a collection of imagniative and visually stunning image
          generated by IKHAN AI
        </p>
      </div>

      <div className="mt-16">
        <FromField
          labelName={"Search Post"}
          type={"text"}
          name={"text"}
          placeholder={"Search posts"}
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loder />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing result for
                <span className="text-[#475cc7] p-2">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCard
                  data={searchReasult}
                  title={"NO search Result found"}
                />
              ) : (
                <RenderCard data={allPost} title={"NO Post Found"} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
