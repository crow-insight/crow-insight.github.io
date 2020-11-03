rows = []
metadata = []
blocks_per_row = 2
column_class = "six"


function getTags(d) {
	tag_string = "";
	for (let key in d) {
		if (+d[key] == 1) {

			for (let i = 0; i < metadata.length; i++) {
				if (key == metadata[i].Tag) {
					if (tag_string == "") {
						tag_string = metadata[i].PlainLanguage;
					}
					else {
						tag_string = tag_string + ", " + metadata[i].PlainLanguage;
					}
				}
			}
		}

	}
	return tag_string;
}

function createBlocks() {
	let portfolio = d3.select("#portfolio-container");

	let row_containers = portfolio.selectAll("row")
		.data(rows)
		.enter()
		.append("div")
		.attr("class", "row item-row")
		.html(function(d) {
			let html_string = ""
			for (let i = 0; i < d.length; i ++) {
				html_string = html_string + "<div class='"+ column_class +" columns item'>" +
							"<img class='u-max-full-width' src='/assets/img/modernreport.png' >" +
							"<p><strong>" + d[i].portfolio_item + "</strong>" + "<br>" + 
							getTags(d[i]) + "</p>" +
							"</div>";
			}

			return html_string;
		});
}

function createPortfolio() {
	d3.csv("../assets/data/portfolio_tags.csv", function(data, i) {

		if (i % blocks_per_row == 0) {
			rows.push([data]);
		}
		else {
			while (i % blocks_per_row != 0) {
				i = i - 1;
			}
			rows[i/blocks_per_row].push(data);
		}
	})
	.then(function(d) {
		d3.csv("../assets/data/portfolio_lookup.csv", function(data, i) {
			metadata.push(data);
		})
		.then(function(d) {
			createBlocks();
		})
	})
}

createPortfolio();