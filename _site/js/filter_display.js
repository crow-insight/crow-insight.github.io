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

function createBlocks(rows) {
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
				html_string = html_string + "<div class='"+ block_column_class +" columns block'>" +
							"<img class='u-max-full-width' src='/assets/img/modernreport.png' >" +
							"<p><strong>" + d[i][attribute_name] + "</strong>" + "<br>" + 
							getTags(d[i]) + "</p>" +
							"</div>";
			}

			return html_string;
		});

	display.transition().duration(500)
		.style("opacity", 1);
}

function createGlobals() {
	d3.csv(lookup_file_path, function(data, i) {
		metadata.push(data);
		metadata_dict[data.PlainLanguage] = data.Tag;
	})
}

function createDisplay(filters) {

	rows = [];
	display_infos = [];
	temp_metadata_dict = {}


	d3.csv(lookup_file_path, function(data, i) {
		temp_metadata_dict[data.PlainLanguage] = data.Tag;
	})
	.then(function(d) {
		d3.csv(tags_file_path, function(data, i) {
			display_infos.push(data);
		})
		.then(function(d) {

			if (filters.length > 0) {
				display_infos = display_infos.filter(function(d) {
					include_filter = false;
					for (let i = 0; i < filters.length; i++) {
						if (d[ temp_metadata_dict[filters[i]] ] == "1") {
							include_filter = true;
						}
					}
					return include_filter;
				});
			}

			for (let i = 0; i < display_infos.length; i++) {

				if (i % blocks_per_row == 0) {
					rows.push([display_infos[i]]);
				}
				else {
					let j = i;
					while (j % blocks_per_row != 0) {
						j = j - 1;
					}
					rows[j/blocks_per_row].push(display_infos[i]);
				}
			}

			createBlocks(rows);
		})
	})
}

function createDrawer() {

	d3.selectAll(".filter-button-wrapper button")
		.on("click", function(d) {
			let button_text = $(this).text();
			let filter_selection = d3.select(this);
			let drawer_is_open = (d3.select("#filters-container").style("opacity") == 1)

			if ((button_text != curr_filter_category && button_text != "All") || (button_text == curr_filter_category && drawer_is_open == false && button_text != "All") ) {

				let filters = d3.select("#filters-container").style("opacity", 0);
				d3.selectAll(".filter-row").remove();
				curr_filter_category = button_text;

				let available_filters = metadata.filter(function(d) {
					if (button_text == "All") {
						return true;
					}
					else {
						return button_text == d.Category;
					}
				});

				let metadata_nested = [];
				for (let i = 0; i < available_filters.length; i++) {
					if (i % blocks_per_row == 0) {
						metadata_nested.push([available_filters[i]]);
					}
					else {
						let j = i;
						while (j % blocks_per_row != 0) {
							j = j - 1;
						}
						metadata_nested[j/blocks_per_row].push(available_filters[i]);
					}
				}

				let filter_rows = filters.selectAll(".filter-row")
					.data(metadata_nested)
					.enter()
					.append("div")
					.attr("class", "row filter-row")
					.html(function(d) {

						let html_string = ""
						for (let i = 0; i < d.length; i ++) {
							let selected_style = " style='font-weight:700;color:black;' "

							if (!curr_filters.includes(d[i].PlainLanguage)) {
								selected_style = ""
							}

							html_string = html_string + "<div class='"+ filter_column_class +" columns filter'>" +
							"<button" + selected_style + ">" + d[i].PlainLanguage + "</button>" +
							"</div>";
						}

						return html_string;
					});

				filters.selectAll(".filter button")
					.on("click", function(d) {

						let button_text = $(this).text();

						if (curr_filters.includes(button_text)) {

							let index = curr_filters.indexOf(button_text);
						    if (index > -1) {
						       curr_filters.splice(index, 1);
						    }

						    d3.select(this).style("font-weight", 400).style("color", default_font_color);
						}
						else {
							curr_filters.push(button_text);
							d3.select(this).style("font-weight", 700).style("color", "black");
						}

						let available_filters_plain_language = d3.map(available_filters, function(d) { return d.PlainLanguage; });
						let includes_a_selected_filter = false
						for (let i = 0; i < curr_filters.length; i++) {
							let index = available_filters_plain_language.indexOf(curr_filters[i]);
							if (index > -1) {
								includes_a_selected_filter = true;
							}
						}

						if (includes_a_selected_filter == true) {
							filter_selection.style("font-weight", 700).style("color", "black");
						}
						else {
							filter_selection.style("font-weight", 400).style("color", default_font_color);	
						}

						if (curr_filters.length > 0) {
							d3.select("#all-filter").style("font-weight", 400).style("color", default_font_color);
						}
						else {
							d3.select("#all-filter").style("font-weight", 700).style("color", "black");	
						}

						createDisplay(curr_filters);

					});

				filters.transition()
					.duration(500)
					.style("opacity", 1);
			}
			else if (button_text == "All" && button_text != curr_filter_category) {

				let filters = d3.select("#filters-container").style("opacity", 0);
				d3.selectAll(".filter-row").remove();
				curr_filter_category = button_text

				d3.selectAll(".filter-button-wrapper button").style("font-weight", 400).style("color", default_font_color);
				filter_selection.style("font-weight", 700).style("color", "black");

				curr_filters = []
				createDisplay(curr_filters);
			}
			else {
				let filters = d3.select("#filters-container").transition().duration(250).style("opacity", 0);
				d3.selectAll(".filter-row").transition().duration(250).remove();
				curr_filter_category = button_text;
			}
		});
}


createGlobals();
createDisplay(curr_filters);
createDrawer();