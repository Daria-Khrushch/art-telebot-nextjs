"use client";
import NewCard from "@components/NewCard";
import Filters from "@components/Filters";
import React from "react";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import AdminCards from "@components/AdminCards";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Home = () => {
  const session = useSession();
  const [showLoader, setShowLoader] = useState(true);
  const [showNoChannel, setShowNoChannel] = useState(false);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTheme, setSearchTheme] = useState("");
  const [searchLang, setSearchLang] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [isViewSorted, setIsViewSorted] = useState(false);
  const [isViewSortedDesc, setIsViewSortedDesc] = useState(false);
  const [isSubSorted, setIsSubSorted] = useState(false);
  const [isSubSortedDesc, setIsSubSortedDesc] = useState(false);
  const [isCpvSorted, setIsCpvSorted] = useState(false);
  const [isCpvSortedDesc, setIsCpvSortedDesc] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `/api/search/?theme=${searchTheme}&language=${searchLang}&title=${searchQuery}`
      );
      const data = await res.json();
      setChannels(data);
    };
    getData();
  }, [searchTitle, searchTheme, searchLang]);

  const onSearch = async (event) => {
    event.preventDefault();
    setSearchTitle(searchQuery);
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowNoChannel(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  };

  const onThemeFilter = (event) => {
    event.preventDefault();
    setSearchTheme(event.target.value);
  };

  const onLangFilter = (event) => {
    event.preventDefault();
    setSearchLang(event.target.value);
  };

 const handleSortByView = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isViewSorted && !isViewSortedDesc) {
        setIsViewSortedDesc(true);
        setIsViewSorted(true);
        return b.views - a.views; // От большего к меньшему
      } else if (isViewSorted && isViewSortedDesc) {
        setIsViewSortedDesc(false);
        return a.views - b.views; // От меньшего к большему
      } else if (isViewSorted && !isViewSortedDesc) {
        setIsViewSorted(false);
      }
    });

    setChannels(sortedList);
  };

  const handleSortBySubs = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isSubSorted && !isSubSortedDesc) {
        setIsSubSortedDesc(true);
        setIsSubSorted(true);
        return b.subscribers - a.subscribers; // От большего к меньшему
      } else if (isSubSorted && isSubSortedDesc) {
        setIsSubSortedDesc(false);
        return a.subscribers - b.subscribers; // От меньшего к большему
      } else if (isSubSorted && !isSubSortedDesc) {
        setIsSubSorted(false);
      }
    });

    setChannels(sortedList);
  };

  const handleSortByCpv = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isCpvSorted && !isCpvSortedDesc) {
        setIsCpvSortedDesc(true);
        setIsCpvSorted(true);
        return b.cpv - a.cpv; // От большего к меньшему
      } else if (isCpvSorted && isCpvSortedDesc) {
        setIsCpvSortedDesc(false);
        return a.cpv - b.cpv; // От меньшего к большему
      } else if (isCpvSorted && !isCpvSortedDesc) {
        setIsCpvSorted(false);
      }
    });

    setChannels(sortedList);
  };

  return (
    <section className="main">
      <Filters
        channels={channels}
        onSearch={onSearch}
        onThemeFilter={onThemeFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLangFilter={onLangFilter}
      />
      <div className="content">
        <div className="info">
          <h2>Каналы</h2>
          <div className="filtrs">
            {/* <span className="filtrs-option">Рейтинг</span> */}  
            <span className="filtrs-option" onClick={handleSortBySubs}>
              Подписчики
              {isSubSorted ? (isSubSortedDesc ? "🔽" : "🔼") : ""}
            </span>
              <span className="filtrs-option" onClick={handleSortByView}>
              Просмотры
              {isViewSorted ? (isViewSortedDesc ? "🔽" : "🔼") : ""}
            </span>{" "}
            <span className="filtrs-option" onClick={handleSortByCpv}>
              Стоимость
              {isCpvSorted ? (isCpvSortedDesc ? "🔽" : "🔼") : ""}
            </span>
          </div>
        </div>
        <ul>
          <>
            <NewCard />
            {channels && channels.length > 0 ? (
              channels.map((channel) => (
                <AdminCards key={channel.id} channel={channel} />
              ))
            ) : (
              <>
                {showLoader && (
                  <div className="card">
                    <PulseLoader color="#315EEB" margin={10} />
                  </div>
                )}
                {showNoChannel && (
                  <div className="card">Канал с таким названием не найден</div>
                )}
              </>
            )}
          </>
        </ul>
      </div>
    </section>
  );
};

export default Home;