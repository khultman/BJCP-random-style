const app = document.getElementById('root');

const category = document.createElement('div');
category.setAttribute("class", "category")

const style = document.createElement('div');
style.setAttribute("class", "style")

app.appendChild(category);
app.appendChild(style);

const apiURL = "https://api.us-east-1.randomstyle.brewerymayhem.com/v1/RandomStyle";
// 'https://1j6g6w0kq0.execute-api.us-east-1.amazonaws.com/default/RandomStyle'

var request = new XMLHttpRequest();
request.open('GET', apiURL , true);
request.onload = function () {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
		

		const categoryCard = document.createElement('div');
		categoryCard.setAttribute('class', 'card');

		const categoryCardDivA = document.createElement('div');
		categoryCardDivA.setAttribute('class', 'description');
		categoryCardDivA.textContent = "Category Style";

		const categoryCardDivB = document.createElement('div');
		categoryCardDivB.setAttribute('class', 'element');
		categoryCardDivB.textContent = data.Category.name

		const categoryCardDivC = document.createElement('div');
		categoryCardDivC.setAttribute('class', 'description');
		categoryCardDivC.textContent = "Category Description";

		const categoryCardDivD = document.createElement('div');
		categoryCardDivD.setAttribute('class', 'element')
		if (data.Category.notes === '[object Array]') {
			data.Category.notes.forEach( function(s) {
				categoryCardDivDNote = document.createElement('div')
				categoryCardDivDNote.setAttribute('class', 'note')
				categoryCardDivDNote.textContent = data.Category.notes[s]
				categoryCardDivD.appendChild(categoryCardDivDNote)
			});
		} else {
			categoryCardDivDNote = document.createElement('div')
			categoryCardDivDNote.setAttribute('class', 'note')
			categoryCardDivDNote.textContent = data.Category.notes
			categoryCardDivD.appendChild(categoryCardDivDNote)
		}

		category.appendChild(categoryCard);
		categoryCard.appendChild(categoryCardDivA);
		categoryCard.appendChild(categoryCardDivB);
		categoryCard.appendChild(categoryCardDivC);
		categoryCard.appendChild(categoryCardDivD);

		const styleCard = document.createElement('div');
		styleCard.setAttribute('class', 'card');
		style.appendChild(styleCard);

		Object.keys(data.Style).forEach(function (item) {

			styleCardItem = document.createElement('div');
			styleCardItem.setAttribute('class', 'element-pair')

			styleCardItemTitle = document.createElement('div');
			styleCardItemTitle.setAttribute('class', 'description');
			styleCardItemTitle.textContent = item;

			styleCardItemElement = document.createElement('div');
			styleCardItemElement.setAttribute('class', 'element');

			if (item == "stats") {
				console.log(data.Style[item])
				Object.keys(data.Style[item]).forEach(function (stat) {
					styleCardItemElementDiv = document.createElement('div');
					styleCardItemElementDiv.setAttribute('class', 'stat-pair');
					styleCardItemElement.appendChild(styleCardItemElementDiv);
					styleCardItemElementDivStatKey = document.createElement('div');
					styleCardItemElementDivStatKey.setAttribute('class', 'stat-key');
					styleCardItemElementDivStatKey.textContent = stat;
					styleCardItemElementDiv.appendChild(styleCardItemElementDivStatKey);
					styleCardItemElementDivStatValues = document.createElement('div');
					styleCardItemElementDivStatValues.setAttribute('class', 'stat-value');
					styleCardItemElementDiv.appendChild(styleCardItemElementDivStatValues);
					Object.keys(data.Style[item][stat]).forEach(function (statKey) {
						styleCardItemElementDivStatValuePair = document.createElement('div');
						styleCardItemElementDivStatValuePair.setAttribute('class', 'stat-value-pair');
						styleCardItemElementDivStatValues.appendChild(styleCardItemElementDivStatValuePair);
						styleCardItemElementDivStatValuePairA = document.createElement('div');
						styleCardItemElementDivStatValuePairA.setAttribute('class', 'stat-value-pair-a');
						styleCardItemElementDivStatValuePairA.textContent = statKey;
						styleCardItemElementDivStatValuePair.appendChild(styleCardItemElementDivStatValuePairA);
						styleCardItemElementDivStatValuePairB = document.createElement('div');
						styleCardItemElementDivStatValuePairB.setAttribute('class', 'stat-value-pair-b');
						styleCardItemElementDivStatValuePairB.textContent = data.Style[item][stat][statKey];
						styleCardItemElementDivStatValuePair.appendChild(styleCardItemElementDivStatValuePairB);
					});
				});
			} else if (data.Style[item] === '[object Array]') {
				data.Style[item].forEach( function(s) {
					styleCardItemElementDiv = document.createElement('div');
					styleCardItemElementDiv.setAttribute('class', 'element-content');
					styleCardItemElementDiv.textContent = data.Style[item][s];
					styleCardItemElement.appendChild(styleCardItemElementDiv);
				});
			} else {
				styleCardItemElementDiv = document.createElement('div');
				styleCardItemElementDiv.setAttribute('class', 'element-content');
				styleCardItemElementDiv.textContent = data.Style[item];
				styleCardItemElement.appendChild(styleCardItemElementDiv);
			}

			styleCard.appendChild(styleCardItem)
			styleCardItem.appendChild(styleCardItemTitle);
			styleCardItem.appendChild(styleCardItemElement);
		});
	} else {
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	}
}

request.send()