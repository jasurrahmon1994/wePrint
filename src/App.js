import "./main.scss";
import React, { useState } from "react";
import Feature from "./Feature";
import Message from "./message.svg";
import Instagram from "./instagram.svg";
import Phone from "./phone.svg";
import Telegram from "./telegram.svg";

function App() {
	const [priceA4, setPriceA4] = useState(0);
	const [priceA4Color, setPriceA4Color] = useState(0);
	const [priceA5, setPriceA5] = useState(0);
	const [priceA5Color, setPriceA5Color] = useState(0);
	const [text, setText] = useState("");
	const [button, setButton] = useState(true);
	const [message, setMessage] = useState("");
	const [isVisible, setVisible] = useState(false);

	const handleText = (e) => {
		if (text === "") {
			setMessage(null);
			setButton(true);
		} else if (text !== "" && isNaN(text.trim())) {
			setButton(true);
			setMessage("Sahifalar soni faqat raqamlardan va kamida 10 bet bo'lishi kerak !!!");
			setText("440");
		} else {
			setButton(false);
			setMessage(null);
		}
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let pricePerPage = 260;
		let pricePerPageColor = 370;
		let coverPrice =
			text >= 53 && text <= 129
				? 12000
				: text >= 130 && text <= 200
				? 13000
				: text >= 201 && text <= 300
				? 14000
				: text >= 301 && text <= 400
				? 15000
				: Math.ceil(text / 440) * 16000;

		if (text >= 0 && text <= 52) {
			setPriceA5(14500);
			setPriceA4(17500);
			setPriceA5Color(16000);
			setPriceA4Color(20000);
			setVisible(true);
		}
		if (text >= 53 && text <= 440) {
			let calcPriceA5 = Math.ceil(text / 4) * pricePerPage + coverPrice;
			calcPriceA5 = calcPriceA5 % 500 ? Math.ceil(calcPriceA5 / 500) * 500 : calcPriceA5;
			setPriceA5(calcPriceA5);
			let calcPriceA5Color = Math.ceil(text / 4) * pricePerPageColor + coverPrice;
			calcPriceA5Color = calcPriceA5Color % 500 ? Math.ceil(calcPriceA5Color / 500) * 500 : calcPriceA5Color;
			setPriceA5Color(calcPriceA5Color);
			let calcPriceA4 = Math.ceil(text / 2) * pricePerPage + coverPrice;
			calcPriceA4 = calcPriceA4 % 500 ? Math.ceil(calcPriceA4 / 500) * 500 : calcPriceA4;
			setPriceA4(calcPriceA4);
			let calcPriceA4Color = Math.ceil(text / 2) * pricePerPageColor + coverPrice;
			calcPriceA4Color = calcPriceA4Color % 500 ? Math.ceil(calcPriceA4Color / 500) * 500 : calcPriceA4Color;
			setPriceA4Color(calcPriceA4Color);
			setVisible(true);
		}
		if (text > 440) {
			setText("");
			setMessage("Sahifalar soni 440 tadan kam bo'lishi kerak");
			setVisible(false);
		}

		// setText("");
	};

	return (
		<div className="App">
			<form className="calculation" onSubmit={handleSubmit}>
				<h1>WePrint</h1>
				<h2>Biz bilan kitob chiqarish yanada oson</h2>
				<input type="text" placeholder="Sahifa sonini kiriting" onChange={handleText} value={text} />
				<button type="submit" disabled={button}>
					Hisoblash
				</button>
				{message && <div className="message">{message}</div>}
				<div className={`info ${isVisible ? "show-it" : "nothing"}`}>
					<Feature feature="A4, rangli" price={priceA4Color} />
					<Feature color="no" feature="A4, oq-qora" price={priceA4} />
					<Feature feature="A5, rangli" price={priceA5Color} />
					<Feature color="no" feature="A5, oq-qora" price={priceA5} />
					<div className="comment">
						<p>** A4 format -- bu to'liq list hajmi.</p>
						<p>** A5 format -- bu to'liq list hajmining yarmi.</p>
					</div>
				</div>
				<ul className="links">
					<li>
						<a href="tel:+998977234353" target="_blank">
							<img src={Phone} alt="phone" />
						</a>
					</li>
					<li>
						<a href="https://t.me/weprint_bot" target="_blank">
							<img src={Message} alt="message" />
						</a>
					</li>
					<li>
						<a href="https://t.me/weprint" target="_blank">
							<img src={Telegram} alt="telegram" />
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/weprint_uz/" target="_blank">
							<img src={Instagram} alt="insta" />
						</a>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default App;
