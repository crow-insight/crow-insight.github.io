metadata = [];
metadata_dict = {};

blocks_per_row = 3;
block_column_class = "four";

default_font_color = "#646468";

const staff_file_path  = "../assets/data/staff.csv";
const attribute_name = "portfolio_item";
const img_folder = "Staff"

data = []
rows = []

function createProfiles(rows) {

	let display = d3.select("#display-container")
		.style("opacity", 0);

	display.selectAll(".block-row").remove();

	let row_containers = display.selectAll(".block-row")
		.data(rows)
		.enter()
		.append("div")
		.attr("class", "row block-row")
		.html(function(d) {
			let html_string = ""
			for (let i = 0; i < d.length; i ++) {

				let dot = '<span class="dot"></span>';
				if (d[i]["photo"] != "") {
					dot = "<img class='u-max-full-width' src='/assets/img/Staff/" + d[i]["photo"] +  "'> "
				}

				html_string= html_string + 
							'<div class="' + block_column_class + ' columns">' +
								'<div class="profile">' +
							        dot +
							        '<h3>' + d[i]["name"] + '</h3>' +
							    	'<p>' + d[i]["title"] + '</p>' +
							    '</div>' +
						    '</div>'
			}

			return html_string;
		});

	display.transition().duration(500)
		.style("opacity", 1);
}

d3.csv(staff_file_path, function(d) {
	data.push(d);
})
.then(function(d) {
	console.log("data is ", data);
	for (let i = 0; i < data.length; i++) {

		if (i % blocks_per_row == 0) {
			rows.push([data[i]]);
		}
		else {
			let j = i;
			while (j % blocks_per_row != 0) {
				j = j - 1;
			}
			rows[j/blocks_per_row].push(data[i]);
		}
	}

	createProfiles(rows);
});
