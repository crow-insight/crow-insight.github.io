
rows = []
blocks_per_row = 2
column_class = "six"

d3.csv("../assets/data/client_tags.csv", function(data, i) {

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
	createBlocks();
})

function getTagString(tag_info) {
	let tag_string = "";
	// nonprofits_and_foundations,member_organizations,government,private_sector,
	// environment,energy,public_health,education,other,image_name
	return "";
}

function createBlocks() {
	let clients = d3.select("#clients-container");

	let row_containers = clients.selectAll("row")
		.data(rows)
		.enter()
		.append("div")
		.attr("class", "row")
		.html(function(d) {
			let html_string = ""
			for (let i = 0; i < d.length; i ++) {
				html_string = html_string + "<div class=' "+ column_class +" columns'>" +
							"<img class='u-max-full-width' src='/assets/img/modernreport.png' >" +
							"<p><strong>" + d[i].client + "</strong>" + "<br>" + 
							"</p>" +
							"</div>";
			}

			return html_string;
		});
}