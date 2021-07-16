import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../../api";
import "./CategoryCards.scss";

interface ICategory {
  name: string;
  words: number;
  _id: string;
  _deletedAt: null | Date;
}
interface IState {
  setStateApi(title: string): void;
}
const CategoryCards: React.FC<IState> = (props) => {
  const [categories, changeCategory] = useState<ICategory[]>([]);
  const [change, changeCat] = useState<string>("");
  const [textName, changeTextName] = useState<string>("");
  const [newCategory, setNewCategory] = useState<boolean>(false);
  function fetchData() {
    fetch(`${api}/category`)
      .then((res) => res.json())
      .then((res) => changeCategory([...res]));
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function deleteCategory(e: React.MouseEvent<HTMLElement>) {
    fetch(`${api}/category/${(e.target as HTMLElement).id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetchData();
    });
  }
  function fetchDataLive() {
    fetch(`${api}/category`)
      .then((res) => res.json())
      .then((res) => changeCategory([...categories, ...res]));
  }
  function updateCategory(e: React.MouseEvent) {
    changeCat((e.target as HTMLElement).id);
    changeTextName("");
  }
  function cancelUpdate() {
    changeCat("");
    changeTextName("");
  }
  function changeName(e: React.ChangeEvent) {
    changeTextName((e.target as HTMLInputElement).value);
  }
  function updateCat(e: React.MouseEvent) {
    if (textName.trim().length !== 0) {
      fetch(`${api}/category/${(e.target as HTMLElement).id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: textName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          changeCat("");
        })
        .then(() => {
          fetchData();
        });
    }
  }
  function newRep() {
    if (textName.trim().length !== 0) {
      fetch(`${api}/category`, {
        method: "POST",
        body: JSON.stringify({
          name: textName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setNewCategory(false);
        })
        .then(() => {
          fetchData();
        });
    }
  }
  function newCat(e: React.MouseEvent) {
    if ((e.target as HTMLElement).className !== "cancel__update") {
      setNewCategory(true);
      changeTextName("");
    }
  }
  function cancelNew() {
    setNewCategory(false);
    changeTextName("");
  }
  function setState(e: React.MouseEvent) {
    props.setStateApi((e.target as HTMLElement).id);
  }
  return (
    <div className="container">
      <InfiniteScroll
        dataLength={categories.length}
        next={fetchDataLive}
        hasMore={true}
        loader={<div className="loader"></div>}
        className="admin__category"
      >
        <div
          className={
            newCategory ? "create_categoryItem_active" : "create_categoryItem"
          }
          onClick={newCat}
        >
          <p className="text__new_c">Create new Category</p>
          <svg
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
              opacity="0.6"
              x="1.5"
              y="1.5"
              width="82"
              height="82"
              rx="41"
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
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAXZklEQVR4Ae3Ywa1FVxFE0ZcBQ4YOgRAIhRAIgRlhEAIpgpxBz7ZO3WXpz45U9OrL67J/P/8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCfwl9/v9/dH/v7aMUkmQIAAAQJbAn8e//898vePLXrTECBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAgACBTkAB6OwlEyBAgACBTEAByOgFEyBAoBX4y+/3+/MI+PumwT9/v9//Hvn7t+/00/8//Wv7UymdwJ7AS/8G+Mqh8r/znVJhV+/s6h97P78mItAKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EEBBcBR+fJRMfs7378CMHiAjNQKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EEBBcBR+fJRMfs7378CMHiAjNQKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EEBBcBR+fJRMfs7378CMHiAjNQKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EEBBcBR+fJRMfs7378CMHiAjNQKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EEBBcBR+fJRMfs7378CMHiAjNQKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EEBBcBR+fJRMfs7378CMHiAjNQKKADv/AA6Vnb15W9AAWhvhfRBAQXAUfnyUTH7O9+/AjB4gIzUCigA7/wAOlZ29eVvQAFob4X0QQEFwFH58lEx+zvfvwIweICM1AooAO/8ADpWdvXlb0ABaG+F9EGBP36/37/8fdbgP793jup/faef/U7//I362+Dvr5EIECCQCbz0X4D8G2D2mQgmQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE1AA1jZqHgIECBAgcBBQAA5InhAgQIAAgTUBBWBto+YhQIAAAQIHAQXggOQJAQIECBBYE/jj9/v965G/v63hm4cAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLvCPwfQtYkChqBrr8AAAAASUVORK5CYII="
              />
            </defs>
          </svg>
          <span className="input__live-s">
            <p>Category Name:</p>
            <input
              type="text"
              placeholder="New Category"
              id="input__changeCategory"
              onChange={changeName}
            />
          </span>
          <div className="update__buttons_category">
            <button className="cancel__update" onClick={cancelNew}>
              Cancel
            </button>
            <button className="update__cot" onClick={newRep}>
              Create
            </button>
          </div>
        </div>
        {categories.map((item, ind) => (
          <div
            key={ind}
            className={
              change === item._id ? "categoryItemChange" : "categoryItem"
            }
          >
            <p className="name__of__category">{item.name}</p>
            <span className="input__live-s">
              <p>Category Name:</p>
              <input
                type="text"
                placeholder={item.name}
                id="input__changeCategory"
                onChange={changeName}
              />
            </span>
            <p className="words__category__col">
              Words: <span>{item.words}</span>
            </p>
            <div
              className="delete__category"
              id={item._id}
              onClick={deleteCategory}
            >
              <p id={item._id}>×</p>
            </div>
            <div className="actions__category">
              <button
                className="update__category"
                id={item._id}
                onClick={updateCategory}
              >
                <p id={item._id}>Update</p>
              </button>
              <NavLink to={`/AdminCards/${item.name}/words`} id={item.name} onClick={setState}>
                <p id={item.name}>Add word</p>
              </NavLink>
            </div>
            <div className="update__buttons_category">
              <button className="cancel__update" onClick={cancelUpdate}>
                Cancel
              </button>
              <button className="update__cot" id={item._id} onClick={updateCat}>
                Create
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CategoryCards;
