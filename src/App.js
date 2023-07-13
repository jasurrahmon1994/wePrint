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

	let pricePerPage = 260;
	let pricePerPageColor = 370;
	let coverPrice = 0;

	const handlePrice = (text) => {
		let bookNum;
		if(text > 440 && text < 781){
			bookNum = 2;
		} else if (text > 780){
			bookNum = Math.ceil((text - 780) / 390) + 2;
		} else bookNum = 1;
		text = Math.ceil(text / bookNum);
		coverPrice = text >= 53 && text <= 129
			? 13000
			: text >= 130 && text <= 200
				? 14000
				: text >= 201 && text <= 300
					? 15000
					: text >= 301 && text <= 400
						? 16000
						: text >= 401 && text <= 440
							? 17000 : 0;
		let calcPriceA5 = (Math.ceil(text / 4) * pricePerPage + coverPrice) * bookNum;
		calcPriceA5 = calcPriceA5 % 500 ? Math.ceil(calcPriceA5 / 500) * 500 : calcPriceA5;
		setPriceA5(calcPriceA5);
		let calcPriceA5Color = (Math.ceil(text / 4) * pricePerPageColor + coverPrice) * bookNum;
		calcPriceA5Color = calcPriceA5Color % 500 ? Math.ceil(calcPriceA5Color / 500) * 500 : calcPriceA5Color;
		setPriceA5Color(calcPriceA5Color);
		let calcPriceA4 = (Math.ceil(text / 2) * pricePerPage + coverPrice) * bookNum;
		calcPriceA4 = calcPriceA4 % 500 ? Math.ceil(calcPriceA4 / 500) * 500 : calcPriceA4;
		setPriceA4(calcPriceA4);
		let calcPriceA4Color = (Math.ceil(text / 2) * pricePerPageColor + coverPrice) * bookNum;
		calcPriceA4Color = calcPriceA4Color % 500 ? Math.ceil(calcPriceA4Color / 500) * 500 : calcPriceA4Color;
		setPriceA4Color(calcPriceA4Color);
		setMessage(`Pereplyotlar soni: ${bookNum} `);
	};

	const handleText = (e) => {
		if (text === "") {
			setMessage(null);
			setButton(true);
		} else if (text !== "" && isNaN(text)) {
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

		if (text >= 0 && text <= 52) {
			setPriceA5(15500);
			setPriceA4(18500);
			setPriceA5Color(17000);
			setPriceA4Color(21000);
			setVisible(true);
		}
		if (text >= 53) {
			handlePrice(text);
			setVisible(true);
		}

	};

	function handleFile() {
		let input = document.getElementById("file");
		let reader = new FileReader();
		reader.readAsBinaryString(input.files[0]);
		reader.onloadend = function(){
			let count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
			setText(count + "");
		}
		setButton(false);
	}

	return (
		<div className="App">
			<form className="calculation" onSubmit={handleSubmit}>
				<h1>WePrint</h1>
				<h2>Biz bilan kitob chiqarish yanada oson</h2>
				<label className="custom-file-upload">
					File yuklash
				<input type="file" placeholder="Upload it" onChange={handleFile} id='file'/>
				</label>
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
				<div className="map">
					<iframe title="uniqua;slkdjf;alksdjf"
						src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5993.851118826498!2d69.246204!3d41.310483!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE4JzM3LjciTiA2OcKwMTQnNDYuMyJF!5e0!3m2!1sen!2s!4v1684607694203!5m2!1sen!2s"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade">
					</iframe>
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
