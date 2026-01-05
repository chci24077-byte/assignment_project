import "./App.css";
import misoImg from "./assets/food_omisoshiru.png";
import onigiriImg from "./assets/food_konbini_onigiri.png";
import tosutoImg from "./assets/pan_toast_kongari.png";
import shiriaruImg from "./assets/serial_cornflake.png";
import chukagayuImg from "./assets/chuka.jpg";
import oyakodonImg from "./assets/food_oyakodon.png";
import udonImg from "./assets/food_udon_kake.png";
import pastaImg from "./assets/food_spaghetti.png";
import kareImg from "./assets/food_curry.png";
import ramenImg from "./assets/ramen_tonkotsu.png";
import chahanImg from "./assets/cha-han.png";
import sakanaImg from "./assets/teisyoku.png";
import karaageImg from "./assets/food_karaage.png";
import hamburgImg from "./assets/food_hamburg.png";
import omuriceImg from "./assets/food_omurice.png";
import hoikoroImg from "./assets/food_hoikoro.png";
import mabodohuImg from "./assets/food_mabo_doufu.png";

import { useState, useEffect } from "react";

function App() {
  // 料理データ
  const meals = [
    // 朝
    {
      name: "ごはん＋味噌汁",
      genre: "和食",
      time: "朝",
      calorie: 350,
      nutrition: { protein: 12, fat: 6, carbs: 65 },
      image: misoImg
    },
    {
      name: "おにぎり",
      genre: "和食",
      time: "朝",
      calorie: 180,
      nutrition: { protein: 4, fat: 2, carbs: 38 },
      image: onigiriImg
    },
    {
      name: "トースト",
      genre: "洋食",
      time: "朝",
      calorie: 220,
      nutrition: { protein: 8, fat: 6, carbs: 30 },
      image: tosutoImg
    },
    {
      name: "シリアル",
      genre: "洋食",
      time: "朝",
      calorie: 200,
      nutrition: { protein: 6, fat: 4, carbs: 35 },
      image: shiriaruImg
    },
    {
      name: "中華粥",
      genre: "中華",
      time: "朝",
      calorie: 250,
      nutrition: { protein: 10, fat: 3, carbs: 45 },
      image: chukagayuImg
    },

    // 昼
    {
      name: "親子丼",
      genre: "和食",
      time: "昼",
      calorie: 650,
      nutrition: { protein: 25, fat: 15, carbs: 80 },
      image: oyakodonImg
    },
    {
      name: "うどん",
      genre: "和食",
      time: "昼",
      calorie: 420,
      nutrition: { protein: 10, fat: 3, carbs: 85 },
      image: udonImg
    },
    {
      name: "パスタ",
      genre: "洋食",
      time: "昼",
      calorie: 600,
      nutrition: { protein: 20, fat: 18, carbs: 75 },
      image: pastaImg
    },
    {
      name: "カレー",
      genre: "洋食",
      time: "昼",
      calorie: 700,
      nutrition: { protein: 18, fat: 22, carbs: 90 },
      image: kareImg
    },
    {
      name: "ラーメン",
      genre: "中華",
      time: "昼",
      calorie: 720,
      nutrition: { protein: 20, fat: 25, carbs: 70 },
      image: ramenImg
    },
    {
      name: "チャーハン",
      genre: "中華",
      time: "昼",
      calorie: 680,
      nutrition: { protein: 16, fat: 20, carbs: 85 },
      image: chahanImg
    },

    // 晩
    {
      name: "焼き魚定食",
      genre: "和食",
      time: "晩",
      calorie: 600,
      nutrition: { protein: 30, fat: 18, carbs: 60 },
      image: sakanaImg
    },
    {
      name: "唐揚げ定食",
      genre: "和食",
      time: "晩",
      calorie: 750,
      nutrition: { protein: 28, fat: 30, carbs: 70 },
      image: karaageImg
    },
    {
      name: "ハンバーグ",
      genre: "洋食",
      time: "晩",
      calorie: 800,
      nutrition: { protein: 30, fat: 35, carbs: 50 },
      image: hamburgImg
    },
    {
      name: "オムライス",
      genre: "洋食",
      time: "晩",
      calorie: 720,
      nutrition: { protein: 22, fat: 28, carbs: 80 },
      image: omuriceImg
    },
    {
      name: "回鍋肉",
      genre: "中華",
      time: "晩",
      calorie: 700,
      nutrition: { protein: 25, fat: 30, carbs: 55 },
      image: hoikoroImg
    },
    {
      name: "麻婆豆腐",
      genre: "中華",
      time: "晩",
      calorie: 650,
      nutrition: { protein: 28, fat: 28, carbs: 40 },
      image: mabodohuImg
    }
  ];

  const [genre, setGenre] = useState("");
  const [time, setTime] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [history, setHistory] = useState([]);

  // 履歴読み込み
  const addToHistory = (meal) => {
    setHistory((prevHistory) => {
      const newHistory = [meal, ...prevHistory].slice(0, 5);
      localStorage.setItem("mealHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 料理決定
  const decideMeal = () => {
    const filtered = meals.filter((meal) => {
      return (
        (genre === "" || meal.genre === genre) &&
        (time === "" || meal.time === time)
      );
    });

    if (filtered.length === 0) {
      setSelectedMeal(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    const meal = filtered[randomIndex];
    setSelectedMeal(meal);

    const newHistory = [meal.name, ...history];
    setHistory(newHistory);
    localStorage.setItem("mealHistory", JSON.stringify(newHistory));
  };

  return (
    <div className="app-background">
      <div className="container">
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>今日のご飯メーカー</h1>

      <div>
        <label>ジャンル：</label>
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="">指定なし</option>
          <option value="和食">和食</option>
          <option value="洋食">洋食</option>
          <option value="中華">中華</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>時間帯：</label>
        <select onChange={(e) => setTime(e.target.value)}>
          <option value="">指定なし</option>
          <option value="朝">朝</option>
          <option value="昼">昼</option>
          <option value="晩">晩</option>
        </select>
      </div>

      <button style={{ marginTop: "20px" }} onClick={decideMeal}>
        今日のご飯を決める
      </button>

      {selectedMeal && (
        <div style={{ marginTop: "30px" }}>
          <h2>{selectedMeal.name}</h2>

          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "16px",
              marginBottom: "16px"
            }}
          />
          <p>カロリー：{selectedMeal.calorie} kcal</p>
          <h3>栄養素</h3>
          <ul>
            <li>たんぱく質：{selectedMeal.nutrition.protein} g</li>
            <li>脂質：{selectedMeal.nutrition.fat} g</li>
            <li>炭水化物：{selectedMeal.nutrition.carbs} g</li>
          </ul>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <h3>履歴</h3>
        <ul>
          {history.map((meal, index) => (
            <li key={index}>{meal}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
}

export default App;


