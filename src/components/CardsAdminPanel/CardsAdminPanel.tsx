import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../../api";
import "./CardsAdminPanel.scss";

interface IState {
  stateApi: string;
}
interface ICards {
  name: string;
  categoryName: string;
  tranlation: string;
  img: string;
  sound: string;
}
const CardsAdminPanel: React.FC<IState> = (props) => {
  const [cards, setCards] = useState<ICards[]>([]);
  const [addTrue, setAddTrue] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [image, setImage] = useState<File | string>();
  const [audio, setAudio] = useState<File | string>();
  function fetchAccos() {
    fetch(`${api}/cards`)
      .then((res) => res.json())
      .then((res) => {
        const gh: ICards[] = [];
        res.forEach((element: ICards) => {
          if (!props.stateApi) {
            if (
              element.categoryName ===
              window.location.pathname.split("/")[2].replace("%20", " ")
            ) {
              gh.push(element);
            }
          }
          if (element.categoryName === props.stateApi) {
            gh.push(element);
          }
        });
        setCards([...gh]);
      });
  }
  useEffect(() => {
    fetchAccos();
  }, []);
  function fetchDataLive() {
    fetch(`${api}/cards`)
      .then((res) => res.json())
      .then((res) => {
        const gh: ICards[] = [];
        res.forEach((item: ICards) => {
          if (item.categoryName === props.stateApi) gh.push(item);
        });
        setCards([...cards, ...gh]);
      });
  }
  function cancelWo(e: React.MouseEvent) {
    e.preventDefault();
    setAddTrue(false);
    setName("");
    setTranslation("");
  }
  function addWord(e: React.MouseEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (
      name.trim().length !== 0 &&
      translation.trim().length !== 0 &&
      image &&
      audio
    ) {
      formData.append("file", image, name);
      formData.append("file", audio, name);
      formData.append("name", name);
      formData.append("categoryName", props.stateApi);
      formData.append("translation", translation);
      formData.append("sound", `http://localhost:5000/sounds/${name}.mp3`);
      formData.append("img", `http://localhost:5000/images/${name}.jpg`);
      fetch(`${api}/cards`, {
        method: "POST",
        body: formData,
        headers: {},
      })
        .then(function (response) {
          return response.text();
        })
        .then(() => {
          fetchAccos();
        });
    }
  }
  function soundClick(e: React.MouseEvent) {
    const audio = new Audio();
    audio.src = `${api}/sounds/${(e.target as HTMLElement).id}.mp3`;
    audio.currentTime = 0;
    audio.play();
  }
  function deleteWord(e: React.MouseEvent) {
    fetch(`${api}/cards/${(e.target as HTMLElement).id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetchAccos();
    });
  }
  return (
    <div className="container">
      <p className="name_of_ac">
        Category:{" "}
        <span>
          {window.location.pathname.split("/")[2].replace("%20", " ")}
        </span>
      </p>
      <InfiniteScroll
        dataLength={cards.length}
        next={fetchDataLive}
        hasMore={true}
        loader={<div className="loader"></div>}
        className="admin__cards"
      >
        <div
          className={addTrue ? "add__words_active" : "add__words"}
          onClick={(e: React.MouseEvent) => {
            if ((e.target as HTMLElement).className !== "cancel__wo")
              setAddTrue(true);
          }}
        >
          <p className="word__name-h">Add new word</p>
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
              opacity="0.6"
              x="1.5"
              y="1.5"
              width="147"
              height="147"
              rx="73.5"
              fill="url(#pattern0)"
              stroke="black"
              strokeWidth="3"
            />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0" transform="scale(0.00195312)" />
              </pattern>
              <image
                id="image0"
                width="512"
                height="512"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAXZklEQVR4Ae3Ywa1FVxFE0ZcBQ4YOgRAIhRAIgRlhEAIpgpxBz7ZO3WXpz45U9OrL67J/P/8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCfwl9/v9/dH/v7aMUkmQIAAAQJbAn8e//898vePLXrTECBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB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nhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE/jj9/v965G/v63hm4cAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLvCPwfQtYkChqBrr8AAAAASUVORK5CYII="
              />
            </defs>
          </svg>
          <form encType="multipart/form-data">
            <p className="word__yt">Word:</p>
            <input
              type="text"
              placeholder="Word"
              onChange={(e: React.ChangeEvent) =>
                setName((e.target as HTMLInputElement).value)
              }
            />
            <p className="word__yt">Translation:</p>
            <input
              type="text"
              placeholder="Tranlation"
              onChange={(e: React.ChangeEvent) =>
                setTranslation((e.target as HTMLInputElement).value)
              }
            />
            <div className="sound__word">
              <span>Sound</span>
              <div className="select__src">
                <input
                  name={name}
                  type="file"
                  id="input__file"
                  className="input__file"
                  onChange={(e: React.ChangeEvent) => {
                    setAudio((e.target as HTMLInputElement).files![0]);
                  }}
                />
                <label className="input__file-button" htmlFor="input__file">
                  <div className="secl">Select file</div>
                </label>
              </div>
            </div>
            <div className="image__word">
              <span>Image</span>
              <div className="select__src">
                <input
                  name={name}
                  type="file"
                  id="input__filew"
                  className="input__file"
                  onChange={(e: React.ChangeEvent) => {
                    setImage((e.target as HTMLInputElement).files![0]);
                  }}
                />
                <label className="input__file-button" htmlFor="input__filew">
                  <div className="secl">Select file</div>
                </label>
              </div>
            </div>
            <div className="buttons__removet">
              <button className="cancel__wo" onClick={cancelWo}>
                Cancel
              </button>
              <button className="add__wo" onClick={addWord}>
                Submit
              </button>
            </div>
          </form>
        </div>
        {cards.map((item, ind) => (
          <div key={ind} className="word__card_l">
            <div className="krest__word" id={item._id} onClick={deleteWord}>
              <p id={item._id}>×</p>
            </div>
            <div className="word__l_name">
              <span>Word: </span> {item.name}
            </div>
            <div className="word__l_translation">
              <span>Translation: </span> {item.name}
            </div>
            <div className="sound__l_sound">
              <span>Sound file: {`${item.name}.mp3`}</span>
              <button
                className="listen__sound"
                id={item.name}
                onClick={soundClick}
              >
                Listen
              </button>
            </div>
            <img src={`${api}/images/${item.name}.jpg`} alt="image" />
            <button className="change__word_l">Change</button>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CardsAdminPanel;
