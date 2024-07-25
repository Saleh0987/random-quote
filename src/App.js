import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

const API_URL = "https://api.quotable.io/random";

function App() {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [randomBg, setRandomBg] = useState("rgb(28, 28, 28)");

  const generateRandomBg = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    setRandomBg(bgColor);
  };

  const generateQuote = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuote(res.data);
      generateRandomBg();
      document.body.style.backgroundColor = randomBg;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <>
      <div className="App">
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <main>
          <h2>Random Quote Generator</h2>
          <div className="underline"></div>
          <div>
            <h3>
              <FaQuoteLeft className="quote-icon" />
              {quote.content}
            </h3>
            <div className="flex">
              <p className="author">
                {" "}
                <BsPersonFill className="person-icon" /> {quote.author}
              </p>
              <button className="btn" onClick={generateQuote}>
                generate new
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
      <a className="copy" href="https://www.linkedin.com/in/saleh23/">Created by mohamed saleh</a>
    </>
  );
}

export default App;
