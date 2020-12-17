metadata = [];
metadata_dict = {};

blocks_per_row = 2;
filters_per_row = 2;

block_column_class = "six";
filter_column_class = "six";

curr_filter_category = "All";
curr_filters = []

default_font_color = "#646468";

const lookup_file_path = "../assets/data/portfolio_lookup.csv";
const tags_file_path = "../assets/data/portfolio_tags.csv";
const attribute_name = "portfolio_item";
const img_folder = "Portfolio"

let url = window.location.href;

if (url.includes("data_communication")) {
	curr_filters.push("Data Communication");
	curr_filter_category = "Services";
	d3.select("#services-filter").style("font-weight", "700").style("color", "black");
}
else if (url.includes("visual_explanation")) {
	curr_filters.push("Visual Explanation");
	curr_filter_category = "Services";
	d3.select("#services-filter").style("font-weight", "700").style("color", "black");
}
else if (url.includes("information_dashboards")) {
	curr_filters.push("Information Dashboards");
	curr_filter_category = "Services";
	d3.select("#services-filter").style("font-weight", "700").style("color", "black");
}
else {
	d3.select("#all-filter").style("font-weight", "700").style("color", "black");
}


createGlobals();
createDisplay(curr_filters, false);
createDrawer();
